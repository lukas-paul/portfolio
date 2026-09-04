import React, { useRef, useState } from "react";
import { useSanity } from "../sanity/useSanity.js";
import { projectsQuery } from "../sanity/queries.js";
import { useProjectScroll } from "../hooks/useProjectScroll.js";
import "../Projects.scss";
import "../ProjectsMobile.scss";

export default function Projects({ mobile }) {
    const { data } = useSanity(projectsQuery);
    const page = data?.page;
    const projectData = data?.projects;

    const listRef = useRef(null);
    useProjectScroll(listRef, [projectData?.length]);

    const [showOverlay, setShowOverlay] = useState(false);
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
                <h1 className="headline">{page?.title || "Projects"}</h1>
                {page?.intro && <p className="projects-intro">{page.intro}</p>}
                <section className="project-list" ref={listRef}>
                    {projectData &&
                        projectData.map((project, index) => (
                            <article className="project" key={project._id}>
                                {project.date && (
                                    <span
                                        className="project-index"
                                        aria-hidden="true"
                                    >
                                        {new Date(project.date).getFullYear()}
                                    </span>
                                )}
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
                                                src={project.mainImage?.url}
                                                alt={project.mainImage?.alt || ""}
                                            />
                                        </button>
                                        {showOverlay !== index && (
                                            <span
                                                className="image-hint"
                                                aria-hidden="true"
                                            >
                                                + Details
                                            </span>
                                        )}
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
                                                        {(project.date ||
                                                            project.projectType) && (
                                                            <p className="overlay-meta">
                                                                {[
                                                                    project.date &&
                                                                        new Date(
                                                                            project.date
                                                                        ).getFullYear(),
                                                                    project.projectType,
                                                                ]
                                                                    .filter(
                                                                        Boolean
                                                                    )
                                                                    .join(" · ")}
                                                            </p>
                                                        )}
                                                        <div className="tags">
                                                            {(
                                                                project.tags || []
                                                            ).map((tag) => (
                                                                <p
                                                                    className="tag"
                                                                    key={tag}
                                                                >
                                                                    {tag}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mobile-overlay-right">
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
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
