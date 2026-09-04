// Site content
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import projectsPage from "./projectsPage";
import project from "./project";
import techSkill from "./techSkill";
import blockContent from "./blockContent";

// Legacy blog types — kept until the About content is migrated, then removed
import post from "./post";
import author from "./author";
import category from "./category";

export const schemaTypes = [
    siteSettings,
    homePage,
    aboutPage,
    projectsPage,
    project,
    techSkill,
    blockContent,
    post,
    author,
    category,
];
