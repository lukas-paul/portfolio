import {defineField, defineType} from "sanity";

export default defineType({
    name: "techSkill",
    title: "Tech Skill",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "icon",
            title: "Icon",
            type: "image",
            description: "Square icon, ideally SVG or a transparent PNG",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "url",
            title: "Link",
            type: "url",
            description: "Optional — link to the technology's website",
        }),
    ],
    preview: {select: {title: "name", media: "icon"}},
});
