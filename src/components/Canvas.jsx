import React, { useEffect, useRef } from "react";
import Sketch from "react-p5";

export default function Home(prop) {
    let mobile = prop;

    // Animation state has to survive re-renders. react-p5 reads the draw
    // callback fresh from props on every frame, so when this component
    // re-renders (e.g. a parent's data fetch resolving) p5 picks up a new
    // closure over freshly-initialised locals — radiusMin/radiusMax become
    // undefined, every new bubble gets a NaN radius, and the animation
    // silently disappears. Keeping the mutable state in a ref means every
    // closure shares the same values.
    const state = useRef({
        bubbles: [],
        bubbleColor: { r: 255, g: 200, b: 200 },
        radiusMin: 50,
        radiusMax: 100,
        delta: 0,
        deltaMobile: 0,
        lastColorAt: 0,
        lastTouchY: null,
    });

    // react-p5 lets setup() capture the window size just once, at mount. When
    // this component remounts (navigating back from a taller route) a scrollbar
    // may have appeared or vanished, changing window.innerWidth — and that never
    // fires a `resize` event, so windowResized() below can't correct it and the
    // canvas stays the wrong width. Re-sync it to the real viewport right after
    // mount, and keep our own resize listener as a backup to p5's.
    const p5Ref = useRef(null);
    useEffect(() => {
        const syncSize = () =>
            p5Ref.current?.resizeCanvas(
                window.innerWidth,
                window.innerHeight
            );
        const t1 = setTimeout(syncSize, 0);
        const t2 = setTimeout(syncSize, 150);
        window.addEventListener("resize", syncSize);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener("resize", syncSize);
        };
    }, []);

    const setup = (p5, canvasParentRef) => {
        p5Ref.current = p5;
        const s = state.current;
        let small = window.innerWidth < 650 ? true : false;
        s.radiusMin = small ? 30 : 50;
        s.radiusMax = small ? 50 : 100;
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(
            canvasParentRef
        );
        p5.background(255);

        s.bubbleColor.r = p5.random(200, 250);
        s.bubbleColor.g = p5.random(200, 250);
        s.bubbleColor.b = p5.random(200, 250);
        p5.frameRate(30);
    };

    const draw = (p5) => {
        const s = state.current;
        p5.background("white");
        for (var i = 0; i < s.bubbles.length; i++) {
            let bubble = s.bubbles[i];

            if (
                p5.dist(p5.mouseX, p5.mouseY, bubble.x, bubble.y) <
                bubble.radius
            ) {
                if (p5.mouseIsPressed) {
                    s.bubbles.splice(i, 1); // remove this bubble!
                }
                p5.fill(
                    s.bubbleColor.r,
                    s.bubbleColor.g - 20,
                    s.bubbleColor.b,
                    200
                );
            }

            p5.ellipse(bubble.x, bubble.y, bubble.radius * 2);
            p5.fill(s.bubbleColor.r, s.bubbleColor.g, s.bubbleColor.b, 200);
            bubble.x += p5.random(-1, 1);
            bubble.y += p5.random(-1, 1);
        }

        let dot = {
            x: p5.random(p5.width),
            y: p5.random(p5.height),
            radius: p5.random(s.radiusMin, s.radiusMax),
        };
        s.bubbles.push(dot);
        if (s.bubbles.length > 200) {
            s.bubbles = [];
        }
        p5.noStroke();
    };

    const windowResized = (p5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    // Scrolling changes the bubble colour. Two guards stop it from flashing:
    //  - ignore input at a scroll edge (rubber-banding keeps firing wheel/
    //    touch events even though the page can't move)
    //  - never recolour more than ~5x/second
    const randomiseColour = (p5) => {
        const s = state.current;
        const now = performance.now();
        if (now - s.lastColorAt < 200) return;
        s.lastColorAt = now;
        s.bubbleColor.r = p5.random(200, 250);
        s.bubbleColor.g = p5.random(200, 250);
        s.bubbleColor.b = p5.random(200, 250);
    };

    const scrollBlockedAtEdge = (direction) => {
        const y = window.scrollY;
        const max =
            document.documentElement.scrollHeight - window.innerHeight;
        return (
            (direction < 0 && y <= 0) || (direction > 0 && y >= max - 1)
        );
    };

    const mouseWheel = (p5, event) => {
        const s = state.current;
        if (scrollBlockedAtEdge(event.delta)) {
            s.delta = 0;
            return;
        }
        s.delta += event.delta;
        if (Math.abs(s.delta) >= 130) {
            randomiseColour(p5);
            s.delta = 0;
        }
    };

    const touchMoved = (p5, event) => {
        const s = state.current;
        if (!mobile.prop) return;
        const y =
            event.touches?.[0]?.screenY ??
            event.targetTouches?.[0]?.screenY;
        if (y == null) return;
        if (s.lastTouchY != null) {
            const move = s.lastTouchY - y; // >0 = swiping toward page bottom
            if (!scrollBlockedAtEdge(move)) {
                s.deltaMobile += Math.abs(move);
                if (s.deltaMobile >= 600) {
                    randomiseColour(p5);
                    s.deltaMobile = 0;
                }
            }
        }
        s.lastTouchY = y;
    };

    const touchEnded = () => {
        state.current.lastTouchY = null;
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}
            mouseWheel={mouseWheel}
            touchMoved={touchMoved}
            touchEnded={touchEnded}
        />
    );
}
