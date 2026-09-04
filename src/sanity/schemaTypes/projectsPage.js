import {defineField, defineType} from "sanity";

export default defineType({
    name: "projectsPage",
    title: "Projects Page",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Page heading",
            type: "string",
            initialValue: "Projects",
        }),
        defineField({
            name: "intro",
            title: "Intro paragraph",
            type: "text",
            rows: 3,
            description: "Optional — shown under the heading",
        }),
    ],
    preview: {prepare: () => ({title: "Projects Page"})},
});
