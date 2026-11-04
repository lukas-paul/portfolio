// Our GROQ queries already flatten Sanity images down to a plain CDN URL
// (asset->url), so resizing is just appending the CDN's own image
// transform params rather than pulling in the @sanity/image-url builder.
export function sizedImage(url, { width, quality = 75 } = {}) {
    // SVGs are vector — CDN resizing does nothing useful for them.
    if (!url || url.endsWith(".svg")) return url;
    const params = new URLSearchParams();
    if (width) params.set("w", String(width));
    params.set("auto", "format");
    params.set("q", String(quality));
    return `${url}?${params.toString()}`;
}

// srcset of CDN-resized candidates, so the browser can pick the smallest
// one that still covers the rendered size (paired with a `sizes` attribute).
export function sizedSrcSet(url, widths, { quality } = {}) {
    if (!url) return undefined;
    return widths
        .map((w) => `${sizedImage(url, { width: w, quality })} ${w}w`)
        .join(", ");
}
