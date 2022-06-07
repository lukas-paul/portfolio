import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { PortableText } from "@portabletext/react";
import "../About.scss";

export default function About() {
    const [projectData, setProjectData] = useState(null);
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"]{
            body, mainImage{asset->{_id,url},alt},
        }`
            )
            .then((data) => {
                setProjectData(data[0]);
                console.log("data: ", data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="about-page">
            <div className="title">
                <h1 className="headline">About Page</h1>
            </div>
            {projectData && (
                    <div className="about-text-container">
                        <div className="profile-image">
                            <img
                                src={projectData.mainImage.asset.url}
                                alt="profile"
                            />
                        </div>
                        <PortableText value={projectData.body} />
                    </div>
            )}
        </div>
    );
}
