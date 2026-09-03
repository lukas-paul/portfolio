import { createClient } from "@sanity/client";

export default createClient({
    projectId: "lyh3u1ah",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});