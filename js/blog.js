// Each entry points to a UTF-8 .txt file, loaded only when opened.
// created: use the real creation date in YYYY-MM-DD format.
// The dates below are examples: replace them with your actual dates.
// In .txt files, separate paragraphs with a blank line.
// Optional: start a subtitle with ## followed by a space.
// Existing content arrays and JSON contentUrl files remain supported.
const blogPosts = [
    {
        id: 1,
        slug: "blue-ocean",
        created: "2026-10-23", // Example date; replace with the actual date.
        featured: true,
        title: "Blue Ocean Strategy",
        image: "blueocean.jpg",
        topic: "Innovation",
        keywords: ["Strategy", "Creativity"],
        excerpt: "Innovation beyond competition.",
        url: "blog.html#blue-ocean",
        contentUrl: "assets/blog/stories/blue-ocean.txt"
    },
    {
        id: 2,
        slug: "digital-humans",
        created: "2026-10-23", // Example date; replace with the actual date.
        featured: true,
        title: "Digital Humans",
        image: "digitalhumans.jpg",
        topic: "Human–Computer Interaction",
        keywords: ["AI", "Interaction"],
        excerpt: "Future interaction systems.",
        url: "blog.html#digital-humans",
        contentUrl: "assets/blog/stories/digital-humans.txt"
    },
    {
        id: 3,
        slug: "edge-ai",
        created: "2026-10-23", // Example date; replace with the actual date.
        featured: true,
        title: "Edge AI",
        image: "edgeai.jpg",
        topic: "Artificial Intelligence",
        keywords: ["Embedded Systems", "Edge AI"],
        excerpt: "Running intelligence locally.",
        url: "blog.html#edge-ai",
        contentUrl: "assets/blog/stories/edge-ai.txt"
    }
];

