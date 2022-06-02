import React from "react";
import Sketch from "react-p5";

export default function Home() {
    let bubbles = [];
    let bubbleColor = {
        r: 255,
        g: 200,
        b: 200,
    };
    const setup = (p5) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(255);
        /*
        for (var i = 0; i < 10; i++) {
            bubbles.push({
                x: p5.random(p5.width),
                y: p5.random(p5.height),
                radius: p5.random(50, 100),
            });
        }
        */
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
            radius: p5.random(50, 100),
        };
        bubbles.push(dot);
        if (bubbles.length > 200) {
            bubbles = [];
        }
        p5.noStroke();
    };

    const windowResized = (p5) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    let delta = 0;
    const mouseWheel = (p5, event) => {
        console.log("delta: ", delta);
        delta += event.delta;
        if (delta >= 130 || delta <= -130) {
            bubbleColor.r = p5.random(200, 250);
            bubbleColor.g = p5.random(200, 250);
            bubbleColor.b = p5.random(200, 250);
            delta = 0;
        }
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}
            mouseWheel={mouseWheel}
        />
    );
}
