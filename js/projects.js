/** Project catalog, category filters, observatory map, and project detail interactions. */
// projects page bundle rebuilt from original scripts, in source order.
// ---- inline ----
(() => {
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
    (() => {
        const audio = document.getElementById('bgm');
        const button = document.getElementById('soundToggle');
        let userPaused = false;
        audio.volume = 0.05;
        function updateSoundButton() {
            const playing = !audio.paused;
            button.setAttribute('aria-pressed', String(playing));
            button.setAttribute(
                'aria-label',
                playing ? 'Pause background music' : 'Play background music',
            );
            button.querySelector('i').className = playing
                ? 'fas fa-volume-low'
                : 'fas fa-volume-xmark';
            button.querySelector('span').textContent = playing ? 'Sound on' : 'Sound off';
        }
        function removeUnlockListeners() {
            ['pointerdown', 'keydown', 'touchend'].forEach((event) =>
                document.removeEventListener(event, unlock),
            );
        }
        function tryPlay() {
            if (userPaused) return;
            audio
                .play()
                .then(removeUnlockListeners)
                .catch(() => {});
        }
        function unlock(event) {
            if (button.contains(event.target)) return;
            tryPlay();
        }
        ['pointerdown', 'keydown', 'touchend'].forEach((event) =>
            document.addEventListener(event, unlock),
        );
        audio.addEventListener('play', updateSoundButton);
        audio.addEventListener('pause', updateSoundButton);
        button.addEventListener('click', () => {
            if (!audio.paused) {
                userPaused = true;
                audio.pause();
                removeUnlockListeners();
            } else {
                userPaused = false;
                tryPlay();
            }
        });
        window.addEventListener('load', tryPlay, { once: true });
        tryPlay();
    })();
})();

