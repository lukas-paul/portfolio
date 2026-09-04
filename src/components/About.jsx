import React from "react";
import { PortableText } from "@portabletext/react";
import { useSanity } from "../sanity/useSanity.js";
import { aboutQuery } from "../sanity/queries.js";
import { portableTextComponents } from "../sanity/portableText.jsx";
import "../About.scss";

export default function About() {
    const { data } = useSanity(aboutQuery);

    return (
        <div className="about-page">
            <div className="title">
                <h1 className="headline">{data?.title || "About"}</h1>
            </div>
            {data && (
                <div className="about-text-container">
                    {data.profileImage && (
                        <div className="profile-image">
                            <img src={data.profileImage} alt="Lukas Frenzer" />
                        </div>
                    )}
                    <PortableText
                        value={data.body}
                        components={portableTextComponents}
                    />
                </div>
            )}
        </div>
    );
}
