import React from "react";
import { sizedImage } from "../sanity/image.js";
import "../Techstack.scss";

function Skill({ skill }) {
    const inner = (
        <>
            <p>{skill.name}</p>
            {skill.icon && (
                <img
                    className="stack-icon"
                    // 48px icon, 2x for high-DPI screens
                    src={sizedImage(skill.icon, { width: 96 })}
                    alt={skill.name}
                    width="48"
                    height="48"
                    loading="lazy"
                />
            )}
        </>
    );
    return (
        <div className="stack-icon-container">
            {skill.url ? (
                <a href={skill.url} target="_blank" rel="noopener noreferrer">
                    {inner}
                </a>
            ) : (
                inner
            )}
        </div>
    );
}

export default function Techstack({ heading, groups }) {
    if (!groups?.length) return null;

    return (
        <div className="short-info techstack">
            <div className="container">
                <h2 className="headline">{heading || "Tech Stack"}</h2>
                <div className="stack-columns">
                    {groups.map((group) => (
                        <div className="substack" key={group._key}>
                            <h3>{group.heading}</h3>
                            <div className="flex-row">
                                {(group.skills || []).map((skill) => (
                                    <Skill key={skill._id} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
