import React, { useEffect, useRef } from "react";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    IcosahedronGeometry,
    MeshPhysicalMaterial,
    Mesh,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    AmbientLight,
    DirectionalLight,
    DoubleSide,
} from "three";

const BASE_MATERIAL_COLOR = 0x9a9aa2;
const BASE_EDGE_COLOR = 0x5c5c66;
// Same channel-complement used for the site's black/white theme swap, so
// the shape's colors invert exactly in step with the page.
const invertHex = (hex) => hex ^ 0xffffff;

// A slowly drifting, translucent monochrome faceted shape. Idle motion
// wanders along a lazy Lissajous-style curve; scrolling (wheel, touch,
// trackpad, keyboard — anything that moves window.scrollY) adds a
// temporary spin boost that decays back to the idle drift.
export default function Home({ darkMode }) {
    const mountRef = useRef(null);
    const materialsRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const scene = new Scene();
        const camera = new PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 7;

        const renderer = new WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.className = "bg-canvas";
        mount.appendChild(renderer.domElement);

        const small = window.innerWidth < 650;
        const geometry = new IcosahedronGeometry(small ? 1.4 : 2.1, 1);
        const material = new MeshPhysicalMaterial({
            color: darkMode
                ? invertHex(BASE_MATERIAL_COLOR)
                : BASE_MATERIAL_COLOR,
            transparent: true,
            opacity: 0.32,
            roughness: 0.35,
            metalness: 0.05,
            flatShading: true,
            side: DoubleSide,
            depthWrite: false,
        });
        const mesh = new Mesh(geometry, material);
        scene.add(mesh);

        // Faint edges to give the facets a bit of definition against a
        // light background, since flat, low-opacity fill alone reads as
        // a formless blob.
        const edgeMaterial = new LineBasicMaterial({
            color: darkMode ? invertHex(BASE_EDGE_COLOR) : BASE_EDGE_COLOR,
            transparent: true,
            opacity: 0.35,
        });
        const edges = new LineSegments(
            new EdgesGeometry(geometry),
            edgeMaterial
        );
        mesh.add(edges);
        materialsRef.current = { material, edgeMaterial };

        scene.add(new AmbientLight(0xffffff, 0.6));
        const key = new DirectionalLight(0xffffff, 0.8);
        key.position.set(4, 5, 6);
        scene.add(key);
        const fill = new DirectionalLight(0xffffff, 0.4);
        fill.position.set(-5, -3, -4);
        scene.add(fill);

        const state = {
            spinBoost: 0,
            lastScrollY: window.scrollY,
            elapsed: 0,
            rafId: null,
            lastTime: performance.now(),
            visible: !document.hidden,
        };

        const IDLE_SPEED = reduceMotion ? 0 : 0.06;
        const BOOST_DECAY = 0.95;
        const BOOST_FROM_SCROLL = 0.0006;
        const MAX_BOOST = reduceMotion ? 0 : 6;
        const BASE_X = small ? 0.9 : 2.2;

        const animate = (now) => {
            state.rafId = requestAnimationFrame(animate);
            if (!state.visible) return;

            const dt = Math.min((now - state.lastTime) / 1000, 0.1);
            state.lastTime = now;
            state.elapsed += dt;

            const scrollY = window.scrollY;
            const scrollDelta = scrollY - state.lastScrollY;
            state.lastScrollY = scrollY;
            state.spinBoost = Math.max(
                -MAX_BOOST,
                Math.min(
                    state.spinBoost + scrollDelta * BOOST_FROM_SCROLL,
                    MAX_BOOST
                )
            );

            const spin = IDLE_SPEED + state.spinBoost;
            mesh.rotation.y += spin * dt;
            mesh.rotation.x += spin * 0.6 * dt;
            mesh.rotation.z += spin * 0.4 * dt;

            if (!reduceMotion) {
                // Lazy curved drift, independent of the scroll-driven spin.
                mesh.position.x = BASE_X + Math.sin(state.elapsed * 0.15) * 0.7;
                mesh.position.y = Math.cos(state.elapsed * 0.11) * 0.5;
            } else {
                mesh.position.x = BASE_X;
            }

            state.spinBoost *= BOOST_DECAY;

            renderer.render(scene, camera);
        };
        state.rafId = requestAnimationFrame(animate);

        // Mobile browsers fire `resize` whenever their address bar
        // collapses or expands during scroll — a height-only change with
        // the width untouched. Reacting to that recomputes the camera's
        // aspect ratio and visibly shifts the shape sideways on screen
        // (nothing in world space moved; only the projection did), which
        // reads as the shape jumping mid-scroll. A real resize/orientation
        // change always moves the width too, so only react to those.
        let lastWidth = window.innerWidth;
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (w === lastWidth) return;
            lastWidth = w;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        const handleVisibility = () => {
            state.visible = !document.hidden;
            state.lastTime = performance.now();
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            cancelAnimationFrame(state.rafId);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );
            mount.removeChild(renderer.domElement);
            materialsRef.current = null;
            geometry.dispose();
            material.dispose();
            edges.geometry.dispose();
            edgeMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    // Live-update the shape's colors when the theme toggle changes without
    // tearing down and rebuilding the whole WebGL scene.
    useEffect(() => {
        const materials = materialsRef.current;
        if (!materials) return;
        materials.material.color.setHex(
            darkMode ? invertHex(BASE_MATERIAL_COLOR) : BASE_MATERIAL_COLOR
        );
        materials.edgeMaterial.color.setHex(
            darkMode ? invertHex(BASE_EDGE_COLOR) : BASE_EDGE_COLOR
        );
    }, [darkMode]);

    return <div ref={mountRef} />;
}
