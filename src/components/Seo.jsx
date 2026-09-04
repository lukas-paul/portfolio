import { useEffect } from "react";
import { useSanity } from "../sanity/useSanity.js";
import { seoQuery } from "../sanity/queries.js";

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

// Drives <title> and the social/SEO meta tags from siteSettings.
export default function Seo() {
    const { data } = useSanity(seoQuery);

    useEffect(() => {
        if (!data) return;
        const { title, metaDescription, keywords, ogImage } = data;
        if (title) {
            document.title = title;
            setMeta("property", "og:title", title);
            setMeta("name", "author", title);
        }
        setMeta("name", "description", metaDescription);
        setMeta("property", "og:description", metaDescription);
        setMeta("property", "og:image", ogImage);
        setMeta("name", "thumbnail", ogImage);
        if (keywords?.length) {
            setMeta("name", "keywords", keywords.join(", "));
        }
    }, [data]);

    return null;
}
