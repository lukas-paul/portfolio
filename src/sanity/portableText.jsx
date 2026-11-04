import React from "react";
import { sizedImage, sizedSrcSet } from "./image.js";

// Shared @portabletext/react renderers used across the site.
export const portableTextComponents = {
    types: {
        image: ({ value }) =>
            value?.asset?.url ? (
                <img
                    src={sizedImage(value.asset.url, { width: 1440 })}
                    srcSet={sizedSrcSet(value.asset.url, [480, 720, 1080, 1440])}
                    // rich text column is capped at 720px (.about-text-container)
                    sizes="(max-width: 720px) 100vw, 720px"
                    alt={value.alt || ""}
                    loading="lazy"
                    decoding="async"
                />
            ) : null,
    },
    marks: {
        link: ({ value, children }) => {
            const href = value?.href || "";
            const external = /^https?:/.test(href);
            return (
                <a
                    href={href}
                    {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                >
                    {children}
                </a>
            );
        },
    },
};
