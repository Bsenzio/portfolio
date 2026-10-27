/** Blog data, filtering, story loading, translation, and carousel interactions. */
// blog page bundle rebuilt from original scripts, in source order.
// ---- js/blog.js ----
(() => {
    // Cover images: assets/blog/titleimg/ (relative to blog.html).
    // Example: image: "ubraction_logo.jpg" loads assets/blog/titleimg/ubraction_logo.jpg.
    // Original language of each TXT: defaultLanguage: "es", "en" or "ja".
    // Also accepts "Español", "English" and "日本語".
    // Translate each story title, excerpt and TXT body. The site UI stays unchanged.
    // Google public translation service: requires Internet; availability is not guaranteed.
    // YouTube: paste one full video URL on a separate line in the TXT.
    // Each entry points to a UTF-8 .txt file, loaded only when opened.
    // created: use the real creation date in YYYY-MM-DD format.
    // The dates below are examples: replace them with your actual dates.
    // In .txt files, separate paragraphs with a blank line.
    // Optional: start a subtitle with ## followed by a space.
    // Images in TXT: ![Description](assets/blog/photo.jpg "Optional caption")
    // Image paths are relative to blog.html, not the TXT file.
    // Existing content arrays and JSON contentUrl files remain supported.
    const blogPosts = [
        {
            id: 1,
            slug: 'ubr-action',
            defaultLanguage: 'es',
            created: '2024-06-23', // Example date; replace with the actual date.
            featured: true,
            title: 'UBR ACTION: El Despertar',
            image: 'ubraction_logo.jpg',
            topic: 'Crónicas',
            keywords: ['UBR Action', 'Adventure', 'Real Life'],
            excerpt: 'Godín de día, Superhéroe de noche...',
            url: 'blog.html#ubr-action',
            contentUrl: 'assets/blog/stories/ubr-action.txt',
        },
        {
            id: 2,
            slug: 'pdo-3d',
            defaultLanguage: 'es',
            created: '2024-08-10', // Example date; replace with the actual date.
            featured: true,
            title: 'Plurinominal de oposición (PDO)',
            image: 'pdo_title.jpg',
            topic: 'El tres de',
            keywords: ['PDO3D', 'Games', 'Pre-AI'],
            excerpt: 'La historia mi chavo',
            url: 'blog.html#pdo-3d',
            contentUrl: 'assets/blog/stories/pdo-3d.txt',
        },
        {
            id: 3,
            slug: 'srl-guy',
            defaultLanguage: 'ja',
            created: '2017-07-11', // Example date; replace with the actual date.
            featured: true,
            title: 'SRL Guy',
            image: 'srl_guy.jpg',
            topic: 'Going Supernumerary',
            keywords: ['Embedded Systems', 'SRLs', 'Japan'],
            excerpt: 'Being Supernumerary Japanese',
            url: 'blog.html#srl-guy',
            contentUrl: 'assets/blog/stories/srl-guy.txt',
        },
        {
            id: 4,
            slug: 'maputo',
            defaultLanguage: 'en',
            created: '2026-10-23', // Example date; replace with the actual date.
            featured: true,
            title: 'Maputo Fighters',
            image: 'maputo_fighters.jpg',
            topic: 'Fighting Games',
            keywords: [
                'Embedded Systems',
                'Games',
                'Entertainment',
                'Friendly Abroad',
                'Fighting Games',
            ],
            excerpt: 'Mozambique fighters yeah!',
            url: 'blog.html#maputo-fighters',
            contentUrl: 'assets/blog/stories/maputo-fighters.txt',
        },
        {
            id: 5,
            slug: 'glasses',
            defaultLanguage: 'en',
            created: '2026-07-10', // Example date; replace with the actual date.
            featured: true,
            title: 'VaSenzios Holograph',
            image: 'glass_holograph.jpg',
            topic: 'Hologlasses',
            keywords: ['Invention', 'Ideas', 'Friendly Abroad'],
            excerpt: 'An idea for holographic tech in your table...',
            url: 'blog.html#glass-holograph',
            contentUrl: 'assets/blog/stories/glass-holograph.txt',
        },
    ];

    (() => {
        function initializeBlog() {
            const grid = document.getElementById('blogGrid');
            if (!grid) return; // This file can also be loaded by the home page.
            const listing = document.getElementById('blogListing');
            const search = document.getElementById('blogSearch');
            const topic = document.getElementById('blogTopic');
            const keywordFilter = document.getElementById('blogKeyword');
            const selectedKeywordsContainer = document.getElementById('blogSelectedKeywords');
            const selectedKeywords = new Set();
            const count = document.getElementById('blogCount');
            const languageFilter = document.getElementById('blogLanguage');
            const dateFrom = document.getElementById('blogDateFrom');
            const dateTo = document.getElementById('blogDateTo');
            const resetFilters = document.getElementById('blogResetFilters');
            const reader = document.getElementById('storyReader');
            const title = document.getElementById('storyTitle');
            const content = document.getElementById('storyContent');
            const cache = new Map();
            let version = 0;
            let listScroll = 0;
            let previousLink = null;
            let wasReading = false;
            const languageButton = document.getElementById('storyLanguage');
            const languageStatus = document.getElementById('translationStatus');
            const languages = ['es', 'en', 'ja'];
            const labels = { es: 'Español', en: 'English', ja: '日本語' };
            const translations = new Map();
            let activePost = null;
            let originalBlocks = null;
            let currentLanguage = 'es';
            let translationController = null;
            function sourceLanguage(post) {
                const value = String(post.defaultLanguage || 'es')
                    .trim()
                    .toLowerCase();
                return (
                    { español: 'es', spanish: 'es', english: 'en', japanese: 'ja', 日本語: 'ja' }[
                        value
                    ] || (languages.includes(value) ? value : 'es')
                );
            }
            function languageState(language) {
                currentLanguage = language;
                reader.dataset.language = language;
                content.lang = language;
                languageButton.textContent = labels[language];
                const next = languages[(languages.indexOf(language) + 1) % languages.length];
                languageButton.setAttribute(
                    'aria-label',
                    `Language: ${labels[language]}. Switch to ${labels[next]}`,
                );
                languageButton.title = `Switch to ${labels[next]}`;
            }
            function showTranslationStatus(message = '') {
                languageStatus.textContent = message;
                languageStatus.hidden = !message;
            }
            function storyReady(blocks, request) {
                if (request !== version) return;
                originalBlocks = structuredClone(blocks);
                renderContent(blocks);
                languageButton.disabled = !postIsTxt(activePost);
            }
            function postIsTxt(post) {
                if (!post?.contentUrl) return false;
                try {
                    return /\.txt$/i.test(new URL(post.contentUrl, document.baseURI).pathname);
                } catch {
                    return false;
                }
            }
            async function translateText(text, source, target, signal) {
                if (!text || !text.trim()) return text;
                // Bound each URL and preserve every character, including long paragraphs.
                const characters = Array.from(text);
                const pieces = [];
                for (let i = 0; i < characters.length; i += 900) {
                    const part = characters.slice(i, i + 900).join('');
                    const params = new URLSearchParams({
                        client: 'gtx',
                        sl: source,
                        tl: target,
                        dt: 't',
                        q: part,
                    });
                    const response = await fetch(
                        'https://translate.googleapis.com/translate_a/single?' + params,
                        { signal },
                    );
                    if (!response.ok) throw new Error('Translation unavailable');
                    const data = await response.json();
                    if (!Array.isArray(data?.[0])) throw new Error('Invalid translation');
                    const translated = data[0]
                        .map((item) => (typeof item?.[0] === 'string' ? item[0] : ''))
                        .join('');
                    if (!translated) throw new Error('Empty translation');
                    pieces.push(translated);
                }
                return pieces.join('');
            }
            languageButton?.addEventListener('click', async () => {
                if (
                    !activePost ||
                    !originalBlocks ||
                    languageButton.disabled ||
                    !postIsTxt(activePost)
                )
                    return;
                const request = version;
                const post = activePost;
                const source = sourceLanguage(post);
                const target =
                    languages[(languages.indexOf(currentLanguage) + 1) % languages.length];
                const key = JSON.stringify([
                    post.slug,
                    source,
                    target,
                    post.title,
                    post.excerpt,
                    post.topic,
                    originalBlocks,
                ]);
                translationController?.abort();
                const controller = new AbortController();
                translationController = controller;
                const timeout = setTimeout(() => controller.abort(), 90000);
                languageButton.disabled = true;
                reader.setAttribute('aria-busy', 'true');
                showTranslationStatus('Translating…');
                try {
                    let result = translations.get(key);
                    if (!result) {
                        result = {
                            title: post.title,
                            excerpt: post.excerpt || '',
                            topic: post.topic || '',
                            blocks: structuredClone(originalBlocks),
                        };
                        if (target !== source) {
                            for (const field of ['title', 'excerpt']) {
                                result[field] = await translateText(
                                    result[field],
                                    source,
                                    target,
                                    controller.signal,
                                );
                            }
                            for (const block of result.blocks) {
                                const fields = ['paragraph', 'heading', 'link'].includes(block.type)
                                    ? ['text']
                                    : block.type === 'image'
                                      ? ['alt', 'caption']
                                      : [];
                                for (const field of fields) {
                                    if (typeof block[field] === 'string')
                                        block[field] = await translateText(
                                            block[field],
                                            source,
                                            target,
                                            controller.signal,
                                        );
                                }
                            }
                        }
                        translations.set(key, result);
                    }
                    if (request !== version) return;
                    title.textContent = result.title;
                    title.lang = target;
                    const excerpt = document.getElementById('storyExcerpt');
                    excerpt.textContent = result.excerpt;
                    excerpt.lang = target;
                    document.title = `${result.title} | Bruno Senzio-Savino`;
                    languageState(target);
                    renderContent(result.blocks);
                    showTranslationStatus();
                } catch {
                    if (request === version)
                        showTranslationStatus(
                            'Translation unavailable. Click the language button to try again.',
                        );
                } finally {
                    clearTimeout(timeout);
                    if (request === version) {
                        reader.removeAttribute('aria-busy');
                        languageButton.disabled = false;
                    }
                }
            });

            function element(tag, className, text) {
                const node = document.createElement(tag);
                if (className) node.className = className;
                if (text !== undefined) node.textContent = text;
                return node;
            }
            function safeUrl(value, image = false) {
                try {
                    const url = new URL(value, document.baseURI);
                    return ['http:', 'https:'].includes(url.protocol) ||
                        (image && url.protocol === 'file:')
                        ? url.href
                        : null;
                } catch {
                    return null;
                }
            }
            function validDate(value) {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
                const date = new Date(value + 'T12:00:00Z');
                return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
            }
            function creationTime(value) {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
                const date = new Date(value + 'T12:00:00Z');
                if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value)
                    return null;
                const time = element(
                    'time',
                    'story-date',
                    'Created: ' +
                        new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC',
                        }).format(date),
                );
                time.dateTime = value;
                time.style.cssText = 'display:block;font-size:11px;color:#9cb0c9;margin:0 0 8px;';
                return time;
            }
            function youtubeVideo(value) {
                try {
                    const url = new URL(value);
                    if (!['https:', 'http:'].includes(url.protocol)) return null;
                    const host = url.hostname.toLowerCase();
                    let id;
                    if (host === 'youtu.be' || host === 'www.youtu.be') {
                        id = url.pathname.split('/')[1];
                    } else if (
                        [
                            'youtube.com',
                            'www.youtube.com',
                            'm.youtube.com',
                            'youtube-nocookie.com',
                            'www.youtube-nocookie.com',
                        ].includes(host)
                    ) {
                        const parts = url.pathname.split('/').filter(Boolean);
                        if (parts[0] === 'watch') id = url.searchParams.get('v');
                        else if (['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1];
                    }
                    if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return null;
                    return id;
                } catch {
                    return null;
                }
            }
            function textBlocks(text) {
                const normalized = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
                const blocks = [];
                let paragraph = [];
                function flush() {
                    if (paragraph.length) {
                        blocks.push({ type: 'paragraph', text: paragraph.join('\n') });
                        paragraph = [];
                    }
                }
                normalized.split('\n').forEach((line) => {
                    const trimmed = line.trim();
                    const videoId = youtubeVideo(trimmed);
                    // One image per line: ![Description](path "Optional caption")
                    // Use <path> if a filename contains spaces or parentheses.
                    const image = trimmed.match(
                        /^!\[([^\]]*)\]\(\s*(?:<([^>]+)>|([^\s]+?))(?:\s+"([^"]*)")?\s*\)$/,
                    );
                    if (!trimmed) flush();
                    else if (videoId) {
                        flush();
                        blocks.push({ type: 'youtube', videoId });
                    } else if (image) {
                        flush();
                        blocks.push({
                            type: 'image',
                            src: image[2] || image[3],
                            alt: image[1],
                            caption: image[4] || '',
                        });
                    } else if (/^#{1,3}\s+/.test(line)) {
                        flush();
                        blocks.push({ type: 'heading', text: line.replace(/^#{1,3}\s+/, '') });
                    } else paragraph.push(line);
                });
                flush();
                return blocks;
            }
            const prev = document.getElementById('carouselPrev');
            const next = document.getElementById('carouselNext');
            const dots = document.getElementById('carouselDots');
            const position = document.getElementById('carouselPosition');
            // A fresh audio instance allows quick successive clicks without cutting off a sound.
            function playCarouselSound(file) {
                const audio = new Audio(`assets/audio/sfx/${file}`);
                audio.volume = 0.55;
                audio.play().catch(() => {});
            }
            for (const button of [prev, next]) {
                button.addEventListener('mouseenter', () => {
                    if (!button.disabled) playCarouselSound('sfxhover.mp3');
                });
                button.addEventListener('click', () => {
                    if (!button.disabled) playCarouselSound('sfxclick.mp3');
                });
            }
            const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
            function scheduleSparkle(card) {
                const delay = 800 + Math.random() * 6500;
                setTimeout(() => {
                    if (!card.isConnected) return;
                    if (!reducedMotion.matches && !document.hidden) {
                        const side = Math.floor(Math.random() * 4);
                        const along = 8 + Math.random() * 84;
                        const x = side === 0 ? 0 : side === 1 ? 100 : along;
                        const y = side === 2 ? 0 : side === 3 ? 100 : along;
                        card.style.setProperty('--spark-x', `${x}%`);
                        card.style.setProperty('--spark-y', `${y}%`);
                        card.style.setProperty(
                            '--spark-duration',
                            `${(0.8 + Math.random() * 0.8).toFixed(2)}s`,
                        );
                        card.classList.remove('is-sparkling');
                        void card.offsetWidth;
                        card.classList.add('is-sparkling');
                    }
                    scheduleSparkle(card);
                }, delay);
            }
            grid.addEventListener('pointermove', (event) => {
                if (event.pointerType === 'touch' || reducedMotion.matches) return;
                const card = event.target.closest('.story-card');
                if (!card || card.getAttribute('aria-hidden') === 'true') return;
                const box = card.getBoundingClientRect();
                card.style.setProperty(
                    '--image-x',
                    `${((event.clientX - box.left) / box.width - 0.5) * -10}px`,
                );
                card.style.setProperty(
                    '--image-y',
                    `${((event.clientY - box.top) / box.height - 0.5) * -7}px`,
                );
            });
            grid.addEventListener('pointerout', (event) => {
                const card = event.target.closest('.story-card');
                if (card && !card.contains(event.relatedTarget)) {
                    card.style.removeProperty('--image-x');
                    card.style.removeProperty('--image-y');
                }
            });
            let carouselIndex = 0;
            function updateCarousel() {
                const slides = [...grid.querySelectorAll('.story-card')];
                if (!slides.length) {
                    prev.disabled = next.disabled = true;
                    position.textContent = '';
                    dots.replaceChildren();
                    return;
                }
                carouselIndex = (carouselIndex + slides.length) % slides.length;
                prev.disabled = next.disabled = slides.length < 2;
                position.textContent = `${String(carouselIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
                const spacing = Math.min(grid.clientWidth * 0.31, 320);
                slides.forEach((slide, index) => {
                    let offset = index - carouselIndex;
                    const half = Math.floor(slides.length / 2);
                    if (offset < -half) offset += slides.length;
                    if (offset > half) offset -= slides.length;
                    const distance = Math.abs(offset);
                    const visible = distance <= 2;
                    const scale = distance === 0 ? 1 : distance === 1 ? 0.82 : 0.65;
                    const angle =
                        offset === 0 ? 0 : (offset < 0 ? 1 : -1) * (distance === 1 ? 40 : 55);
                    slide.style.transform = `translate(-50%, -50%) translateX(${offset * spacing}px) rotateY(${angle}deg) scale(${scale})`;
                    slide.style.zIndex = String(Math.max(0, 10 - distance * 4));
                    slide.style.opacity = !visible
                        ? '0'
                        : distance === 0
                          ? '1'
                          : distance === 1
                            ? '.85'
                            : '.45';
                    slide.style.pointerEvents = visible ? 'auto' : 'none';
                    slide.setAttribute('aria-hidden', String(offset !== 0));
                    const link = slide.querySelector('.story-link');
                    if (link) link.tabIndex = offset === 0 ? 0 : -1;
                });
                [...dots.children].forEach((dot, i) =>
                    dot.setAttribute('aria-current', String(i === carouselIndex)),
                );
            }
            function goToStory(index) {
                carouselIndex = index;
                updateCarousel();
            }
            prev.addEventListener('click', () => goToStory(carouselIndex - 1));
            next.addEventListener('click', () => goToStory(carouselIndex + 1));
            grid.addEventListener('click', (event) => {
                const slide = event.target.closest('.story-card');
                if (!slide) return;
                const index = [...grid.querySelectorAll('.story-card')].indexOf(slide);
                if (index !== carouselIndex) {
                    event.preventDefault();
                    goToStory(index);
                }
            });
            grid.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                    goToStory(carouselIndex + (event.key === 'ArrowRight' ? 1 : -1));
                }
            });
            let touchStartX = null;
            grid.addEventListener(
                'touchstart',
                (event) => {
                    touchStartX = event.touches[0].clientX;
                },
                { passive: true },
            );
            grid.addEventListener(
                'touchend',
                (event) => {
                    if (touchStartX === null) return;
                    const delta = event.changedTouches[0].clientX - touchStartX;
                    if (Math.abs(delta) > 45) goToStory(carouselIndex + (delta < 0 ? 1 : -1));
                    touchStartX = null;
                },
                { passive: true },
            );
            window.addEventListener('resize', updateCarousel);
            function renderCards() {
                const query = search.value.trim().toLocaleLowerCase();
                const from = dateFrom?.value || '';
                const to = dateTo?.value || '';
                const invalidRange = Boolean(from && to && from > to);
                const matches = (post, ignored = '') => {
                    const language = sourceLanguage(post);
                    const created = validDate(post.created) ? post.created : '';
                    const formattedDate = created
                        ? new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              timeZone: 'UTC',
                          }).format(new Date(created + 'T12:00:00Z'))
                        : '';
                    const aliases = {
                        es: 'es español spanish',
                        en: 'en english inglés',
                        ja: 'ja 日本語 japanese japonés',
                    };
                    return (
                        !invalidRange &&
                        (ignored === 'topic' ||
                            topic.value === 'all' ||
                            post.topic === topic.value) &&
                        [...selectedKeywords].every((keyword) =>
                            (post.keywords || []).includes(keyword),
                        ) &&
                        (ignored === 'language' ||
                            !languageFilter ||
                            languageFilter.value === 'all' ||
                            languageFilter.value === language) &&
                        (!from || (created && created >= from)) &&
                        (!to || (created && created <= to)) &&
                        [
                            post.title,
                            post.excerpt,
                            post.topic,
                            aliases[language],
                            created,
                            formattedDate,
                            ...(post.keywords || []),
                        ]
                            .join(' ')
                            .toLocaleLowerCase()
                            .includes(query)
                    );
                };
                // Each menu shows availability under every other active filter.
                for (const [control, kind, values] of [
                    [topic, 'topic', (post) => [post.topic]],
                    [keywordFilter, 'keyword', (post) => post.keywords || []],
                    [languageFilter, 'language', (post) => [sourceLanguage(post)]],
                ]) {
                    if (!control) continue;
                    const available = new Set(
                        blogPosts.filter((post) => matches(post, kind)).flatMap(values),
                    );
                    for (const option of control.options) {
                        option.disabled =
                            option.value !== 'all' &&
                            option.value !== '' &&
                            (kind === 'keyword'
                                ? selectedKeywords.has(option.value) || !available.has(option.value)
                                : option.value !== control.value && !available.has(option.value));
                    }
                }
                const filtered = blogPosts
                    .filter((post) => matches(post))
                    .sort((a, b) => {
                        // ISO dates sort chronologically; undated entries go last.
                        const aDate = validDate(a.created) ? a.created : '';
                        const bDate = validDate(b.created) ? b.created : '';
                        return (
                            bDate.localeCompare(aDate) || (Number(b.id) || 0) - (Number(a.id) || 0)
                        );
                    });
                grid.replaceChildren();
                dots.replaceChildren();
                carouselIndex = 0;
                grid.scrollLeft = 0;
                count.textContent = invalidRange
                    ? 'The From date must be on or before the To date.'
                    : `${filtered.length} of ${blogPosts.length} stories`;
                filtered.forEach((post, index) => {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.setAttribute('aria-label', `Show story ${index + 1}: ${post.title}`);
                    dot.addEventListener('click', () => goToStory(index));
                    dots.append(dot);
                    const card = element('article', 'story-card');
                    card.dataset.language = sourceLanguage(post);
                    scheduleSparkle(card);
                    // Card metadata remains in the site language (English).
                    const cover = element('div', 'story-cover');
                    const icon = element('i', 'fas fa-feather-pointed');
                    icon.setAttribute('aria-hidden', 'true');
                    cover.append(icon);
                    if (post.image) {
                        const image = document.createElement('img');
                        image.alt = '';
                        image.loading = 'lazy';
                        image.decoding = 'async';
                        image.width = 300;
                        image.height = 150;
                        image.addEventListener('error', () => image.remove(), { once: true });
                        image.addEventListener('load', () => icon.remove(), { once: true });
                        image.src = `assets/blog/titleimg/${post.image}`;
                        cover.append(image);
                        // The fallback icon is hidden while a real cover is present.
                        icon.style.display = 'none';
                        image.addEventListener(
                            'error',
                            () => {
                                icon.style.display = '';
                            },
                            { once: true },
                        );
                    }
                    const body = element('div', 'story-body');
                    body.append(element('span', 'story-topic', post.topic || 'Personal notes'));
                    body.append(element('h2', '', post.title));
                    const created = creationTime(post.created);
                    if (created) body.append(created);
                    body.append(
                        element(
                            'span',
                            'story-original-language',
                            'Original language: ' + labels[sourceLanguage(post)],
                        ),
                    );
                    body.append(element('p', '', post.excerpt));
                    const link = element('a', 'story-link', 'Read more →');
                    link.href = `#${encodeURIComponent(post.slug)}`;
                    link.setAttribute('aria-label', `Read more: ${post.title}`);
                    link.addEventListener('click', () => {
                        listScroll = window.scrollY;
                        previousLink = link;
                    });
                    body.append(link);
                    card.append(cover, body);
                    grid.append(card);
                });
                if (!filtered.length)
                    grid.append(
                        element(
                            'p',
                            'blog-empty',
                            'No stories match your filters. Try another keyword, language or date range.',
                        ),
                    );
                updateCarousel();
            }
            function renderContent(blocks) {
                content.replaceChildren();
                if (!blocks.length) {
                    content.append(
                        element(
                            'p',
                            'story-note',
                            'The full story has not been published yet. Check back soon.',
                        ),
                    );
                    return;
                }
                for (const block of blocks) {
                    if (!block || typeof block !== 'object') continue;
                    if (block.type === 'paragraph' || block.type === 'heading') {
                        const node = element(
                            block.type === 'heading' ? 'h3' : 'p',
                            '',
                            block.text || '',
                        );
                        node.style.whiteSpace = 'pre-line';
                        content.append(node);
                    } else if (block.type === 'image' && block.src) {
                        const url = safeUrl(block.src, true);
                        if (!url) continue;
                        const figure = element('figure');
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = block.alt || '';
                        img.loading = 'lazy';
                        img.addEventListener('error', () => figure.remove(), { once: true });
                        figure.append(img);
                        if (block.caption) figure.append(element('figcaption', '', block.caption));
                        content.append(figure);
                    } else if (block.type === 'youtube') {
                        const id = block.videoId;
                        if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) continue;
                        const figure = element('figure', 'story-video');
                        const frame = document.createElement('iframe');
                        frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&playsinline=1`;
                        frame.title = 'YouTube video';
                        frame.loading = 'lazy';
                        frame.width = '640';
                        frame.height = '360';
                        frame.style.cssText =
                            'display:block;width:100%;height:auto;aspect-ratio:16/9;min-height:200px;border:0;border-radius:12px;background:#080e19;';
                        frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
                        frame.allowFullscreen = true;
                        frame.referrerPolicy = 'strict-origin-when-cross-origin';
                        const caption = element('figcaption');
                        const link = element('a', '', 'Watch on YouTube ↗');
                        link.href = `https://www.youtube.com/watch?v=${id}`;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        caption.append(link);
                        figure.append(frame, caption);
                        content.append(figure);
                    } else if (block.type === 'link') {
                        const url = safeUrl(block.href);
                        if (!url) continue;
                        const p = element('p');
                        const a = element('a', '', block.text || url);
                        a.href = url;
                        a.rel = 'noopener noreferrer';
                        p.append(a);
                        content.append(p);
                    }
                }
            }
            async function route() {
                const request = ++version;
                translationController?.abort();
                activePost = null;
                originalBlocks = null;
                languageButton.disabled = true;
                reader.removeAttribute('aria-busy');
                showTranslationStatus();
                let slug;
                try {
                    slug = decodeURIComponent(location.hash.slice(1));
                } catch {
                    slug = '';
                }
                const post = blogPosts.find((item) => item.slug === slug);
                if (!post) {
                    const restore = wasReading;
                    listing.hidden = false;
                    reader.hidden = true;
                    content.replaceChildren();
                    document.title = 'Blog | Bruno Senzio-Savino';
                    wasReading = false;
                    if (restore) {
                        previousLink?.focus({ preventScroll: true });
                        window.scrollTo(0, listScroll);
                    }
                    return;
                }
                activePost = post;
                const readerCover = document.getElementById('storyReaderCover');
                if (readerCover) {
                    readerCover.replaceChildren();
                    readerCover.hidden = true;
                    if (post.image) {
                        const coverImage = document.createElement('img');
                        coverImage.alt = post.title || 'Story cover';
                        coverImage.width = 520;
                        coverImage.height = 260;
                        coverImage.decoding = 'async';
                        coverImage.addEventListener(
                            'load',
                            () => {
                                if (readerCover.firstChild === coverImage)
                                    readerCover.hidden = false;
                            },
                            { once: true },
                        );
                        coverImage.addEventListener(
                            'error',
                            () => {
                                if (readerCover.firstChild === coverImage)
                                    readerCover.hidden = true;
                            },
                            { once: true },
                        );
                        readerCover.append(coverImage);
                        coverImage.src = `assets/blog/titleimg/${post.image}`;
                    }
                }
                languageButton.hidden = !postIsTxt(post);
                languageState(sourceLanguage(post));
                wasReading = true;
                listing.hidden = true;
                reader.hidden = false;
                title.textContent = post.title;
                title.lang = sourceLanguage(post);
                document.getElementById('storyExcerpt').lang = sourceLanguage(post);
                document.getElementById('storyCreated')?.remove();
                const created = creationTime(post.created);
                if (created) {
                    created.id = 'storyCreated';
                    title.after(created);
                }
                document.getElementById('storyTopic').textContent = post.topic || 'Personal notes';
                document.getElementById('storyExcerpt').textContent = post.excerpt || '';
                document.title = `${post.title} | Bruno Senzio-Savino`;
                title.focus({ preventScroll: true });
                reader.style.scrollMarginTop = '90px';
                reader.scrollIntoView({ block: 'start' });
                if (!post.contentUrl) {
                    storyReady(Array.isArray(post.content) ? post.content : [], request);
                    return;
                }
                content.replaceChildren(element('p', 'story-note', 'Loading story…'));
                try {
                    const url = new URL(post.contentUrl, document.baseURI);
                    if (url.origin !== location.origin)
                        throw new Error('Use a same-site story file.');
                    let blocks = cache.get(post.slug);
                    if (!blocks) {
                        const response = await fetch(url, { cache: 'no-cache' });
                        if (!response.ok) throw new Error('Story unavailable');
                        blocks = /\.txt$/i.test(url.pathname)
                            ? textBlocks(await response.text())
                            : await response.json();
                        if (!Array.isArray(blocks)) throw new Error('Invalid story format');
                        cache.set(post.slug, blocks);
                    }
                    storyReady(blocks, request);
                } catch {
                    if (request !== version) return;
                    content.replaceChildren(
                        element(
                            'p',
                            'story-note',
                            'This story could not be loaded. Please try again.',
                        ),
                    );
                    const retry = element('button', 'sound-button', 'Try again');
                    retry.type = 'button';
                    retry.addEventListener('click', route);
                    content.append(retry);
                }
            }
            [...new Set(blogPosts.map((post) => post.topic).filter(Boolean))]
                .sort()
                .forEach((value) => {
                    const option = element('option', '', value);
                    option.value = value;
                    topic.append(option);
                });
            [...new Set(blogPosts.flatMap((post) => post.keywords || []).filter(Boolean))]
                .sort((a, b) => a.localeCompare(b))
                .forEach((value) => {
                    const option = element('option', '', value);
                    option.value = value;
                    keywordFilter?.append(option);
                });
            function renderSelectedKeywords() {
                if (!selectedKeywordsContainer) return;
                selectedKeywordsContainer.replaceChildren();
                for (const keyword of selectedKeywords) {
                    const button = element('button', 'blog-keyword-chip', keyword + ' ×');
                    button.type = 'button';
                    button.setAttribute('aria-label', 'Remove keyword ' + keyword);
                    button.addEventListener('click', () => {
                        selectedKeywords.delete(keyword);
                        renderSelectedKeywords();
                        renderCards();
                    });
                    selectedKeywordsContainer.append(button);
                }
            }
            keywordFilter?.addEventListener('change', () => {
                if (keywordFilter.value) selectedKeywords.add(keywordFilter.value);
                keywordFilter.value = '';
                renderSelectedKeywords();
                renderCards();
            });
            search.addEventListener('input', renderCards);
            topic.addEventListener('change', renderCards);
            for (const control of [languageFilter, dateFrom, dateTo])
                control?.addEventListener('change', renderCards);
            resetFilters?.addEventListener('click', () => {
                search.value = '';
                topic.value = 'all';
                selectedKeywords.clear();
                if (keywordFilter) keywordFilter.value = '';
                renderSelectedKeywords();
                if (languageFilter) languageFilter.value = 'all';
                if (dateFrom) dateFrom.value = '';
                if (dateTo) dateTo.value = '';
                renderCards();
            });
            window.addEventListener('hashchange', route);
            renderCards();
            route();
        }
        if (document.readyState === 'loading')
            document.addEventListener('DOMContentLoaded', initializeBlog, { once: true });
        else initializeBlog();
    })();
})();

// ---- inline ----
(() => {
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
})();

// ---- inline ----
(() => {
    (() => {
        const viewer = document.getElementById('blogs-avatar-3d');
        const status = viewer.querySelector('.blog-model-status');
        viewer.addEventListener('error', () => {
            status.textContent = '3D avatar unavailable';
            if (typeof viewer.showPoster === 'function') viewer.showPoster();
        });
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateRotation = () =>
            viewer.toggleAttribute('auto-rotate', !motion.matches && !document.hidden);
        motion.addEventListener('change', updateRotation);
        document.addEventListener('visibilitychange', updateRotation);
        updateRotation();
    })();
})();
