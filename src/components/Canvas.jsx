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

// A slowly drifting, translucent monochrome faceted shape. Idle motion
// wanders along a lazy Lissajous-style curve; scrolling (wheel, touch,
// trackpad, keyboard — anything that moves window.scrollY) adds a
// temporary spin boost that decays back to the idle drift.
export default function Home() {
    const mountRef = useRef(null);

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
        const geometry = new IcosahedronGeometry(small ? 1.9 : 2.6, 1);
        const material = new MeshPhysicalMaterial({
            color: 0x9a9aa2,
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
        const edges = new LineSegments(
            new EdgesGeometry(geometry),
            new LineBasicMaterial({
                color: 0x5c5c66,
                transparent: true,
                opacity: 0.45,
            })
        );
        mesh.add(edges);

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
        const BOOST_DECAY = 0.94;
        const BOOST_FROM_SCROLL = 0.00025;
        const MAX_BOOST = reduceMotion ? 0 : 3.5;

        const animate = (now) => {
            state.rafId = requestAnimationFrame(animate);
            if (!state.visible) return;

            const dt = Math.min((now - state.lastTime) / 1000, 0.1);
            state.lastTime = now;
            state.elapsed += dt;

            const scrollY = window.scrollY;
            const scrollDelta = Math.abs(scrollY - state.lastScrollY);
            state.lastScrollY = scrollY;
            state.spinBoost = Math.min(
                state.spinBoost + scrollDelta * BOOST_FROM_SCROLL,
                MAX_BOOST
            );

            const spin = IDLE_SPEED + state.spinBoost;
            mesh.rotation.y += spin * dt;
            mesh.rotation.x += spin * 0.6 * dt;

            if (!reduceMotion) {
                // Lazy curved drift, independent of the scroll-driven spin.
                mesh.position.x = Math.sin(state.elapsed * 0.15) * 0.7;
                mesh.position.y = Math.cos(state.elapsed * 0.11) * 0.5;
            }

            state.spinBoost *= BOOST_DECAY;

            renderer.render(scene, camera);
        };
        state.rafId = requestAnimationFrame(animate);

        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
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
            geometry.dispose();
            material.dispose();
            edges.geometry.dispose();
            edges.material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} />;
}
