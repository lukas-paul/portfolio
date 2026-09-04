import {defineField, defineType} from "sanity";

export default defineType({
    name: "aboutPage",
    title: "About Page",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Page heading",
            type: "string",
            initialValue: "About",
        }),
        defineField({
            name: "profileImage",
            title: "Profile image",
            type: "image",
            options: {hotspot: true},
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "blockContent",
        }),
    ],
    preview: {prepare: () => ({title: "About Page"})},
});
