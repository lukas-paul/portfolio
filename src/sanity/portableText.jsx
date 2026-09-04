import React from "react";

// Shared @portabletext/react renderers used across the site.
export const portableTextComponents = {
    types: {
        image: ({ value }) =>
            value?.asset?.url ? (
                <img src={value.asset.url} alt={value.alt || ""} />
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
