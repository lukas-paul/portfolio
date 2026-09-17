export const seoQuery = `*[_id == "siteSettings"][0]{
    title,
    metaDescription,
    keywords,
    "ogImage": ogImage.asset->url
}`;

export const homeQuery = `{
    "settings": *[_id == "siteSettings"][0]{ title, tagline },
    "home": *[_id == "homePage"][0]{
        intro,
        techStackHeading,
        techGroups[]{
            _key,
            heading,
            skills[]->{ _id, name, url, "icon": icon.asset->url }
        }
    }
}`;

export const aboutQuery = `*[_id == "aboutPage"][0]{
    title,
    "profileImage": profileImage.asset->url,
    body
}`;

export const projectsQuery = `{
    "page": *[_id == "projectsPage"][0]{ title, intro },
    "projects": *[_type == "project"] | order(date desc){
        _id,
        title,
        date,
        description,
        projectType,
        link,
        tags,
        mainImage{
            "url": asset->url,
            alt,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
        }
    }
}`;

export const socialsQuery = `*[_id == "siteSettings"][0].socials[]{ _key, platform, url }`;