// ---- js/projects.js ----
(() => {
    // =====================================
    // DATA
    // OPTIONAL CREATOR BADGES: set either flag to true for the relevant project.
    // nonAI: true,       // Created without AI assistance.
    // fromScratch: true, // Original work built from the ground up by its creator.
    // Both flags are independent. Enable them only where the descriptions apply.
    // All projects start with both flags disabled; select the projects yourself.
    // PROJECT LINKS: add as many objects as you need to links.
    // Each object creates a button; label is its editable text and url is its destination.
    // Example (replace these URLs with your actual destinations):
    // links: [
    //     { label: "Video demo", url: "https://example.com/video" },
    //     { label: "GitHub", url: "https://example.com/code" },
    //     { label: "Paper", url: "https://example.com/paper" }
    // ],
    // links: [] displays no buttons. No HTML or CSS changes are needed.
    // The legacy url field remains supported when the project has no links array.
    // =====================================

    const categories = [
        {
            name: 'AI',
            texture: 'ai.jpg',
            orbitRadius: 450,
            orbitSpeed: 0.1,

            projects: [
                {
                    nonAI: false,
                    fromScratch: false,
                    title: 'Face Mask Detection',
                    year: '2021',
                    image: 'npu_ai.jpg',
                    links: [],
                    description: 'Edge AI Implementation on NPU',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Machine Learning for BCI',
                    year: '2016',
                    image: 'som_bci.jpg',
                    links: [
                        {
                            label: 'Open publication',
                            url: 'https://thesai.org/Publications/ViewPaper?Volume=8&Issue=1&Code=IJACSA&SerialNo=52',
                        },
                    ],
                    description: 'Unsupervised and Supervised Learning for BCI',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'OCR Pharmacy Prescription for Fillers',
                    year: '2018',
                    image: 'prescriptionai.jpg',
                    links: [],
                    description:
                        'An AI OCR recognition platform for medical prescription filling machines',
                },
            ],
        },

        {
            name: 'Robotics',
            texture: 'robotics.jpg',
            orbitRadius: 450,
            orbitSpeed: 0.1,

            projects: [
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Mobile Robot Development',
                    year: '2009',
                    image: 'zmpbot.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://youtu.be/xXTng9gSrDU?si=ELs3buI4AdGuYo3N',
                        },
                    ],
                    description: 'Autonomous Robot Hardware Development and Deployment',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Wiimote SCARA Arm',
                    year: '2009',
                    image: 'scara_wii.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/SX0WJOZMdzA' }],
                    description: 'A pioneer SCARA arm prototype controlled with Wiimote',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Bruno Kart',
                    year: '2010',
                    image: 'mobile_wii.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/qE38qtjhbLs' }],
                    description: 'A pioneer Wiimote Controlled Mobile Robot',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Cannonball',
                    year: '2010',
                    image: 'cannonball.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/qE38qtjhbLs' }],
                    description: 'A pioneer Wiimote Controlled Mobile Robot',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Hand Augmentation',
                    year: '2016',
                    image: 'supernumerary.jpg',
                    links: [
                        {
                            label: 'Open prototype',
                            url: 'https://www.youtube.com/watch?v=GYFfOJpuJHk',
                        },
                        { label: 'Open demo 1', url: 'https://youtu.be/VIz_QDKCtbs' },
                        { label: 'Open demo 2', url: 'https://youtu.be/LCjvAuEIvNI' },
                        { label: 'Open demo 3', url: 'https://youtu.be/T67_ayvPHuc' },
                    ],
                    description: 'A supernumerary robotic limb hand robot',
                },
                {
                    nonAI: true,
                    fromScratch: false,
                    title: 'Verdopplerbot AI V1',
                    year: '2023',
                    image: 'verdopplerbotai.jpg',
                    links: [
                        {
                            label: 'Open Demo 1',
                            url: 'https://youtu.be/AARts_NJcPw?si=C4CtIP4Z2qYBD8ji',
                        },
                        { label: 'Open Demo 2', url: 'https://youtu.be/7cBsNGovwoU' },
                        { label: 'Open Demo 3', url: 'https://youtu.be/1RXU9yrBs6g' },
                        { label: 'Open Demo 4', url: 'https://youtu.be/nRNZ9IPP03k' },
                        { label: 'Open Details', url: 'https://youtu.be/yYEootnN5VE' },
                    ],
                    description: 'Archwire bending Robot Machine',
                },
            ],
        },

        {
            name: 'BCI',
            texture: 'bci.jpg',
            orbitRadius: 450,
            orbitSpeed: 0.1,

            projects: [
                {
                    nonAI: true,
                    fromScratch: false,
                    title: 'Aura EEG Device',
                    year: '2017',
                    image: 'aura.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://www.mirai-innovation-lab.com/aura-through-time/',
                        },
                    ],
                    description: 'An EEG Reading Harwdare Device',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: '3D Mindwave Unity Environment',
                    year: '2014',
                    image: 'bci_env.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/FN6Tui_sEzo' }],
                    description: 'A 3D Interactive BCI Environment',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'BCI Neurocar',
                    year: '2012',
                    image: 'bcicar.jpg',
                    links: [
                        {
                            label: 'Open video',
                            url: 'https://youtu.be/OCTTJRChK8Y?si=2u_pgF-JXPdkFs7R',
                        },
                    ],
                    description:
                        'A BCI car prototype to be used from PET recycling funding to help handicap.',
                },
                {
                    nonAI: false,
                    fromScratch: false,
                    title: 'BMI for Supernumerary',
                    year: '2018',
                    image: 'bcinature.jpg',
                    links: [
                        {
                            label: 'Open publication',
                            url: 'https://www.science.org/doi/10.1126/scirobotics.aat1228?ijkey=jgzH2rMiJdja6&keytype=ref&siteid=robotics',
                        },
                    ],
                    description:
                        'BMI to perform a goal-oriented task while simultaneously using their own arms to do a different task.',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'ALIFE26 BMI/AL Tutorial',
                    year: '2026',
                    image: 'alifetutorial.jpg',
                    links: [
                        {
                            label: 'Open tutorial',
                            url: 'https://bsenzio.github.io/bmitutorialALIFE26/',
                        },
                    ],
                    description: 'From neural signals to AL interactive systems.',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'BCI e-Textile',
                    year: '2019',
                    image: 'bcipatent.jpg',
                    links: [
                        {
                            label: 'Open patent',
                            url: 'https://bsenzio.github.io/portfolio/assets/pdf/Patents/biosignal_feedback_system.pdf',
                        },
                    ],
                    description: 'BMI Headset with e-textiles and use of wearable neurofeedback',
                },
            ],
        },

        {
            name: 'Products',
            texture: 'product.jpg',
            orbitRadius: 450,
            orbitSpeed: 0.1,

            projects: [
                {
                    nonAI: true,
                    fromScratch: false,
                    title: 'Touch Water Dispenser',
                    year: '2022',
                    image: 'touchwaterdispenser.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://youtube.com/shorts/f878WyXYoyk?feature=share',
                        },
                    ],
                    description: 'Touch panel water dispensing machine with RFID',
                },
                {
                    nonAI: true,
                    fromScratch: false,
                    title: 'Bus Tracking Device',
                    year: '2022',
                    image: 'products1.jpg',
                    links: [],
                    description: 'Bus GPS and GPRS Tracker',
                },
                {
                    nonAI: true,
                    fromScratch: false,
                    title: 'Electric Fence',
                    year: '2013',
                    image: 'Y2.jpg',
                    links: [
                        { label: 'Watch Demo', url: 'https://www.youtube.com/watch?v=tVdK7wsy1uI' },
                    ],
                    description: 'Electric Fence and Gate controllers',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Laser Engravings',
                    year: '2012',
                    image: 'mabe5.JPG',
                    links: [],
                    description: 'Special Engravings and fabrications',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'AOLDC Apparel',
                    year: '2012',
                    image: 'fotl1.jpg',
                    links: [],
                    description: 'One layer of different acrylic products Light Displays',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'AOLDC',
                    year: '2011',
                    image: 'aoldc1_small.jpg',
                    links: [],
                    description: 'One layer of different acrylic products',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'VaSenzios',
                    year: '2023',
                    image: 'glass.jpg',
                    links: [
                        { label: 'Demo reel 1', url: 'https://youtu.be/CrCvXHIAtJ4' },
                        { label: 'Demo reel 2', url: 'https://youtu.be/Q50DDXVfSDA' },
                    ],
                    description: 'An interactive inductive glass prototype',
                },
                {
                    nonAI: true,
                    fromScratch: false,
                    title: 'Retail Level RGB LED Lamp',
                    year: '2023',
                    image: 'led_lamp.jpg',
                    links: [],
                    description: 'An IR remote RGB Commercial Level Lamp',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Inductive Braille',
                    year: '2023',
                    image: 'braille.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/lZagQIphQ3U' }],
                    description: 'A dynamic Braille proposed',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'XR Interaction System',
                    year: '2025',
                    image: 'aruco.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/JOJYk69uOSQ' }],
                    description:
                        'A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces.',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Interative Arcade Machine',
                    year: '2026',
                    image: 'arcade.jpg',
                    links: [
                        { label: 'Watch Demo', url: 'https://youtu.be/BsE8TvaJvD4' },
                        { label: 'Watch Demo 2', url: 'https://youtu.be/acaqdT1WNYM' },
                        { label: 'Watch Demo 3', url: 'https://youtu.be/4nDXf4leb6Q' },
                    ],
                    description: 'An interactive Arcade machine with AI and custom games',
                },
            ],
        },

        {
            name: 'Social Causes',
            texture: 'social.jpg',
            orbitRadius: 450,
            orbitSpeed: 0.1,

            projects: [
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Vegetables here, games there...',
                    year: '2025',
                    image: 'vegetables.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://www.youtube.com/live/QoZwG4V6CVw?si=o_C43iGD-uhwwK3-',
                        },
                    ],
                    description: 'Spreading AI and AL through gaming experiences',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'BCI and Robotics for Schools',
                    year: '2012',
                    image: 'bci_schools.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://www.youtube.com/watch?v=PMnEDyEkNCg',
                        },
                    ],
                    description: 'Trading PET for BCI Robotics education at schools',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Recicla para Ayudar',
                    year: '2012',
                    image: 'social8.JPG',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://www.youtube.com/watch?v=tagIUTo3pMc',
                        },
                    ],
                    description:
                        'A social cause project PET recycling to support lighting marginalized communities',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Local PET Gathering',
                    year: '2012',
                    image: 'social16.jpg',
                    links: [],
                    description: 'PET Gathering at schools',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Senior People Manufacturing',
                    year: '2023',
                    image: 'oldmanufacture.jpg',
                    links: [],
                    description: 'Senior people employment for electronics assembly program',
                },
            ],
        },

        {
            name: 'Games',
            texture: 'games.jpg',
            orbitRadius: 450,
            orbitSpeed: 0.1,

            projects: [
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Okinawa Adventure 3D',
                    year: '2026',
                    image: 'okadv3d.jpg',
                    links: [{ label: 'Watch Demo', url: 'https://youtu.be/BsE8TvaJvD4' }],
                    description: 'Okinawa culture 3D Experience',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Okinawa Adventure 2D',
                    year: '2026',
                    image: 'okadv.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://youtu.be/T-jyL2qHiG4?si=omZ6Z8QPk8VnF5wB',
                        },
                        { label: 'Watch Demo Kiosk', url: 'https://youtu.be/4nDXf4leb6Q' },
                    ],
                    description: 'Okinawa culture 2D Retro NES Game',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Where Are my Veggies',
                    year: '2025',
                    image: 'wamg.jpg',
                    links: [
                        { label: 'Demo random', url: 'https://youtu.be/6K8MLqRcPp8' },
                        { label: 'Demo Manual', url: 'https://youtu.be/FW_4LI9_3X4' },
                        {
                            label: 'Open publication',
                            url: 'https://bsenzio.github.io/portfolio/assets/pdf/Journals/IMI2025_01.pdf',
                        },
                    ],
                    description: 'GoL NES Implementation',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Stay Good: Barber Assault',
                    year: '2026',
                    image: 'sgba.jpg',
                    links: [
                        { label: 'Open project', url: 'https://bsenzio.github.io/TestStayGood/' },
                    ],
                    description: 'WebGL Implementation',
                },
                {
                    nonAI: false,
                    fromScratch: true,
                    title: 'Nara Adventure',
                    year: '2026',
                    image: 'naraadventure.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://bsenzio.github.io/portfolio/projects.html',
                        },
                    ],
                    description: 'Game of Nara Prefecture for Local Festivals',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'PDO 3D',
                    year: '2023',
                    image: 'pdo3d.jpg',
                    links: [
                        { label: 'Open project', url: 'https://youtu.be/VzqxILNy0ho' },
                        {
                            label: 'Open project',
                            url: 'https://youtu.be/rOK47AQa050?si=SvaBNDeiUAVHA6ar',
                        },
                    ],
                    description: 'Mexican 3D Politics game',
                },

                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'PDO 2D',
                    year: '2023',
                    image: 'pdo.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://www.youtube.com/watch?v=BKFJajgmsUY',
                        },
                    ],
                    description: 'Mexican 2D retro type game',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: 'Ganbare Shisa',
                    year: '2015',
                    image: 'shisablender.jpg',
                    links: [{ label: 'Open project', url: 'https://youtu.be/ENqnNoTl6a4' }],
                    description: 'Small Blender Animation Drafting',
                },
                {
                    nonAI: true,
                    fromScratch: true,
                    title: '8-bit Trouble',
                    year: '2011',
                    image: '8_bit_trouble.jpg',
                    links: [
                        {
                            label: 'Open project',
                            url: 'https://youtu.be/TFJNJK4z_fE?si=UcRHCHUPbZp82q-7',
                        },
                    ],
                    description: 'Fusion begins 2012, all your base are belong to us!!',
                },
            ],
        },
    ];

    // Creator declarations, displayed only when explicitly enabled.
    function getProjectBadges(project) {
        const badges = [];
        if (project.nonAI === true)
            badges.push({
                key: 'non-ai',
                label: 'NON-AI',
                symbol: '★',
                color: '#f2d68a',
                description:
                    "Created without AI assistance, using the creator's own ideas, knowledge, and skills.",
            });
        if (project.fromScratch === true)
            badges.push({
                key: 'from-scratch',
                label: 'From scratch',
                symbol: '◆',
                color: '#8debdc',
                description:
                    'Designed and developed from the ground up by its creator, rather than adapted from a prebuilt project or template.',
            });
        return badges;
    }

    function createProjectBadges(project, compact = false) {
        const badges = getProjectBadges(project);
        if (!badges.length) return null;
        const group = document.createElement('div');
        group.className = 'obs-creator-badges';
        Object.assign(group.style, {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            margin: '12px 0',
            minWidth: '0',
        });
        badges.forEach((badge) => {
            const item = document.createElement('div');
            item.className = `obs-creator-badge obs-creator-badge--${badge.key}`;
            Object.assign(item.style, {
                border: `1px solid ${badge.color}66`,
                borderRadius: '10px',
                padding: compact ? '5px 9px' : '10px 12px',
                background: `${badge.color}0d`,
                color: badge.color,
                maxWidth: '100%',
                boxSizing: 'border-box',
                flex: compact ? '0 1 auto' : '1 1 180px',
                textAlign: 'left',
            });
            item.title = badge.description;
            const heading = document.createElement('span');
            Object.assign(heading.style, {
                display: 'block',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '.06em',
            });
            const icon = document.createElement('span');
            icon.textContent = badge.symbol;
            icon.setAttribute('aria-hidden', 'true');
            heading.append(icon, document.createTextNode(` ${badge.label}`));
            item.append(heading);
            if (!compact) {
                const description = document.createElement('span');
                description.textContent = badge.description;
                Object.assign(description.style, {
                    display: 'block',
                    fontSize: '12px',
                    lineHeight: '1.55',
                    marginTop: '6px',
                    color: '#c8d2df',
                    overflowWrap: 'anywhere',
                });
                item.append(description);
            } else item.setAttribute('aria-label', `${badge.label}: ${badge.description}`);
            group.append(item);
        });
        return group;
    }

    // Shared by the observatory and the home-page featured projects.
    function getProjectLinks(project) {
        const entries = Array.isArray(project.links)
            ? project.links
            : [{ label: 'Open project', url: project.url }];
        return entries.flatMap((entry, index) => {
            if (!entry || typeof entry.url !== 'string') return [];
            const value = entry.url.trim();
            if (!value || value === 'l') return [];
            try {
                const parsed = new URL(value, document.baseURI);
                if (!['https:', 'http:'].includes(parsed.protocol)) return [];
                const label =
                    typeof entry.label === 'string' && entry.label.trim()
                        ? entry.label.trim()
                        : `Link ${index + 1}`;
                return [{ label, url: parsed.href }];
            } catch {
                return [];
            }
        });
    }

    // Public helpers remain available to the home-page featured projects.
    function getAllProjects() {
        return categories.flatMap((category) =>
            category.projects.map((project) => ({
                ...project,
                url: getProjectLinks(project)[0]?.url || '',
                category: category.name,
            })),
        );
    }
    function getRandomProjects(count = 3) {
        const all = getAllProjects();
        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }
        return all.slice(0, count);
    }

    // Each axis uses the full project count as its own denominator.
    function getCreatorSummary(projects) {
        const total = projects.length;
        const count = (key) => projects.filter((project) => project[key] === true).length;
        const nonAI = count('nonAI');
        const fromScratch = count('fromScratch');
        return {
            total,
            nonAI,
            usingAI: total - nonAI,
            fromScratch,
            nonScratch: total - fromScratch,
        };
    }
    window.categories = categories;
    window.getProjectLinks = getProjectLinks;
    window.getAllProjects = getAllProjects;
    window.getRandomProjects = getRandomProjects;
    window.getCreatorSummary = getCreatorSummary;

    (() => {
        function initializeObservatory() {
            const root = document.getElementById('projectObservatory');
            if (!root) return;
            const colors = ['#83d6f3', '#e5b481', '#b3a0ef', '#83d8bb', '#eea8bb', '#e6ce88'];
            const intros = [
                'From machine perception to local intelligence. Explore systems that make sense of signals, images and information.',
                'Ideas that move into the physical world. Machines, mechanisms and new ways to control them.',
                'Where neural signals become interaction. Devices and experiences connecting people with computational systems.',
                'From an experiment to something tangible. Interfaces, hardware and products built to be used.',
                'Technology in service of people. Education, recycling and community-oriented initiatives.',
                'Play as a space for experimentation. Interactive worlds, retro hardware and cultural experiences.',
            ];
            const rows = categories.flatMap((category, ci) =>
                category.projects.map((project, pi) => ({ project, ci, pi, id: `${ci}-${pi}` })),
            );
            const map = document.getElementById('orbitMap');
            const nodes = document.getElementById('mapNodes');
            const inspector = document.getElementById('projectInspector');
            const collection = document.getElementById('projectCollection');
            const filters = document.getElementById('categoryFilters');
            const status = document.getElementById('projectStatus');
            const creatorSummary = document.createElement('section');
            creatorSummary.className = 'obs-creator-summary';
            creatorSummary.setAttribute('aria-label', 'Project creation summary');
            Object.assign(creatorSummary.style, {
                gridColumn: '1 / -1',
                width: '100%',
                boxSizing: 'border-box',
                marginTop: '16px',
                padding: '0',
                borderRadius: '0',
                flexBasis: '100%',
                border: 'none',
                background: 'transparent',
                boxShadow: 'none',
                color: '#dce6ef',
                minWidth: '0',
                clear: 'both',
            });
            // Keep the counter and the selection/exploration legend together.
            // Append the summary after all existing text within their shared group.
            const summaryGroup = status.parentElement;
            if (getComputedStyle(summaryGroup).display.includes('flex')) {
                summaryGroup.style.flexWrap = 'wrap';
            }
            summaryGroup.append(creatorSummary);
            function renderCreatorSummary(matches) {
                const stats = getCreatorSummary(matches.map((row) => row.project));
                creatorSummary.replaceChildren();
                const axes = [
                    [
                        'AI assistance',
                        [
                            ['NON-AI', stats.nonAI, '#f2d68a'],
                            ['Using AI', stats.usingAI, '#b3a0ef'],
                        ],
                    ],
                    [
                        'Development origin',
                        [
                            ['From scratch', stats.fromScratch, '#8debdc'],
                            ['Non-scratch', stats.nonScratch, '#83b8f3'],
                        ],
                    ],
                ];
                axes.forEach(([name, segments], index) => {
                    const row = document.createElement('div');
                    row.style.marginTop = index === 0 ? '0' : '16px';
                    const label = document.createElement('div');
                    label.textContent = name;
                    Object.assign(label.style, {
                        fontSize: '11px',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        color: '#a8b8cb',
                    });
                    const bar = document.createElement('div');
                    bar.setAttribute('role', 'img');
                    bar.setAttribute(
                        'aria-label',
                        `${name}: ` +
                            segments
                                .map(
                                    ([title, count]) =>
                                        `${title} ${stats.total ? ((count / stats.total) * 100).toFixed(1) : '0'} percent, ${count} projects`,
                                )
                                .join('; '),
                    );
                    Object.assign(bar.style, {
                        display: 'flex',
                        gap: '2px',
                        height: '9px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#253044',
                    });
                    const legend = document.createElement('div');
                    Object.assign(legend.style, {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px 24px',
                        marginTop: '9px',
                    });
                    segments.forEach(([title, count, color]) => {
                        const percent = stats.total ? (count / stats.total) * 100 : 0;
                        if (count) {
                            const segment = document.createElement('span');
                            segment.title = `${title}: ${percent.toFixed(1)}% (${count}/${stats.total})`;
                            Object.assign(segment.style, {
                                flex: `${count} 1 0`,
                                minWidth: '0',
                                background: color,
                            });
                            bar.append(segment);
                        }
                        const entry = document.createElement('span');
                        Object.assign(entry.style, {
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '7px',
                            fontSize: '12px',
                        });
                        const dot = document.createElement('span');
                        Object.assign(dot.style, {
                            width: '8px',
                            height: '8px',
                            flexShrink: '0',
                            borderRadius: '50%',
                            background: color,
                        });
                        entry.append(
                            dot,
                            document.createTextNode(`${title} ${percent.toFixed(1)}% · ${count}`),
                        );
                        legend.append(entry);
                    });
                    row.append(label, bar, legend);
                    creatorSummary.append(row);
                });
            }
            let selectedCategory = null;
            let selectedProject = null;
            let view = 'map';
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
            let paused = reduced.matches;
            let orbitTime = 0;
            let lastFrame = null;
            let frameRequest = null;
            let pointerInside = false;
            let orbitWorlds = [];

            function stopOrbit() {
                if (frameRequest !== null) cancelAnimationFrame(frameRequest);
                frameRequest = null;
                lastFrame = null;
            }
            function startOrbit() {
                if (
                    frameRequest !== null ||
                    paused ||
                    reduced.matches ||
                    document.hidden ||
                    view !== 'map'
                )
                    return;
                frameRequest = requestAnimationFrame(animateOrbit);
            }
            function animateOrbit(timestamp) {
                frameRequest = null;
                if (paused || reduced.matches || document.hidden || view !== 'map') {
                    lastFrame = null;
                    return;
                }
                const dt = lastFrame === null ? 0 : Math.min((timestamp - lastFrame) / 1000, 0.05);
                lastFrame = timestamp;
                // Stop the orbital travel while someone is pointing or navigating by keyboard.
                const interacting = pointerInside || map.contains(document.activeElement);
                if (!interacting) orbitTime += dt;
                orbitWorlds.forEach(
                    ({ node, angle, rx = 34, ry = 32, centerY = 48, speed = 0.022 }) => {
                        const phase = angle + orbitTime * speed;
                        node.style.left = `${50 + rx * Math.cos(phase)}%`;
                        node.style.top = `${centerY + ry * Math.sin(phase)}%`;
                    },
                );
                if (orbitWorlds.length) frameRequest = requestAnimationFrame(animateOrbit);
            }

            function el(tag, className, text) {
                const node = document.createElement(tag);
                if (className) node.className = className;
                if (text !== undefined) node.textContent = text;
                return node;
            }
            // Reuse the effects and restart them for each new interaction.
            const projectHoverSound = new Audio('assets/audio/sfx/sfxhover.mp3');
            const projectClickSound = new Audio('assets/audio/sfx/sfxclick.mp3');
            projectHoverSound.preload = projectClickSound.preload = 'auto';

            function playProjectSound(sound) {
                try {
                    sound.currentTime = 0;
                    const playback = sound.play();
                    if (playback) playback.catch(() => {});
                } catch {
                    // Audio restrictions or missing files must not interrupt navigation.
                }
            }
            function addProjectSounds(node) {
                node.addEventListener('pointerenter', (event) => {
                    if (event.pointerType !== 'touch') playProjectSound(projectHoverSound);
                });
                node.addEventListener('click', () => {
                    projectHoverSound.pause();
                    playProjectSound(projectClickSound);
                });
            }
            function button(className, text, action) {
                const node = el('button', className, text);
                node.type = 'button';
                if (['obs-project-node', 'obs-mini-card', 'obs-list-item'].includes(className)) {
                    addProjectSounds(node);
                }
                node.addEventListener('click', action);
                return node;
            }
            function image(file, className, folder = 'projects') {
                const img = el('img', className);
                img.alt = '';
                img.loading = 'lazy';
                img.decoding = 'async';
                img.addEventListener(
                    'error',
                    () => {
                        // Keep the geometry and accessible button label if a cover is absent.
                        img.removeAttribute('src');
                        img.style.opacity = '.12';
                    },
                    { once: true },
                );
                if (file) img.src = `assets/images/${folder}/${file}`;
                return img;
            }
            function matching() {
                return rows.filter(
                    (row) => selectedCategory === null || row.ci === selectedCategory,
                );
            }
            function selectCategory(ci) {
                selectedCategory = ci;
                selectedProject = null;
                render();
            }
            function selectProject(row) {
                selectedProject = row.id;
                render();
                if (window.innerWidth <= 760)
                    inspector.scrollIntoView({
                        block: 'start',
                        behavior: reduced.matches ? 'auto' : 'smooth',
                    });
            }
            function renderFilters() {
                const activeElement = document.activeElement;
                const focusIndex = Array.from(filters.children).indexOf(activeElement);
                filters.replaceChildren();
                const allChip = button('obs-filter obs-filter-all', '', () => selectCategory(null));
                allChip.append(
                    el('i'),
                    document.createTextNode('All'),
                    el('span', '', String(rows.length)),
                );
                allChip.setAttribute('aria-pressed', String(selectedCategory === null));
                filters.append(allChip);
                categories.forEach((category, index) => {
                    const chip = button('obs-filter', '', () =>
                        selectCategory(selectedCategory === index ? null : index),
                    );
                    chip.style.setProperty('--world-color', colors[index % colors.length]);
                    chip.append(
                        el('i'),
                        document.createTextNode(category.name),
                        el('span', '', String(category.projects.length)),
                    );
                    chip.setAttribute('aria-pressed', String(selectedCategory === index));
                    filters.append(chip);
                });
                if (focusIndex >= 0) filters.children[focusIndex]?.focus({ preventScroll: true });
            }
            function renderMap(matches) {
                nodes.replaceChildren();
                orbitWorlds = [];
                const category = selectedCategory === null ? null : categories[selectedCategory];
                document.getElementById('mapBreadcrumb').textContent = category
                    ? `SYSTEM / ${category.name.toUpperCase()}`
                    : 'THE COMPLETE SYSTEM';
                const core = el('div', 'obs-core');
                const sun = el('span', 'obs-sun-surface');
                if (category) {
                    core.classList.add('obs-category-core');
                    core.style.setProperty(
                        '--core-color',
                        colors[selectedCategory % colors.length],
                    );
                    sun.style.backgroundImage = `url("assets/images/planets/${category.texture}")`;
                }
                core.append(sun);
                core.append(
                    el('small', '', category ? 'CURRENT WORLD' : 'PROJECT SYSTEM'),
                    el('strong', '', category ? category.name : String(rows.length)),
                    el(
                        'small',
                        '',
                        category ? `${matches.length} projects` : 'PROJECTS · 6 WORLDS',
                    ),
                );
                nodes.append(core);
                if (selectedCategory === null) {
                    categories.forEach((cat, ci) => {
                        const angle = -Math.PI / 2 + (ci * Math.PI * 2) / categories.length;
                        const world = button('obs-world', '', () => selectCategory(ci));
                        world.style.left = `${50 + 34 * Math.cos(angle + orbitTime * 0.022)}%`;
                        world.style.top = `${48 + 32 * Math.sin(angle + orbitTime * 0.022)}%`;
                        world.style.setProperty('--spin-duration', `${35 + ci * 9}s`);
                        world.style.setProperty('--spin-delay', `${-ci * 7}s`);
                        orbitWorlds.push({ node: world, angle });
                        world.style.setProperty('--world-color', colors[ci % colors.length]);
                        world.setAttribute(
                            'aria-label',
                            `Explore ${cat.name}, ${cat.projects.length} projects`,
                        );
                        const globe = el('span', 'obs-globe');
                        const surface = el('span', 'obs-surface');
                        surface.style.backgroundImage = `url("assets/images/planets/${cat.texture}")`;
                        globe.append(surface);
                        world.append(
                            globe,
                            el('span', 'obs-world-label', cat.name),
                            el('span', 'obs-world-count', `${cat.projects.length} projects`),
                        );
                        nodes.append(world);
                    });
                    return;
                }
                matches.forEach((row, i) => {
                    const angle = -Math.PI / 2 + (i * Math.PI * 2) / Math.max(1, matches.length);
                    // Use two rings when the category contains many projects.
                    const radius = matches.length > 16 && i % 2 ? 24 : 35;
                    const node = button('obs-project-node', '', () => selectProject(row));
                    const speed = 0.035;
                    const phase = angle + orbitTime * speed;
                    node.style.left = `${50 + radius * Math.cos(phase)}%`;
                    node.style.top = `${49 + radius * Math.sin(phase)}%`;
                    orbitWorlds.push({ node, angle, rx: radius, ry: radius, centerY: 49, speed });
                    node.style.setProperty('--project-spin', `${65 + (i % 7) * 8}s`);
                    node.setAttribute(
                        'aria-label',
                        `${row.project.title}, ${row.project.year}. Show details`,
                    );
                    node.title = row.project.title;
                    node.setAttribute('aria-pressed', String(selectedProject === row.id));
                    node.append(
                        image(row.project.image),
                        el('span', 'obs-node-number', String(i + 1).padStart(2, '0')),
                    );
                    nodes.append(node);
                });
            }
            function renderCollection(matches) {
                collection.replaceChildren();
                matches.forEach((row) => {
                    const card = button('obs-mini-card', '', () => selectProject(row));
                    card.setAttribute('aria-pressed', String(selectedProject === row.id));
                    card.append(
                        image(row.project.image),
                        el('small', '', `${categories[row.ci].name} / ${row.project.year}`),
                        el('strong', '', row.project.title),
                    );
                    const badges = createProjectBadges(row.project, true);
                    if (badges) card.append(badges);
                    collection.append(card);
                });
                if (!matches.length)
                    collection.append(
                        el(
                            'p',
                            'obs-no-results',
                            'No projects in this world. Return to All worlds.',
                        ),
                    );
            }
            function renderInspector(matches) {
                // Restore keyboard focus after updating the detail panel.
                const previous = inspector.contains(document.activeElement)
                    ? document.activeElement?.dataset.project
                    : null;
                inspector.replaceChildren();
                const row = matches.find((item) => item.id === selectedProject);
                const ci = row ? row.ci : selectedCategory;
                root.style.setProperty(
                    '--obs-accent',
                    ci === null ? '#8debdc' : colors[ci % colors.length],
                );
                if (row) {
                    inspector.append(
                        el('div', 'obs-kicker', `${categories[row.ci].name} / ${row.project.year}`),
                        image(row.project.image, 'obs-inspector-image'),
                        el('h3', '', row.project.title),
                        el('p', '', row.project.description),
                    );
                    const badges = createProjectBadges(row.project);
                    if (badges) inspector.append(badges);
                    const links = getProjectLinks(row.project);
                    if (links.length) {
                        const actions = el('div', 'obs-project-links');
                        // Keep long labels and any number of buttons inside the inspector.
                        Object.assign(actions.style, {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            margin: '16px 0',
                            minWidth: '0',
                        });
                        links.forEach(({ label, url }) => {
                            const link = el('a', 'obs-open-link', `${label} ↗`);
                            link.href = url;
                            link.target = '_blank';
                            link.rel = 'noopener noreferrer';
                            Object.assign(link.style, {
                                maxWidth: '100%',
                                whiteSpace: 'normal',
                                overflowWrap: 'anywhere',
                                boxSizing: 'border-box',
                                margin: '0',
                            });
                            addProjectSounds(link);
                            actions.append(link);
                        });
                        inspector.append(actions);
                    } else
                        inspector.append(
                            el('p', '', 'Project overview · no external link available.'),
                        );
                } else if (selectedCategory !== null) {
                    inspector.append(
                        el(
                            'div',
                            'obs-kicker',
                            `WORLD ${String(selectedCategory + 1).padStart(2, '0')}`,
                        ),
                        el('h3', '', categories[selectedCategory].name),
                        el(
                            'p',
                            '',
                            intros[selectedCategory] || 'Explore this collection of projects.',
                        ),
                    );
                } else {
                    inspector.append(
                        el('div', 'obs-kicker', 'WELCOME, EXPLORER'),
                        el('h3', '', 'Different worlds. Shared curiosity.'),
                        el(
                            'p',
                            '',
                            'Every world opens a different part of the portfolio. Select a planet to enter its constellation and discover its projects.',
                        ),
                    );
                    const facts = el('div', 'obs-facts');
                    [
                        [rows.length, 'Projects'],
                        [categories.length, 'Worlds'],
                    ].forEach(([n, label]) => {
                        const fact = el('div');
                        fact.append(el('strong', '', String(n)), el('span', '', label));
                        facts.append(fact);
                    });
                    inspector.append(facts);
                }
                inspector.append(
                    el('div', 'obs-next-label', `${matches.length} PROJECTS / SELECT TO DISCOVER`),
                );
                const list = el('div', 'obs-project-list');
                matches.forEach((item) => {
                    const entry = button('obs-list-item', '', () => selectProject(item));
                    entry.dataset.project = item.id;
                    entry.setAttribute('aria-pressed', String(selectedProject === item.id));
                    entry.append(image(item.project.image), el('span', '', item.project.title));
                    list.append(entry);
                });
                if (!matches.length)
                    list.append(
                        el(
                            'p',
                            'obs-no-results',
                            'No projects in this world. Choose another world.',
                        ),
                    );
                inspector.append(list);
                if (previous)
                    Array.from(list.children)
                        .find((n) => n.dataset.project === previous)
                        ?.focus({ preventScroll: true });
            }
            function render() {
                const matches = matching();
                if (!matches.some((row) => row.id === selectedProject)) selectedProject = null;
                renderFilters();
                renderMap(matches);
                renderCollection(matches);
                renderInspector(matches);
                map.hidden = view !== 'map';
                collection.hidden = view !== 'cards';
                document
                    .getElementById('mapView')
                    .setAttribute('aria-pressed', String(view === 'map'));
                document
                    .getElementById('cardsView')
                    .setAttribute('aria-pressed', String(view === 'cards'));
                startOrbit();
                status.textContent = `${matches.length} of ${rows.length} projects${selectedCategory === null ? ' · All worlds' : ' · ' + categories[selectedCategory].name}`;
                renderCreatorSummary(matches);
            }
            document.getElementById('mapView').addEventListener('click', () => {
                view = 'map';
                render();
                drawStars();
            });
            document.getElementById('cardsView').addEventListener('click', () => {
                view = 'cards';
                stopOrbit();
                render();
            });
            function updateMotion() {
                root.classList.toggle('obs-paused', paused || reduced.matches);
                if (paused || reduced.matches) stopOrbit();
                else startOrbit();
            }
            map.addEventListener('pointerenter', () => {
                pointerInside = true;
                root.classList.add('obs-hovering');
            });
            map.addEventListener('pointerleave', () => {
                pointerInside = false;
                root.classList.remove('obs-hovering');
                map.style.removeProperty('--light-x');
                map.style.removeProperty('--light-y');
            });
            map.addEventListener('pointermove', (event) => {
                if (reduced.matches || paused) return;
                const rect = map.getBoundingClientRect();
                map.style.setProperty('--light-x', `${event.clientX - rect.left}px`);
                map.style.setProperty('--light-y', `${event.clientY - rect.top}px`);
            });
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopOrbit();
                else startOrbit();
            });
            reduced.addEventListener('change', () => {
                paused = reduced.matches;
                updateMotion();
            });
            function drawStars() {
                const canvas = document.getElementById('starCanvas');
                const width = map.clientWidth,
                    height = map.clientHeight;
                if (!width || !height) return;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;
                ctx.scale(dpr, dpr);
                let seed = 41;
                const random = () => {
                    seed = (seed * 16807) % 2147483647;
                    return seed / 2147483647;
                };
                for (let i = 0; i < 180; i++) {
                    const x = random() * width,
                        y = random() * height,
                        r = random() * 0.9 + 0.2;
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(180,213,244,${random() * 0.6 + 0.12})`;
                    ctx.fill();
                }
            }
            new ResizeObserver(drawStars).observe(map);
            render();
            updateMotion();
            drawStars();
        }
        if (document.readyState === 'loading')
            document.addEventListener('DOMContentLoaded', initializeObservatory, { once: true });
        else initializeObservatory();
    })();
})();

// ---- inline ----
(() => {
    (() => {
        const viewer = document.getElementById('projects-avatar-3d');
        const status = document.querySelector('.hero-model-status');
        viewer.addEventListener('load', () => {
            status.hidden = true;
        });
        viewer.addEventListener('error', () => {
            status.hidden = false;
            status.textContent = '3D avatar unavailable';
        });
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateRotation = () => {
            viewer.toggleAttribute('auto-rotate', !motion.matches && !document.hidden);
        };
        motion.addEventListener('change', updateRotation);
        document.addEventListener('visibilitychange', updateRotation);
        updateRotation();
    })();
})();
