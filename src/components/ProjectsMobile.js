import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import "../Projects.scss";
import "../ProjectsMobile.scss";

export default function Projects() {
    const [projectData, setProjectData] = useState(null);
    const [showText, setShowText] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showBottomOverlay, setBottomOverlay] = useState(true);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "project"]{
            title, mainImage{asset->{_id,url},alt}, date, description, projectType,link, tags
        }`
            )
            .then((data) => {
                setProjectData(data);
                console.log("data: ", data);
            })
            .catch(console.error);
    }, []);
    const overlayOn = (index) => {
        setShowOverlay(index);
    };
    return (
        <main className="sub-page-content">
            <section>
                <h1 className="headline">Projects</h1>
                <section>
                    {projectData &&
                        projectData.map((project, index) => (
                            <article className="project">
                                <div className="image-text-section">
                                    <div className="image-section">
                                        <img
                                            onClick={() => overlayOn(index)}
                                            src={project.mainImage.asset.url}
                                            alt={project.mainImage.alt}
                                        />
                                        {showOverlay === index && (
                                            <div className="mobile-overlay">
                                                <div className="mobile-overlay-left">
                                                    <div className="overlay-text">
                                                        <h1>{project.title}</h1>
                                                        <div>
                                                            <p>
                                                                {new Date(
                                                                    project.date
                                                                ).toLocaleDateString()}
                                                            </p>
                                                            <p>
                                                                Type:{" "}
                                                                {
                                                                    project.projectType
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="tags">
                                                            {projectData[
                                                                index
                                                            ].tags.map(
                                                                (
                                                                    tag,
                                                                    index
                                                                ) => (
                                                                    <p className="tag">
                                                                        {tag}
                                                                    </p>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mobile-overlay-right">
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
                                                            alt={project.title}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h1>Visit</h1>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="desc-container">
                                        <p>{project.description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                </section>
            </section>
        </main>
    );
}
