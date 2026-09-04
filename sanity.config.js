import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";
import {
    structure,
    singletonTypes,
    singletonActions,
} from "./src/sanity/structure";

export default defineConfig({
    name: "default",
    title: "Lukas Frenzer",
    projectId: "lyh3u1ah",
    dataset: "production",
    basePath: "/studio",
    plugins: [structureTool({structure}), visionTool()],
    schema: {
        types: schemaTypes,
        // singletons can't be created from the "new document" menu
        templates: (templates) =>
            templates.filter(
                ({schemaType}) => !singletonTypes.has(schemaType)
            ),
    },
    document: {
        // singletons can't be duplicated or deleted
        actions: (input, context) =>
            singletonTypes.has(context.schemaType)
                ? input.filter(
                      ({action}) => action && singletonActions.has(action)
                  )
                : input,
    },
});
