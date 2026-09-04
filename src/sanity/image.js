// Our GROQ queries already flatten Sanity images down to a plain CDN URL
// (asset->url), so resizing is just appending the CDN's own image
// transform params rather than pulling in the @sanity/image-url builder.
export function sizedImage(url, { width, quality = 75 } = {}) {
    if (!url) return url;
    const params = new URLSearchParams();
    if (width) params.set("w", String(width));
    params.set("auto", "format");
    params.set("q", String(quality));
    return `${url}?${params.toString()}`;
}
