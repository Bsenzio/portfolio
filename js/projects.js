// =====================================
// DATA
// =====================================

const categories = [

{
    name:"AI",
    texture:"ai.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Face Mask Detection",
			year:"2016",
            image:"npu_ai.jpg",
            url:"",
			description:
			"Edge AI Implementation on NPU"
        },
        {
            title:"Machine Learning for BCI",
			year:"2016",
            image:"som_bci.jpg",
            url:"",
			description:
			"Unsupervised and Supervised Learning for BCI"
        },
        {
            title:"OCR Pharmacy Prescription for Fillers",
			year:"2018",
            image:"prescriptionai.jpg",
            url:"",
			description:
			"An AI OCR recognition platform for medical prescription filling machines"
        }
    ]
},

{
    name:"Robotics",
    texture:"robotics.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Mobile Robot Development",
			year:"2009",
            image:"zmpbot.jpg",
            url:"https://youtu.be/xXTng9gSrDU?si=ELs3buI4AdGuYo3N",
			description:
			"Autonomous Robot Hardware Development and Deployment"
        },
        {
            title:"Wiimote SCARA Arm",
			year:"2009",
            image:"scara_wii.jpg",
            url:"https://youtu.be/SX0WJOZMdzA",
			description:
			"A pioneer SCARA arm prototype controlled with Wiimote"
        },
        {
            title:"Bruno Kart",
			year:"2010",
            image:"mobile_wii.jpg",
            url:"https://youtu.be/qE38qtjhbLs",
			description:
			"A pioneer Wiimote Controlled Mobile Robot"
        },
        {
            title:"Cannonball",
			year:"2010",
            image:"cannonball.jpg",
            url:"https://youtu.be/qE38qtjhbLs",
			description:
			"A pioneer Wiimote Controlled Mobile Robot"
        },
        {
            title:"Hand Augmentation",
			year:"2016",
            image:"supernumerary.jpg",
            url:"https://www.youtube.com/watch?v=GYFfOJpuJHk",
			description:
			"A supernumerary robotic limb hand robot"
        },
        {
            title:"Verdopplerbot AI V1",
			year:"2023",
            image:"verdopplerbotai.jpg",
            url:"https://youtu.be/AARts_NJcPw?si=C4CtIP4Z2qYBD8ji",
			description:
			"Archwire bending Robot Machine"
        }		
    ]
},


{
    name:"BCI",
    texture:"bci.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Aura EEG Device",
			year:"2017",
            image:"aura.jpg",
            url:"https://www.mirai-innovation-lab.com/aura-through-time/",
			description:
			"An EEG Reading Harwdare Device"
        },
        {
            title:"3D Mindwave Unity Environment",
			year:"2014",
            image:"bci_env.jpg",
            url:"https://youtu.be/FN6Tui_sEzo",
			description:
			"A 3D Interactive BCI Environment"
        },
        {
            title:"BCI Neurocar",
			year:"2012",
            image:"bcicar.jpg",
            url:"https://youtu.be/OCTTJRChK8Y?si=2u_pgF-JXPdkFs7R",
			description:
			"A BCI car prototype to be used from PET recycling funding to help handicap."
        },
        {
            title:"BMI for Supernumerary",
			year:"2018",
            image:"bcinature.jpg",
            url:"https://www.science.org/doi/10.1126/scirobotics.aat1228?ijkey=jgzH2rMiJdja6&keytype=ref&siteid=robotics",
			description:
			"BMI to perform a goal-oriented task while simultaneously using their own arms to do a different task."
        },
        {
            title:"ALIFE26 BMI/AL Tutorial",
			year:"2026",
            image:"alifetutorial.jpg",
            url:"https://bsenzio.github.io/bmitutorialALIFE26/",
			description:
			"From neural signals to AL interactive systems."
        },
        {
            title:"BCI e-Textile",
			year:"2019",
            image:"bcipatent.jpg",
            url:"",
			description:
			"BMI Headset with e-textiles and use of wearable neurofeedback"
        }		
    ]
},

