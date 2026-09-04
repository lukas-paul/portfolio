import {defineArrayMember, defineField, defineType} from "sanity";

export default defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    fields: [
        defineField({
            name: "intro",
            title: "Intro paragraph",
            type: "text",
            rows: 3,
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
