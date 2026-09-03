import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import "../Projects.scss";
import "../ProjectsMobile.scss";

export default function Projects({ mobile }) {
    const [projectData, setProjectData] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "project"]{
            title, mainImage{asset->{_id,url},alt}, date, description, projectType,link, tags
        }`
            )
            .then((data) => {
                setProjectData(data);
            })
            .catch(console.error);
    }, []);
    const openOverlay = (index) => {
        setShowOverlay(index);
    };
    const toggleOverlay = (index) => {
        setShowOverlay((current) => (current === index ? false : index));
    };
    const closeOverlay = () => {
        setShowOverlay(false);
    };
    return (
        <main className="sub-page-content">
            <section>
                <h1 className="headline">Projects</h1>
                <section>
                    {projectData &&
                        projectData.map((project, index) => (
                            <article className="project" key={index}>
                                <div className="image-text-section">
                                    <div className="image-section">
                                        <button
                                            type="button"
                                            className="image-toggle"
                                            onClick={() => toggleOverlay(index)}
                                            onMouseEnter={
                                                mobile
                                                    ? undefined
                                                    : () => openOverlay(index)
                                            }
                                            aria-expanded={showOverlay === index}
                                            aria-label={`Details for ${project.title}`}
                                        >
                                            <img
                                                src={
                                                    project.mainImage.asset.url
                                                }
                                                alt={
                                                    project.mainImage.alt || ""
                                                }
                                            />
                                        </button>
                                        {showOverlay === index && (
                                            <div
                                                className="mobile-overlay"
                                                onClick={closeOverlay}
                                                onMouseLeave={
                                                    mobile
                                                        ? undefined
                                                        : closeOverlay
                                                }
                                            >
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
                                                                    <p
                                                                        className="tag"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
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
