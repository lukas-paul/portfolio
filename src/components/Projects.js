import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import "../Projects.scss";

export default function Projects() {
    const [projectData, setProjectData] = useState(null);
    const [showText, setShowText] = useState(false);
    const [showTopOverlay, setTopOverlay] = useState(true);
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
    const textVisible = (index) => {
        setShowText(index);
    };
    const topOverlayVisible = (index) => {
        console.log("top visible");
        setTopOverlay(index);
    };
    const bottomOverlayVisible = (index) => {
        console.log("bottom visible");
        setBottomOverlay(index);
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
                                            src={project.mainImage.asset.url}
                                            alt={project.mainImage.alt}
                                        />
                                        <a
                                            href={project.link}
                                            alt={project.title}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div
                                                className="empty top"
                                                onMouseEnter={() =>
                                                    topOverlayVisible(index)
                                                }
                                                onMouseLeave={() =>
                                                    setTopOverlay(false)
                                                }
                                            ></div>
                                        </a>

                                        <div
                                            className="empty bottom"
                                            onMouseEnter={() =>
                                                bottomOverlayVisible(index)
                                            }
                                            onMouseLeave={() =>
                                                setBottomOverlay(false)
                                            }
                                            onClick={() => textVisible(index)}
                                        ></div>
                                        {showTopOverlay === index && (
                                            <div className="img-overlay top">
                                                <h2>Visit</h2>
                                            </div>
                                        )}
                                        {showBottomOverlay === index && (
                                            <div className="img-overlay bottom">
                                                <h2>Text</h2>
                                            </div>
                                        )}
                                    </div>
                                    <div className="desc-container">
                                        {showText === index && (
                                            <p>{project.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="project-info">
                                    <h3>
                                        <a
                                            href={project.link}
                                            alt={project.title}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>

                                    <span>
                                        <strong>Date: </strong>{" "}
                                        {new Date(
                                            project.date
                                        ).toLocaleDateString()}
                                    </span>
                                    <span>
                                        <strong>Type: </strong>
                                        {project.projectType}
                                    </span>
                                </div>
                            </article>
                        ))}
                </section>
            </section>
        </main>
    );
}
