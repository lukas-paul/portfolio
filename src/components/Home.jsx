import React, { lazy, Suspense, useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import Techstack from "./Techstack";
import Seo from "./Seo";
import { useSanity } from "../sanity/useSanity.js";
import { homeQuery } from "../sanity/queries.js";
import { portableTextComponents } from "../sanity/portableText.jsx";

// p5 is a big dependency and only ever needed on this page — keep it out of
// every other route's bundle.
const Canvas = lazy(() => import("./Canvas"));

export default function Home(prop) {
    let mobile = prop;

    const { data } = useSanity(homeQuery);
    const settings = data?.settings;
    const home = data?.home;

    const [animateVal, setAnimateVal] = useState("On");

    // React.lazy starts fetching the Canvas chunk (~240KB of p5) the moment
    // it's about to render, which by default is immediately on mount —
    // right when the page's own text/fonts are competing for bandwidth.
    // Hold the mount until the browser is idle (i.e. after first paint) so
    // the heavy download doesn't delay LCP; it still starts within a beat
    // of load, so the animation still feels immediate to the user.
    const [canvasReady, setCanvasReady] = useState(false);
    useEffect(() => {
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        const cancelIdle = window.cancelIdleCallback || clearTimeout;
        const id = idle(() => setCanvasReady(true));
        return () => cancelIdle(id);
    }, []);

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
            <Seo />
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
            {canvasReady && animateVal && animateVal === "On" && (
                <div className="canvas-parent">
                    <Suspense fallback={null}>
                        <Canvas prop={mobile.prop} />
                    </Suspense>
                </div>
            )}
        </main>
    );
}
