import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";

export default defineConfig({
    name: "default",
    title: "Lukas Frenzer",
    projectId: "lyh3u1ah",
    dataset: "production",
    basePath: "/studio",
    plugins: [structureTool(), visionTool()],
    schema: {types: schemaTypes},
});