{
    name:"Products",
    texture:"product.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Touch Water Dispenser",
			year:"2022",
            image:"touchwaterdispenser.jpg",
            url:"",
			description:
			"Touch panel water dispensing machine with RFID"
        },
        {
            title:"Bus Tracking Device",
			year:"2022",
            image:"products1.jpg",
            url:"",
			description:
			"Bus GPS and GPRS Tracker"
        },
        {
            title:"Electric Fence",
			year:"2013",
            image:"Y2.jpg",
            url:"",
			description:
			"Electric Fence and Gate controllers"
        },
        {
            title:"Laser Engravings",
			year:"2012",
            image:"mabe5.JPG",
            url:"",
			description:
			"Special Engravings and fabrications"
        },
        {
            title:"AoLDC Apparrel",
			year:"2012",
            image:"fotl1.jpg",
            url:"",
			description:
			"One layer of different acrylic products Light Displays"
        },
        {
            title:"AoLDC",
			year:"2011",
            image:"aoldc1_small.jpg",
            url:"",
			description:
			"One layer of different acrylic products"
        },
        {
            title:"VaSenzios",
			year:"2023",
            image:"glass.jpg",
            url:"https://youtu.be/Q50DDXVfSDA",
			description:
			"An interactive inductive glass prototype"
        },
        {
            title:"Retail Level RGB LED Lamp",
			year:"2023",
            image:"led_lamp.jpg",
            url:"",
			description:
			"An IR remote RGB Commercial Level Lamp"
        },
        {
            title:"Inductive Braille",
			year:"2023",
            image:"braille.jpg",
            url:"https://youtu.be/lZagQIphQ3U",
			description:
			"A dynamic Braille proposed"
        },
		{
			title:"XR Interaction System",
			year:"2025",
			image:"aruco.jpg",
			url:"https://youtu.be/JOJYk69uOSQ",
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."
		},		
		{
			title:"Interative Arcade Machine",
			year:"2026",
			image:"arcade.jpg",
			url:"",
			description:
			"An interactive Arcade machine with AI and custom games"
		}
    ]
},


{
    name:"Social Causes",
    texture:"social.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Vegetables here, games there...",
			year:"2025",
            image:"vegetables.jpg",
            url:"https://www.youtube.com/live/QoZwG4V6CVw?si=o_C43iGD-uhwwK3-",
			description:
			"Spreading AI and AL through gaming experiences"
        },
        {
            title:"BCI and Robotics for Schools",
			year:"2012",
            image:"bci_schools.jpg",
            url:"",
			description:
			"Trading PET for BCI Robotics education at schools"

        },
        {
            title:"Recicla para Ayudar",
			year:"2012",
            image:"social8.JPG",
            url:"",
			description:
			"A social cause project PET recycling to support lighting marginalized communities"

        },
        {
            title:"Local PET Gathering",
			year:"2012",
            image:"social16.jpg",
            url:"l",
			description:
			"PET Gathering at schools"

        },
        {
            title:"Senior People Manufacturing",
			year:"2023",
            image:"oldmanufacture.jpg",
            url:"l",
			description:
			"Senior people employment for electronics assembly program"

        }			
    ]
},

