import {defineArrayMember, defineField, defineType} from "sanity";

export default defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    fields: [
        defineField({
            name: "intro",
            title: "Intro",
            type: "array",
            of: [
                defineArrayMember({
                    type: "block",
                    styles: [{title: "Normal", value: "normal"}],
                    lists: [],
                    marks: {
                        decorators: [
                            {title: "Bold", value: "strong"},
                            {title: "Italic", value: "em"},
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                    },
                                ],
                            },
                        ],
                    },
                }),
            ],
        }),
        defineField({
            name: "techStackHeading",
            title: "Tech stack heading",
            type: "string",
            initialValue: "Tech Stack",
        }),
        defineField({
            name: "techGroups",
            title: "Tech stack groups",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "heading",
                            title: "Group heading",
                            type: "string",
                            validation: (r) => r.required(),
                        }),
                        defineField({
                            name: "skills",
                            title: "Skills",
                            type: "array",
                            of: [
                                {
                                    type: "reference",
                                    to: [{type: "techSkill"}],
                                },
                            ],
                        }),
                    ],
                    preview: {
                        select: {title: "heading", skills: "skills"},
                        prepare({title, skills}) {
                            const count = skills?.length || 0;
                            return {
                                title,
                                subtitle: `${count} skill${
                                    count === 1 ? "" : "s"
                                }`,
                            };
                        },
                    },
                }),
            ],
        }),
    ],
    preview: {prepare: () => ({title: "Home Page"})},
});
