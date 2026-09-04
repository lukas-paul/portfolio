import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import Canvas from "./Canvas";
import Techstack from "./Techstack";
import { useSanity } from "../sanity/useSanity.js";
import { homeQuery } from "../sanity/queries.js";
import { portableTextComponents } from "../sanity/portableText.jsx";

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
                {home?.intro?.length > 0 && (
                    <div className="short-info">
                        <div className="container">
                            <PortableText
                                value={home.intro}
                                components={portableTextComponents}
                            />
                        </div>
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
