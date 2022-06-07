import React, { useState } from "react";
import Canvas from "./Canvas";
import Techstack from "./Techstack";

export default function Home(prop) {
    let mobile = prop;
    console.log("mobile in home: ", mobile);

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
            <h3 className="animate" onClick={switchAnimate}>
                Animate: {animateVal}
            </h3>
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
                <div className="short-info">
                    <div className="container flex-row">
                        <a
                            href="https://www.linkedin.com/in/lukas-frenzer-7abb01137/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>LinkedIn</p>
                        </a>
                        <a
                            href="https://github.com/lukas-paul"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>Github</p>
                        </a>
                        <a href="mailto:lukas.frenzer@web.de?subject=Web Development Enquiry">
                            <p>Email</p>
                        </a>
                    </div>
                </div>
            </div>
            {animateVal && animateVal === "On" && (
                <div className="canvas-parent">
                    <Canvas prop={mobile.prop} />
                </div>
            )}
        </main>
    );
}
