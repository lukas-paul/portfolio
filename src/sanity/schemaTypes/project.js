import {defineField, defineType} from "sanity";

export default defineType({
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        defineField({name: "title", type: "string"}),
        defineField({
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {hotspot: true},
        }),
        defineField({name: "date", type: "datetime"}),
        defineField({name: "description", type: "text"}),
        defineField({
            name: "projectType",
            title: "Project type",
            type: "string",
            options: {
                list: [
                    {value: "personal", title: "Personal"},
                    {value: "client", title: "Client"},
                    {value: "school", title: "School"},
                ],
            },
        }),
        defineField({name: "link", type: "url"}),
        defineField({
            name: "tags",
            type: "array",
            of: [{type: "string"}],
            options: {layout: "tags"},
        }),
    ],
    preview: {
        select: {title: "title", subtitle: "projectType", media: "mainImage"},
    },
});
