import React from "react";

// Loading shells for About/Projects, used two ways:
//  - as the Suspense fallback in App.jsx (shown immediately, before the
//    page's own lazy-loaded chunk has even downloaded)
//  - inside About.jsx/Projects.jsx themselves, once mounted but still
//    waiting on the Sanity fetch
// Sharing one component for both means there's no visible seam when the
// chunk finishes loading and the real component takes over — same markup,
// same classes, nothing to swap.

export function AboutSkeleton() {
    return (
        <div className="about-page">
            <div className="title">
                <h1 className="headline">About</h1>
            </div>
            <div className="about-text-container" aria-hidden="true">
                <div className="profile-image skeleton" />
                <div className="skeleton-lines">
                    <div className="skeleton" />
                    <div className="skeleton" />
                    <div className="skeleton" />
                    <div className="skeleton" style={{ width: "70%" }} />
                </div>
            </div>
        </div>
    );
}

export function ProjectListSkeleton() {
    return (
        <>
            {[0, 1].map((i) => (
                <div className="project-skeleton" key={i} aria-hidden="true">
                    <div className="skeleton skeleton-image" />
                    <div className="skeleton" />
                    <div className="skeleton" style={{ width: "70%" }} />
                </div>
            ))}
        </>
    );
}

export function ProjectsSkeleton() {
    return (
        <main className="sub-page-content">
            <section>
                <h1 className="headline">Projects</h1>
                <section className="project-list">
                    <ProjectListSkeleton />
                </section>
            </section>
        </main>
    );
}