{
    name:"Games",
    texture:"games.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
	    {
            title:"Okinawa Adventure 3D",
			year:"2026",
            image:"okadv3d.jpg",
            url:"",
			description:
			"Okinawa culture 3D Experience"

        },		
	    {
            title:"Okinawa Adventure 2D",
			year:"2026",
            image:"okadv.jpg",
            url:"https://youtu.be/T-jyL2qHiG4?si=omZ6Z8QPk8VnF5wB",
			description:
			"Okinawa culture 2D Retro NES Game"

        },		
	    {
            title:"Where Are my Veggies",
			year:"2025",
            image:"wamg.jpg",
            url:"https://youtu.be/rOK47AQa050?si=SvaBNDeiUAVHA6ar",
			description:
			"GoL NES Implementation"

        },	
	    {
            title:"Stay Good: Barber Assault",
			year:"2026",
            image:"sgba.jpg",
            url:"https://bsenzio.github.io/TestStayGood/",
			description:
			"WebGL Implementation"

        },	
	    {
            title:"Nara Adventure",
			year:"2026",
            image:"naraadventure.jpg",
			url:"https://bsenzio.github.io/portfolio/projects.html",
			description:
			"Game of Nara Prefecture for Local Festivals"

        },	
	    {
            title:"PDO 3D",
			year:"2023",
            image:"pdo3d.jpg",
            url:"https://youtu.be/rOK47AQa050?si=SvaBNDeiUAVHA6ar",
			description:
			"Mexican 3D Politics game"

        },	
	
	    {
            title:"PDO 2D",
			year:"2023",
            image:"pdo.jpg",
            url:"https://www.youtube.com/watch?v=BKFJajgmsUY",
			description:
			"Mexican 2D retro type game"

        },
        {
            title:"Ganbare Shisa",
			year:"2015",
            image:"shisablender.jpg",
            url:"https://youtu.be/ENqnNoTl6a4",
			description:
			"Small Blender Animation Drafting"

        },
        {
            title:"8-bit Trouble",
			year:"2025",
            image:"8_bit_trouble.jpg",
            url:"https://youtu.be/TFJNJK4z_fE?si=UcRHCHUPbZp82q-7",
			description:
			"Fusion begins 2012, all your base are belong to us!!"

        }
    ]
}

];


// Public helpers remain available to the home-page featured projects.
function getAllProjects() {
    return categories.flatMap(category => category.projects.map(project => ({...project, category: category.name})));
}
function getRandomProjects(count = 3) {
    const all = getAllProjects();
    for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, count);
}

