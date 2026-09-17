import React from "react";
import { PortableText } from "@portabletext/react";
import Seo from "./Seo";
import { useSanity } from "../sanity/useSanity.js";
import { aboutQuery } from "../sanity/queries.js";
import { portableTextComponents } from "../sanity/portableText.jsx";
import { sizedImage } from "../sanity/image.js";
import { AboutSkeleton } from "./skeletons.jsx";
import "../About.scss";

export default function About() {
    const { data } = useSanity(aboutQuery);

    if (!data) {
        return (
            <>
                <Seo title="About" />
                <AboutSkeleton />
            </>
        );
    }

    return (
        <div className="about-page">
            <Seo title={data.title || "About"} />
            <div className="title">
                <h1 className="headline">{data.title || "About"}</h1>
            </div>
            <div className="about-text-container">
                {data.profileImage && (
                    <div className="profile-image">
                        <img
                            src={sizedImage(data.profileImage, {
                                width: 400,
                            })}
                            alt="Lukas Frenzer"
                        />
                    </div>
                )}
                <PortableText
                    value={data.body}
                    components={portableTextComponents}
                />
            </div>
        </div>
    );
}
