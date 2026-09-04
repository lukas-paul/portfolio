// Types that exist as a single editable document
export const singletonTypes = new Set([
    "siteSettings",
    "homePage",
    "aboutPage",
    "projectsPage",
]);

// Document actions a singleton is allowed to use (no create / no delete)
export const singletonActions = new Set([
    "publish",
    "discardChanges",
    "restore",
]);

const singleton = (S, type, title) =>
    S.listItem()
        .title(title)
        .id(type)
        .child(S.document().schemaType(type).documentId(type).title(title));

export const structure = (S) =>
    S.list()
        .title("Content")
        .items([
            singleton(S, "siteSettings", "Site Settings"),
            singleton(S, "homePage", "Home Page"),
            singleton(S, "aboutPage", "About Page"),
            singleton(S, "projectsPage", "Projects Page"),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("techSkill").title("Tech Skills"),
            S.divider(),
            S.documentTypeListItem("post").title("Posts (legacy)"),
            S.documentTypeListItem("category").title("Categories (legacy)"),
            S.documentTypeListItem("author").title("Authors (legacy)"),
        ]);
