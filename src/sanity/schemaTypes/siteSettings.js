import {defineField, defineType} from "sanity";

export default defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Site title",
            type: "string",
            description: "Shown as the hero heading and the browser tab title",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
            description: "The line under the name on the home page",
        }),
        defineField({
            name: "metaDescription",
            title: "Meta description",
            type: "text",
            rows: 2,
            description: "Used for search engines and link previews",
        }),
        defineField({
            name: "keywords",
            title: "Keywords",
            type: "array",
            of: [{type: "string"}],
            options: {layout: "tags"},
        }),
        defineField({
            name: "ogImage",
            title: "Social share image",
            type: "image",
            options: {hotspot: true},
        }),
        defineField({
            name: "socials",
            title: "Social links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "platform",
                            title: "Label",
                            type: "string",
                            description: "e.g. LinkedIn, GitHub, Email",
                            validation: (r) => r.required(),
                        }),
                        defineField({
                            name: "url",
                            title: "URL",
                            type: "url",
                            validation: (r) =>
                                r.required().uri({
                                    scheme: ["http", "https", "mailto"],
                                }),
                        }),
                    ],
                    preview: {select: {title: "platform", subtitle: "url"}},
                },
            ],
        }),
    ],
    preview: {prepare: () => ({title: "Site Settings"})},
});
