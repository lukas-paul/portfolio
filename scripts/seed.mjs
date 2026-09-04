/**
 * One-off content seed: moves the previously hard-coded site copy into
 * Sanity and migrates the old "About Text" post into the aboutPage singleton.
 *
 * Run once:  SANITY_TOKEN=<editor token> node scripts/seed.mjs
 * Safe to re-run — every write is createOrReplace against a fixed _id.
 */
import {createClient} from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) {
    console.error("Set SANITY_TOKEN (a token with write access).");
    process.exit(1);
}

const client = createClient({
    projectId: "lyh3u1ah",
    dataset: "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
});

const SKILLS = [
    {id: "html5", name: "HTML5", slug: "html5", url: "https://developer.mozilla.org/docs/Web/HTML"},
    {id: "css3", name: "CSS3", slug: "css", url: "https://developer.mozilla.org/docs/Web/CSS"},
    {id: "sass", name: "Sass", slug: "sass", url: "https://sass-lang.com"},
    {id: "p5", name: "p5.js", slug: "p5dotjs", url: "https://p5js.org"},
    {id: "javascript", name: "JavaScript", slug: "javascript", url: "https://developer.mozilla.org/docs/Web/JavaScript"},
    {id: "react", name: "React", slug: "react", url: "https://react.dev"},
    {id: "svelte", name: "Svelte", slug: "svelte", url: "https://svelte.dev"},
    {id: "vue", name: "Vue", slug: "vuedotjs", url: "https://vuejs.org"},
    {id: "typescript", name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org"},
    {id: "nodejs", name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org"},
    {id: "postgres", name: "PostgreSQL", slug: "postgresql", url: "https://www.postgresql.org"},
    {id: "socketio", name: "Socket.IO", slug: "socketdotio", url: "https://socket.io"},
];

const GROUPS = [
    {heading: "Style, Structure, Animation", skills: ["html5", "css3", "sass", "p5"]},
    {heading: "Language, Library, Framework", skills: ["javascript", "react", "svelte", "vue", "typescript"]},
    {heading: "Backend Technology", skills: ["nodejs", "postgres", "socketio"]},
];

const ref = (id) => ({_type: "reference", _ref: id});
const skillDocId = (id) => `skill-${id}`;

async function uploadIcon(slug) {
    const res = await fetch(`https://cdn.simpleicons.org/${slug}/000000`);
    if (!res.ok) throw new Error(`icon ${slug}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, {
        filename: `${slug}.svg`,
        contentType: "image/svg+xml",
    });
    return asset._id;
}

async function run() {
    // 1. tech skills (+ their icons)
    for (const s of SKILLS) {
        const assetId = await uploadIcon(s.slug);
        await client.createOrReplace({
            _id: skillDocId(s.id),
            _type: "techSkill",
            name: s.name,
            url: s.url,
            icon: {_type: "image", asset: {_type: "reference", _ref: assetId}},
        });
        console.log("skill:", s.name);
    }

    // 2. migrate the old About post -> aboutPage singleton
    const post = await client.fetch(
        `*[_type == "post" && !(_id in path("drafts.**"))][0]{ body, mainImage }`
    );
    const body = (post?.body || []).filter((b) => b._type !== "image");
    await client.createOrReplace({
        _id: "aboutPage",
        _type: "aboutPage",
        title: "About",
        profileImage: post?.mainImage,
        body,
    });
    console.log("aboutPage: migrated", body.length, "blocks");

    // 3. singletons
    await client.createOrReplace({
        _id: "siteSettings",
        _type: "siteSettings",
        title: "Lukas Frenzer",
        tagline: "Web Development, Comedy, Writing.",
        metaDescription: "Lukas Frenzer's Web Development Website",
        keywords: ["JavaScript", "Svelte", "React", "Vue", "Node.js", "CSS", "Art", "Creative", "Projects"],
        ogImage: {
            _type: "image",
            asset: {
                _type: "reference",
                _ref: "image-d355c5edc67956d4c5da4f6fee548ab4b098dcbe-605x556-png",
            },
        },
        socials: [
            {_key: "linkedin", platform: "LinkedIn", url: "https://www.linkedin.com/in/lukas-frenzer-7abb01137/"},
            {_key: "github", platform: "GitHub", url: "https://github.com/lukas-paul"},
            {_key: "email", platform: "Email", url: "mailto:lukas.frenzer@web.de?subject=Web Development Enquiry"},
        ],
    });
    console.log("siteSettings: done");

    await client.createOrReplace({
        _id: "homePage",
        _type: "homePage",
        intro:
            "I develop things for the Internet. I am a trained Full Stack Developer, meaning I am familiar with back- and front-end technologies.",
        techStackHeading: "Tech Stack",
        techGroups: GROUPS.map((g, i) => ({
            _key: `group-${i}`,
            heading: g.heading,
            skills: g.skills.map((id) => ({...ref(skillDocId(id)), _key: id})),
        })),
    });
    console.log("homePage: done");

    await client.createOrReplace({
        _id: "projectsPage",
        _type: "projectsPage",
        title: "Projects",
    });
    console.log("projectsPage: done");
}

run().then(
    () => console.log("\n✓ seed complete"),
    (err) => {
        console.error(err);
        process.exit(1);
    }
);