(() => {
    function initializeObservatory() {
        const root = document.getElementById('projectObservatory');
        if (!root) return;
        const colors = ['#83d6f3','#e5b481','#b3a0ef','#83d8bb','#eea8bb','#e6ce88'];
        const intros = [
            'From machine perception to local intelligence. Explore systems that make sense of signals, images and information.',
            'Ideas that move into the physical world. Machines, mechanisms and new ways to control them.',
            'Where neural signals become interaction. Devices and experiences connecting people with computational systems.',
            'From an experiment to something tangible. Interfaces, hardware and products built to be used.',
            'Technology in service of people. Education, recycling and community-oriented initiatives.',
            'Play as a space for experimentation. Interactive worlds, retro hardware and cultural experiences.'
        ];
        const rows = categories.flatMap((category, ci) => category.projects.map((project, pi) => ({project, ci, pi, id:`${ci}-${pi}`})));
        const map = document.getElementById('orbitMap');
        const nodes = document.getElementById('mapNodes');
        const inspector = document.getElementById('projectInspector');
        const collection = document.getElementById('projectCollection');
        const search = document.getElementById('projectSearch');
        const filters = document.getElementById('categoryFilters');
        const status = document.getElementById('projectStatus');
        let selectedCategory = null;
        let selectedProject = null;
        let view = 'map';
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let paused = reduced.matches;

        function el(tag, className, text) {
            const node = document.createElement(tag);
            if (className) node.className = className;
            if (text !== undefined) node.textContent = text;
            return node;
        }
        function button(className, text, action) {
            const node = el('button', className, text);
            node.type = 'button';
            node.addEventListener('click', action);
            return node;
        }
        function image(file, className, folder='projects') {
            const img = el('img', className);
            img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
            img.addEventListener('error', () => {
                // Keep the geometry and accessible button label if a cover is absent.
                img.removeAttribute('src'); img.style.opacity = '.12';
            }, {once:true});
            if (file) img.src = `assets/images/${folder}/${file}`;
            return img;
        }
        function matching() {
            const query = search.value.trim().toLowerCase();
            return rows.filter(row => (selectedCategory === null || row.ci === selectedCategory) &&
                [row.project.title,row.project.description,row.project.year,categories[row.ci].name].join(' ').toLowerCase().includes(query));
        }
        function selectCategory(ci) {
            selectedCategory = ci; selectedProject = null;
            render();
        }
        function selectProject(row) {
            selectedProject = row.id;
            render();
            if (window.innerWidth <= 760) inspector.scrollIntoView({block:"start", behavior: reduced.matches ? "auto" : "smooth"});
        }
        function projectLink(url) {
            if (!url || !url.trim() || url === 'l') return null;
            try {
                const parsed = new URL(url, document.baseURI);
                return ['https:','http:'].includes(parsed.protocol) ? parsed.href : null;
            } catch { return null; }
        }
        function renderFilters() {
            const activeElement = document.activeElement;
            const focusIndex = Array.from(filters.children).indexOf(activeElement);
            filters.replaceChildren();
            const all = button('obs-filter', 'All worlds', () => selectCategory(null));
            all.setAttribute('aria-pressed',String(selectedCategory === null)); filters.append(all);
            categories.forEach((category, index) => {
                const chip = button('obs-filter', '', () => selectCategory(index));
                chip.style.setProperty('--world-color',colors[index % colors.length]);
                chip.append(el('i'),document.createTextNode(category.name),el('span','',String(category.projects.length)));
                chip.setAttribute('aria-pressed',String(selectedCategory === index)); filters.append(chip);
            });
            if (focusIndex >= 0) filters.children[focusIndex]?.focus({preventScroll:true});
        }
        function renderMap(matches) {
            nodes.replaceChildren();
            const category = selectedCategory === null ? null : categories[selectedCategory];
            document.getElementById('mapBreadcrumb').textContent = category ? `SYSTEM / ${category.name.toUpperCase()}` : 'THE COMPLETE SYSTEM';
            const core = el('div','obs-core');
            core.append(el('small','',category ? 'CURRENT WORLD' : 'BRUNO / SELECTED WORK'),el('strong','',category ? category.name : String(rows.length)),el('small','',category ? `${matches.length} projects` : 'PROJECTS · 6 WORLDS'));
            nodes.append(core);
            if (selectedCategory === null && !search.value.trim()) {
                categories.forEach((cat, ci) => {
                    const angle = -Math.PI / 2 + ci * Math.PI * 2 / categories.length;
                    const world = button('obs-world','',() => selectCategory(ci));
                    world.style.left = `${50+34*Math.cos(angle)}%`;
                    world.style.top = `${48+32*Math.sin(angle)}%`;
                    world.style.setProperty('--world-color',colors[ci % colors.length]);
                    world.setAttribute('aria-label',`Explore ${cat.name}, ${cat.projects.length} projects`);
                    const globe = el('span','obs-globe');globe.append(image(cat.texture,'','planets'));
                    world.append(globe,el('span','obs-world-label',cat.name),el('span','obs-world-count',`${cat.projects.length} projects`));nodes.append(world);
                });
                return;
            }
            matches.forEach((row, i) => {
                const angle = -Math.PI / 2 + i*Math.PI*2/Math.max(1,matches.length);
                // Search results use two rings when the result set grows.
                const radius = matches.length > 16 && i%2 ? 24 : 35;
                const node = button('obs-project-node','',() => selectProject(row));
                node.style.left = `${50+radius*Math.cos(angle)}%`;node.style.top=`${49+radius*Math.sin(angle)}%`;
                node.setAttribute('aria-label',`${row.project.title}, ${row.project.year}. Show details`);
                node.title=row.project.title;
                node.setAttribute('aria-pressed',String(selectedProject === row.id));
                node.append(image(row.project.image),el('span','obs-node-number',String(i+1).padStart(2,'0')));nodes.append(node);
            });
        }
        function renderCollection(matches) {
            collection.replaceChildren();
            matches.forEach(row => {
                const card = button('obs-mini-card','',() => selectProject(row));
                card.setAttribute('aria-pressed',String(selectedProject === row.id));
                card.append(image(row.project.image),el('small','',`${categories[row.ci].name} / ${row.project.year}`),el('strong','',row.project.title));
                collection.append(card);
            });
            if (!matches.length) collection.append(el('p','obs-no-results','No projects match this search. Try another word or return to All worlds.'));
        }
        function renderInspector(matches) {
            // Restore keyboard focus after updating the detail panel.
            const previous = inspector.contains(document.activeElement) ? document.activeElement?.dataset.project : null;
            inspector.replaceChildren();
            const row = matches.find(item => item.id === selectedProject);
            const ci = row ? row.ci : selectedCategory;
            root.style.setProperty('--obs-accent',ci === null ? '#8debdc' : colors[ci%colors.length]);
            if (row) {
                inspector.append(el('div','obs-kicker',`${categories[row.ci].name} / ${row.project.year}`),image(row.project.image,'obs-inspector-image'),el('h3','',row.project.title),el('p','',row.project.description));
                const url=projectLink(row.project.url);
                if(url) {
                    const link=el('a','obs-open-link','Open project ↗');link.href=url;link.target='_blank';link.rel='noopener noreferrer';inspector.append(link);
                } else inspector.append(el('p','', 'Project overview · no external link available.'));
            } else if (selectedCategory !== null) {
                inspector.append(el('div','obs-kicker',`WORLD ${String(selectedCategory+1).padStart(2,'0')}`),el('h3','',categories[selectedCategory].name),el('p','',intros[selectedCategory] || 'Explore this collection of projects.'));
            } else {
                inspector.append(el('div','obs-kicker','WELCOME, EXPLORER'),el('h3','','Different worlds. Shared curiosity.'),el('p','','Every world opens a different part of the portfolio. Select a planet to enter its constellation, or search for an idea to follow it across disciplines.'));
                const facts=el('div','obs-facts');
                [[rows.length,'Projects'],[categories.length,'Worlds']].forEach(([n,label])=>{const fact=el('div');fact.append(el('strong','',String(n)),el('span','',label));facts.append(fact)});inspector.append(facts);
            }
            inspector.append(el('div','obs-next-label',`${matches.length} PROJECTS / SELECT TO DISCOVER`));
            const list=el('div','obs-project-list');
            matches.forEach(item=>{
                const entry=button('obs-list-item','',()=>selectProject(item));entry.dataset.project=item.id;
                entry.setAttribute('aria-pressed',String(selectedProject===item.id));
                entry.append(image(item.project.image),el('span','',item.project.title));list.append(entry);
            });
            if(!matches.length) list.append(el('p','obs-no-results','No matches. Clear the search or choose another world.'));
            inspector.append(list);
            if(previous) Array.from(list.children).find(n=>n.dataset.project===previous)?.focus({preventScroll:true});
        }
        function render() {
            const matches=matching();
            if(!matches.some(row=>row.id===selectedProject)) selectedProject=null;
            renderFilters();renderMap(matches);renderCollection(matches);renderInspector(matches);
            map.hidden=view!=='map';collection.hidden=view!=='cards';
            document.getElementById('mapView').setAttribute('aria-pressed',String(view==='map'));
            document.getElementById('cardsView').setAttribute('aria-pressed',String(view==='cards'));
            status.textContent=`${matches.length} of ${rows.length} projects${selectedCategory===null ? ' · All worlds' : ' · '+categories[selectedCategory].name}`;
        }
        search.addEventListener('input',()=>{selectedProject=null;render()});
        document.getElementById('resetOrbit').addEventListener('click',()=>{search.value='';selectedCategory=null;selectedProject=null;render()});
        document.getElementById('mapView').addEventListener('click',()=>{view='map';render();drawStars()});
        document.getElementById('cardsView').addEventListener('click',()=>{view='cards';render()});
        const motion=document.getElementById('motionToggle');
        function updateMotion(){root.classList.toggle('obs-paused',paused);motion.textContent=paused?'Resume motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused))}
        motion.addEventListener('click',()=>{paused=!paused;updateMotion()});
        function drawStars() {
            const canvas=document.getElementById('starCanvas');
            const width=map.clientWidth,height=map.clientHeight;
            if(!width||!height)return;
            const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;
            const ctx=canvas.getContext('2d');if(!ctx)return;ctx.scale(dpr,dpr);
            let seed=41;const random=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
            for(let i=0;i<180;i++){const x=random()*width,y=random()*height,r=random()*.9+.2;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`rgba(180,213,244,${random()*.6+.12})`;ctx.fill()}
        }
        new ResizeObserver(drawStars).observe(map);
        render();updateMotion();drawStars();
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initializeObservatory,{once:true});
    else initializeObservatory();
})();
