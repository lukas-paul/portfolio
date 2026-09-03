import React, { useState } from "react";
import Canvas from "./Canvas";
import Techstack from "./Techstack";

export default function Home(prop) {
    let mobile = prop;

    const [animateVal, setAnimateVal] = useState("On");
    const switchAnimate = () => {
        if (animateVal === "On") {
            setAnimateVal("Off");
        }
        if (animateVal === "Off") {
            setAnimateVal("On");
        }
    };
    return (
        <main>
            <button
                type="button"
                className="animate"
                onClick={switchAnimate}
                aria-pressed={animateVal === "On"}
            >
                Animate: {animateVal}
            </button>
            <div className="header">
                <div>
                    <h1 className="headline">Lukas Frenzer</h1>
                    <h1 className="headline">Web Development</h1>
                </div>
                <div className="short-info">
                    <div className="container">
                        I develop things for the Internet. I am a trained Full
                        Stack Developer, meaning I am familiar with back- and
                        front-end technologies.
                    </div>
                </div>
                <Techstack />
            </div>
            {animateVal && animateVal === "On" && (
                <div className="canvas-parent">
                    <Canvas prop={mobile.prop} />
                </div>
            )}
        </main>
    );
}
