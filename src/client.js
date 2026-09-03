import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "lyh3u1ah",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: true,
});