(() => {
    function initializeBlog() {
        const grid = document.getElementById("blogGrid");
        if (!grid) return; // This file can also be loaded by the home page.
        const listing = document.getElementById("blogListing");
        const search = document.getElementById("blogSearch");
        const topic = document.getElementById("blogTopic");
        const count = document.getElementById("blogCount");
        const reader = document.getElementById("storyReader");
        const title = document.getElementById("storyTitle");
        const content = document.getElementById("storyContent");
        const cache = new Map();
        let version = 0;
        let listScroll = 0;
        let previousLink = null;
        let wasReading = false;

        function element(tag, className, text) {
            const node = document.createElement(tag);
            if (className) node.className = className;
            if (text !== undefined) node.textContent = text;
            return node;
        }
        function safeUrl(value, image = false) {
            try {
                const url = new URL(value, document.baseURI);
                return ["http:", "https:"].includes(url.protocol) ||
                    (image && url.protocol === "file:") ? url.href : null;
            } catch { return null; }
        }
        function creationTime(value) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;
            const date = new Date(value + "T12:00:00Z");
            if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
            const time = element("time", "story-date", "Created: " +
                new Intl.DateTimeFormat("en-US", {
                    year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
                }).format(date));
            time.dateTime = value;
            time.style.cssText = "display:block;font-size:11px;color:#9cb0c9;margin:0 0 8px;";
            return time;
        }
        function textBlocks(text) {
            const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
            const blocks = [];
            let paragraph = [];
            function flush() {
                if (paragraph.length) {
                    blocks.push({ type: "paragraph", text: paragraph.join("\n") });
                    paragraph = [];
                }
            }
            normalized.split("\n").forEach(line => {
                if (!line.trim()) flush();
                else if (/^#{1,3}\s+/.test(line)) {
                    flush();
                    blocks.push({ type: "heading", text: line.replace(/^#{1,3}\s+/, "") });
                } else paragraph.push(line);
            });
            flush();
            return blocks;
        }
        function renderCards() {
            const query = search.value.trim().toLocaleLowerCase();
            const filtered = blogPosts.filter(post =>
                (topic.value === "all" || post.topic === topic.value) &&
                [post.title, post.excerpt, post.topic, ...(post.keywords || [])]
                    .join(" ").toLocaleLowerCase().includes(query)
            );
            grid.replaceChildren();
            count.textContent = `${filtered.length} of ${blogPosts.length} stories`;
            filtered.forEach(post => {
                const card = element("article", "story-card");
                const cover = element("div", "story-cover");
                const icon = element("i", "fas fa-feather-pointed");
                icon.setAttribute("aria-hidden", "true");
                cover.append(icon);
                if (post.image) {
                    const image = document.createElement("img");
                    image.alt = "";
                    image.loading = "lazy";
                    image.decoding = "async";
                    image.width = 300; image.height = 150;
                    image.addEventListener("error", () => image.remove(), { once: true });
                    image.addEventListener("load", () => icon.remove(), { once: true });
                    image.src = `assets/blog/${post.image}`;
                    cover.append(image);
                    // The fallback icon is hidden while a real cover is present.
                    icon.style.display = "none";
                    image.addEventListener("error", () => { icon.style.display = ""; }, { once: true });
                }
                const body = element("div", "story-body");
                body.append(element("span", "story-topic", post.topic || "Personal notes"));
                body.append(element("h2", "", post.title));
                const created = creationTime(post.created);
                if (created) body.append(created);
                body.append(element("p", "", post.excerpt));
                const link = element("a", "story-link", "Read more →");
                link.href = `#${encodeURIComponent(post.slug)}`;
                link.setAttribute("aria-label", `Read more: ${post.title}`);
                link.addEventListener("click", () => {
                    listScroll = window.scrollY;
                    previousLink = link;
                });
                body.append(link); card.append(cover, body); grid.append(card);
            });
            if (!filtered.length) grid.append(element("p", "blog-empty", "No stories match your search. Try another topic or keyword."));
        }
        function renderContent(blocks) {
            content.replaceChildren();
            if (!blocks.length) {
                content.append(element("p", "story-note", "The full story has not been published yet. Check back soon."));
                return;
            }
            for (const block of blocks) {
                if (!block || typeof block !== "object") continue;
                if (block.type === "paragraph" || block.type === "heading") {
                    const node = element(block.type === "heading" ? "h3" : "p", "", block.text || "");
                    node.style.whiteSpace = "pre-line";
                    content.append(node);
                } else if (block.type === "image" && block.src) {
                    const url = safeUrl(block.src, true);
                    if (!url) continue;
                    const figure = element("figure");
                    const img = document.createElement("img");
                    img.src = url; img.alt = block.alt || ""; img.loading = "lazy";
                    img.addEventListener("error", () => figure.remove(), { once: true });
                    figure.append(img);
                    if (block.caption) figure.append(element("figcaption", "", block.caption));
                    content.append(figure);
                } else if (block.type === "link") {
                    const url = safeUrl(block.href);
                    if (!url) continue;
                    const p = element("p");
                    const a = element("a", "", block.text || url);
                    a.href = url; a.rel = "noopener noreferrer";
                    p.append(a); content.append(p);
                }
            }
        }
        async function route() {
            const request = ++version;
            let slug;
            try { slug = decodeURIComponent(location.hash.slice(1)); }
            catch { slug = ""; }
            const post = blogPosts.find(item => item.slug === slug);
            if (!post) {
                const restore = wasReading;
                listing.hidden = false; reader.hidden = true;
                document.title = "Blog | Bruno Senzio-Savino";
                wasReading = false;
                if (restore) {
                    previousLink?.focus({ preventScroll: true });
                    window.scrollTo(0, listScroll);
                }
                return;
            }
            wasReading = true;
            listing.hidden = true; reader.hidden = false;
            title.textContent = post.title;
            document.getElementById("storyCreated")?.remove();
            const created = creationTime(post.created);
            if (created) { created.id = "storyCreated"; title.after(created); }
            document.getElementById("storyTopic").textContent = post.topic || "Personal notes";
            document.getElementById("storyExcerpt").textContent = post.excerpt || "";
            document.title = `${post.title} | Bruno Senzio-Savino`;
            title.focus({ preventScroll: true });
            reader.style.scrollMarginTop = "90px";
            reader.scrollIntoView({ block: "start" });
            if (!post.contentUrl) {
                renderContent(Array.isArray(post.content) ? post.content : []);
                return;
            }
            content.replaceChildren(element("p", "story-note", "Loading story…"));
            try {
                const url = new URL(post.contentUrl, document.baseURI);
                if (url.origin !== location.origin) throw new Error("Use a same-site story file.");
                let blocks = cache.get(post.slug);
                if (!blocks) {
                    const response = await fetch(url, { cache: "no-cache" });
                    if (!response.ok) throw new Error("Story unavailable");
                    blocks = /\.txt$/i.test(url.pathname)
                        ? textBlocks(await response.text())
                        : await response.json();
                    if (!Array.isArray(blocks)) throw new Error("Invalid story format");
                    cache.set(post.slug, blocks);
                }
                if (request === version) renderContent(blocks);
            } catch {
                if (request !== version) return;
                content.replaceChildren(element("p", "story-note", "This story could not be loaded. Please try again."));
                const retry = element("button", "sound-button", "Try again");
                retry.type = "button"; retry.addEventListener("click", route); content.append(retry);
            }
        }
        [...new Set(blogPosts.map(post => post.topic).filter(Boolean))].sort()
            .forEach(value => {
                const option = element("option", "", value);
                option.value = value; topic.append(option);
            });
        search.addEventListener("input", renderCards);
        topic.addEventListener("change", renderCards);
        window.addEventListener("hashchange", route);
        renderCards(); route();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeBlog, { once: true });
    else initializeBlog();
})();
