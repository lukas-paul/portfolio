import { useEffect } from "react";
import { useSanity } from "../sanity/useSanity.js";
import { seoQuery } from "../sanity/queries.js";
import { sizedImage } from "../sanity/image.js";

function setMeta(attr, key, value) {
    if (value == null || value === "") return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", value);
}

/**
 * Drives <title> and the social/SEO meta tags from siteSettings, with an
 * optional per-page override. Render once per route (inside the page
 * component, not a shared shell) so each page gets its own title.
 *
 *   <Seo />                                   -> just the site defaults
 *   <Seo title="About" description="..." />   -> "About — <site title>"
 */
export default function Seo({ title: pageTitle, description: pageDescription }) {
    const { data } = useSanity(seoQuery);

    useEffect(() => {
        if (!data) return;
        const { title: siteTitle, metaDescription, keywords, ogImage } = data;

        const title = pageTitle ? `${pageTitle} — ${siteTitle}` : siteTitle;
        const description = pageDescription || metaDescription;

        if (title) {
            document.title = title;
            setMeta("property", "og:title", title);
            setMeta("name", "author", siteTitle);
        }
        setMeta("name", "description", description);
        setMeta("property", "og:description", description);
        setMeta("property", "og:type", "website");
        const image = sizedImage(ogImage, { width: 1200 });
        setMeta("property", "og:image", image);
        setMeta("name", "thumbnail", image);
        setMeta("name", "twitter:card", "summary_large_image");
        if (keywords?.length) {
            setMeta("name", "keywords", keywords.join(", "));
        }
    }, [data, pageTitle, pageDescription]);

    return null;
}
