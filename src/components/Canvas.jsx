import React, { useEffect, useRef } from "react";
import Sketch from "react-p5";

export default function Home(prop) {
    let mobile = prop;
    let bubbles = [];
    let bubbleColor = {
        r: 255,
        g: 200,
        b: 200,
    };
    let radiusMin;
    let radiusMax;

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
        let small = window.innerWidth < 650 ? true : false;
        radiusMin = small ? 30 : 50;
        radiusMax = small ? 50 : 100;
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(
            canvasParentRef
        );
        p5.background(255);

        bubbleColor.r = p5.random(200, 250);
        bubbleColor.g = p5.random(200, 250);
        bubbleColor.b = p5.random(200, 250);
        p5.frameRate(30);
    };

    const draw = (p5) => {
        p5.background("white");
        for (var i = 0; i < bubbles.length; i++) {
            let bubble = bubbles[i];

            if (
                p5.dist(p5.mouseX, p5.mouseY, bubble.x, bubble.y) <
                bubble.radius
            ) {
                if (p5.mouseIsPressed) {
                    bubbles.splice(i, 1); // remove this bubble!
                }
                p5.fill(bubbleColor.r, bubbleColor.g - 20, bubbleColor.b, 200);
            }

            p5.ellipse(bubble.x, bubble.y, bubble.radius * 2);
            p5.fill(bubbleColor.r, bubbleColor.g, bubbleColor.b, 200);
            bubble.x += p5.random(-1, 1);
            bubble.y += p5.random(-1, 1);
        }

        let dot = {
            x: p5.random(p5.width),
            y: p5.random(p5.height),
            radius: p5.random(radiusMin, radiusMax),
        };
        bubbles.push(dot);
        if (bubbles.length > 200) {
            bubbles = [];
        }
        p5.noStroke();
    };

    const windowResized = (p5) => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
    };

    let delta = 0;
    const mouseWheel = (p5, event) => {
        delta += event.delta;
        if (delta >= 130 || delta <= -130) {
            bubbleColor.r = p5.random(200, 250);
            bubbleColor.g = p5.random(200, 250);
            bubbleColor.b = p5.random(200, 250);
            delta = 0;
        }
    };

    let deltaMobile = 0;
    const touchMoved = (p5, event) => {
        if (mobile.prop) {
            deltaMobile += event.targetTouches[0].screenY;
            if (deltaMobile >= 7000 || deltaMobile <= -7000) {
                bubbleColor.r = p5.random(200, 250);
                bubbleColor.g = p5.random(200, 250);
                bubbleColor.b = p5.random(200, 250);
                deltaMobile = 0;
            }
        } else return;
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}
            mouseWheel={mouseWheel}
            touchMoved={touchMoved}
        />
    );
}
