import React, { useState } from "react";
import Canvas from "./Canvas";
import Techstack from "./Techstack";
import { useSanity } from "../sanity/useSanity.js";
import { homeQuery } from "../sanity/queries.js";

export default function Home(prop) {
    let mobile = prop;

    const { data } = useSanity(homeQuery);
    const settings = data?.settings;
    const home = data?.home;

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
                    <h1 className="headline">{settings?.title}</h1>
                    <h2 className="headline">{settings?.tagline}</h2>
                </div>
                {home?.intro && (
                    <div className="short-info">
                        <p className="container">{home.intro}</p>
                    </div>
                )}
                <Techstack
                    heading={home?.techStackHeading}
                    groups={home?.techGroups}
                />
            </div>
            {animateVal && animateVal === "On" && (
                <div className="canvas-parent">
                    <Canvas prop={mobile.prop} />
                </div>
            )}
        </main>
    );
}
