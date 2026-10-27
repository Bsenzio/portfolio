// Rebuilt homepage bundle using the supplied working index, home, and timeline references.

// ---- inline ----
(() => {
(() => {
 const phone = navigator.userAgentData?.mobile === true ||
  /Android.*Mobile|iPhone|iPod|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (window.matchMedia('(pointer:coarse)').matches && Math.min(screen.width,screen.height)<=600);
 document.documentElement.classList.toggle('compact-home',phone);
})();
})();

// ---- inline ----
(() => {
document.querySelectorAll("[data-current-year]").forEach(node => node.textContent = new Date().getFullYear())
})();

// ---- inline ----
(() => {
const params =
    new URLSearchParams(window.location.search);


window.EJS_player =
    "#game";


// Default visual preset, configured before the emulator loader runs.
window.EJS_defaultOptions = {
    ...(window.EJS_defaultOptions || {}),
    shader: params.get('graphics') === 'fast' ? 'disabled' : 'crt-geom.glslp',
    vsync: 'disabled',
    rewindEnabled: 'disabled',
    fastForward: 'disabled',
    slowMotion: 'disabled'
};

window.EJS_core =
    "nes";


window.EJS_pathtodata =
    "https://cdn.emulatorjs.org/stable/data/";


window.EJS_startOnLoaded =
    true;


window.EJS_gameUrl =
    params.get("rom") ||
    "assets/roms/wamg.nes";


document.addEventListener(
    "DOMContentLoaded",
    () =>
    {

		document
			.querySelectorAll(".game-cartridge")
			.forEach(cartridge =>
			{
                cartridge.tabIndex = 0;
                cartridge.setAttribute('role', 'button');
                cartridge.setAttribute('aria-label', 'Play ' + cartridge.alt + (cartridge.dataset.link ? ' (Unity WebGL)' : ''));
                cartridge.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); cartridge.click(); }
                });
				cartridge.addEventListener(
					"click",
					() =>
					{

                        /* Unity cartridge: switch engine without running both at once. */
                        if (cartridge.dataset.link) {
                            const url=new URL(location.href);
                            url.searchParams.set('unity','staygood');
                            location.href=url.href;
                            return;
                        }


						/* NES game */
						if (cartridge.dataset.rom)
						{
							const rom =
								cartridge.dataset.rom;

							const url=new URL(location.href);
                            url.searchParams.delete('unity');
                            url.searchParams.set('rom',rom);
                            location.href=url.href;
						}

					}
				);
			});


		document
			.querySelectorAll(".game-cartridge")
			.forEach(cartridge =>
			{
				if (
					cartridge.dataset.rom &&
					cartridge.dataset.rom ===
					window.EJS_gameUrl && !params.has("unity")
				)
				{
					cartridge.classList.add(
						"selected-cartridge"
					);
				}
			});

    }
);
})();

// ---- inline ----
(() => {
if(!document.documentElement.classList.contains('compact-home') && new URLSearchParams(location.search).get('unity')!=='staygood'){
 const loader=document.createElement('script');loader.src='https://cdn.emulatorjs.org/stable/data/loader.js';document.body.append(loader);
}
})();

// ---- js/tech-background.js ----
(() => {
// =====================================================
// TECH BACKGROUND
// Bruno Senzio-Savino Website
// =====================================================

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.id = "tech-background";

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

document.body.prepend(canvas);

// =====================================================
// RESIZE
// =====================================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =====================================================
// STARS
// =====================================================

const stars = [];

for (let i = 0; i < 250; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2,
        speed: 0.2 + Math.random() * 0.8
    });
}

// =====================================================
// CIRCUIT NODES
// =====================================================

const nodes = [];

for (let i = 0; i < 80; i++) {
    nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
    });
}

// =====================================================
// ASTEROIDS
// =====================================================

const asteroids = [];

for (let i = 0; i < 18; i++) {
    asteroids.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 10 + Math.random() * 20,
        speed: 0.2 + Math.random(),
        rot: Math.random() * Math.PI
    });
}

// =====================================================
// SPACESHIPS
// =====================================================

const ships = [];

for (let i = 0; i < 5; i++) {
    ships.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 1 + Math.random() * 2,
        dir: Math.random() > 0.5 ? 1 : -1
    });
}

// =====================================================
// LASERS
// =====================================================

const lasers = [];

function spawnLaser() {

    const ship = ships[Math.floor(Math.random() * ships.length)];

    lasers.push({
        x: ship.x,
        y: ship.y,
        vx: ship.dir * 8,
        life: 80
    });
}

setInterval(spawnLaser, 1200);

// =====================================================
// HOLOGRAMS
// =====================================================

const holograms = [];

for (let i = 0; i < 10; i++) {

    holograms.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 20 + Math.random() * 40,
        phase: Math.random() * Math.PI * 2
    });
}

// =====================================================
// VEGETABLES
// =====================================================

const vegetables = [];

const veggieIcons = [
    "🥕",
    "🥦",
    "🌽",
    "🍅",
    "🥬",
    "🧅"
];

for (let i = 0; i < 15; i++) {

    vegetables.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        icon: veggieIcons[Math.floor(Math.random() * veggieIcons.length)],
        speed: 0.2 + Math.random() * 0.5,
        size: 16 + Math.random() * 16
    });
}

// =====================================================
// DRAW STARS
// =====================================================

function drawStars() {

    ctx.fillStyle = "white";

    stars.forEach(star => {

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// =====================================================
// DRAW NEURAL NETWORK
// =====================================================

function drawNetwork() {

    nodes.forEach(node => {

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width)
            node.vx *= -1;

        if (node.y < 0 || node.y > canvas.height)
            node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {

                ctx.strokeStyle =
                    `rgba(0,255,255,${1 - dist / 120})`;

                ctx.lineWidth = 0.5;

                ctx.beginPath();

                ctx.moveTo(nodes[i].x, nodes[i].y);

                ctx.lineTo(nodes[j].x, nodes[j].y);

                ctx.stroke();
            }
        }
    }
}

// =====================================================
// DRAW CIRCUITS
// =====================================================

function drawCircuits() {

    ctx.strokeStyle = "rgba(0,255,150,0.15)";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 140) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 140) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }
}

// =====================================================
// DRAW ASTEROIDS
// =====================================================

function drawAsteroids() {

    ctx.strokeStyle = "#888";

    asteroids.forEach(a => {

        ctx.save();

        ctx.translate(a.x, a.y);

        ctx.rotate(a.rot);

        ctx.beginPath();

        ctx.moveTo(-a.size, -a.size / 2);
        ctx.lineTo(a.size, -a.size);
        ctx.lineTo(a.size * 1.2, 0);
        ctx.lineTo(a.size / 2, a.size);
        ctx.lineTo(-a.size, a.size / 2);

        ctx.closePath();

        ctx.stroke();

        ctx.restore();

        a.x -= a.speed;

        if (a.x < -50) {
            a.x = canvas.width + 50;
        }
    });
}

// =====================================================
// DRAW SHIPS
// =====================================================

function drawShips() {

    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;

    ships.forEach(ship => {

        ctx.beginPath();

        ctx.moveTo(ship.x, ship.y);

        ctx.lineTo(ship.x - 15 * ship.dir, ship.y - 8);

        ctx.lineTo(ship.x - 15 * ship.dir, ship.y + 8);

        ctx.closePath();

        ctx.stroke();

        ship.x += ship.speed * ship.dir;

        if (ship.x > canvas.width + 50)
            ship.x = -50;

        if (ship.x < -50)
            ship.x = canvas.width + 50;
    });
}

// =====================================================
// DRAW LASERS
// =====================================================

function drawLasers() {

    ctx.strokeStyle = "#ff3333";
    ctx.lineWidth = 2;

	for(let i = lasers.length - 1; i >= 0; i--){

		const laser = lasers[i];

		ctx.beginPath();
		ctx.moveTo(laser.x, laser.y);
		ctx.lineTo(laser.x - laser.vx * 2, laser.y);
		ctx.stroke();

		laser.x += laser.vx;
		laser.life--;

		if(laser.life <= 0){
			lasers.splice(i,1);
		}
	}
}

// =====================================================
// DRAW HOLOGRAMS
// =====================================================

function drawHolograms() {

    holograms.forEach(h => {

        const alpha =
            0.2 +
            Math.sin(Date.now() * 0.002 + h.phase) * 0.1;

        ctx.strokeStyle =
            `rgba(0,255,255,${alpha})`;

        ctx.beginPath();

        ctx.arc(
            h.x,
            h.y,
            h.size,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        for (let i = -h.size; i < h.size; i += 6) {

            ctx.beginPath();

            ctx.moveTo(h.x - h.size, h.y + i);

            ctx.lineTo(h.x + h.size, h.y + i);

            ctx.stroke();
        }
    });
}

// =====================================================
// DRAW VEGETABLES
// =====================================================

function drawVegetables() {

    vegetables.forEach(v => {

        ctx.font = `${v.size}px Segoe UI Emoji`;

        ctx.fillText(v.icon, v.x, v.y);

        v.y += v.speed;

        if (v.y > canvas.height + 50) {

            v.y = -50;
            v.x = Math.random() * canvas.width;
        }
    });
}

// =====================================================
// ANIMATION LOOP
// =====================================================

function animateBackground() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawStars();

    drawCircuits();

    drawNetwork();

    drawAsteroids();

    drawShips();

    drawLasers();

    drawHolograms();

    drawVegetables();

    drawRobots();

    drawAR();

    drawXR();

    drawScanner();

	requestAnimationFrame(
		animateBackground
	);
}

const robots = [];

for(let i=0;i<8;i++){

    robots.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        dir:Math.random()>0.5?1:-1,
        speed:0.4+Math.random()
    });
}

function drawRobots(){

    ctx.strokeStyle="#00ff88";
    ctx.lineWidth=2;

    robots.forEach(r=>{

        // cabeza
        ctx.strokeRect(
            r.x-8,
            r.y-20,
            16,
            16
        );

        // ojos
        ctx.beginPath();
        ctx.arc(r.x-4,r.y-14,1.5,0,Math.PI*2);
        ctx.arc(r.x+4,r.y-14,1.5,0,Math.PI*2);
        ctx.stroke();

        // cuerpo
        ctx.strokeRect(
            r.x-10,
            r.y,
            20,
            18
        );

        // piernas
        ctx.beginPath();
        ctx.moveTo(r.x-5,r.y+18);
        ctx.lineTo(r.x-8,r.y+28);

        ctx.moveTo(r.x+5,r.y+18);
        ctx.lineTo(r.x+8,r.y+28);

        ctx.stroke();

        r.x += r.speed*r.dir;

        if(r.x>canvas.width+30)
            r.x=-30;

        if(r.x<-30)
            r.x=canvas.width+30;
    });
}

const arMarkers=[];

for(let i=0;i<12;i++){

    arMarkers.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        size:20+Math.random()*50,
        phase:Math.random()*10
    });
}

function drawAR(){

    arMarkers.forEach(m=>{

        const pulse=
        Math.sin(Date.now()*0.002+m.phase)*5;

        ctx.strokeStyle=
        "rgba(0,255,255,0.3)";

        ctx.beginPath();

        ctx.rect(
            m.x-m.size/2,
            m.y-m.size/2,
            m.size+pulse,
            m.size+pulse
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
            m.x,
            m.y,
            m.size/2+pulse,
            0,
            Math.PI*2
        );

        ctx.stroke();
    });
}

const xrObjects=[];

for(let i=0;i<10;i++){

    xrObjects.push({
        angle:Math.random()*Math.PI*2,
        radius:20+Math.random()*30,
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight
    });
}

function drawXR(){

    xrObjects.forEach(o=>{

        o.angle+=0.01;

        const ox=
        o.x+Math.cos(o.angle)*o.radius;

        const oy=
        o.y+Math.sin(o.angle)*o.radius;

        ctx.strokeStyle=
        "rgba(255,0,255,0.35)";

        ctx.beginPath();

        ctx.arc(
            ox,
            oy,
            6,
            0,
            Math.PI*2
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(o.x,o.y);
        ctx.lineTo(ox,oy);

        ctx.stroke();
    });
}

function drawScanner(){

    const y =
    (Date.now()*0.05)%canvas.height;

    ctx.strokeStyle=
    "rgba(0,255,255,0.08)";

    ctx.beginPath();

    ctx.moveTo(0,y);

    ctx.lineTo(canvas.width,y);

    ctx.stroke();
}

animateBackground();
})();

// ---- js/timeline.js ----
(() => {
// Career archive in English, updated from the supplied dated CV screenshots.
// date is YYYY-MM when the month was supplied; project/publication dates retain year precision.
window.careerEvents = [
  {
    "id": "chapter-1",
    "year": "2006",
    "kind": "Education",
    "title": "Mechatronics studies at UNAM",
    "description": "Began undergraduate studies in mechatronics at the Faculty of Engineering, National Autonomous University of Mexico.",
    "link": "",
    "date": "2006-08"
  },
  {
    "id": "chapter-12",
    "year": "2009",
    "kind": "Projects",
    "title": "Mobile Robot Development",
    "description": "Robotics · Autonomous Robot Hardware Development and Deployment",
    "link": "projects.html"
  },
  {
    "id": "chapter-13",
    "year": "2009",
    "kind": "Projects",
    "title": "Wiimote SCARA Arm",
    "description": "Robotics · A pioneer SCARA arm prototype controlled with Wiimote",
    "link": "projects.html"
  },
  {
    "id": "chapter-68",
    "year": "2009",
    "kind": "Publications",
    "title": "Experimental Determination of an Irregular Object's Moment of Inertia",
    "description": "ICIAS",
    "link": "publications.html"
  },
  {
    "id": "chapter-69",
    "year": "2009",
    "kind": "Publications",
    "title": "Mobile Robot Navigation with a Wiimote",
    "description": "ICIAS",
    "link": "publications.html"
  },
  {
    "id": "chapter-14",
    "year": "2010",
    "kind": "Projects",
    "title": "Bruno Kart",
    "description": "Robotics · A pioneer Wiimote Controlled Mobile Robot",
    "link": "projects.html"
  },
  {
    "id": "chapter-15",
    "year": "2010",
    "kind": "Projects",
    "title": "Cannonball",
    "description": "Robotics · A pioneer Wiimote Controlled Mobile Robot",
    "link": "projects.html"
  },
  {
    "id": "dated-84",
    "year": "2010",
    "date": "2010-07",
    "kind": "Career",
    "title": "Joined Proveedora Mexicana de Monofilamentos S.A. de C.V.",
    "description": "Started as Plant Engineer.",
    "link": ""
  },
  {
    "id": "chapter-3",
    "year": "2010",
    "kind": "Awards",
    "title": "Faculty of Engineering Best Student Award",
    "description": "Faculty of Engineering Best Student Award, National Autonomous University of Mexico.",
    "link": "",
    "date": "2010-10"
  },
  {
    "id": "chapter-29",
    "year": "2011",
    "kind": "Projects",
    "title": "AoLDC",
    "description": "Products · One layer of different acrylic products",
    "link": "projects.html"
  },
  {
    "id": "chapter-66",
    "year": "2011",
    "kind": "Publications",
    "title": "Remote Operation of a Parabolic Motion and Free Fall Experiment",
    "description": "ICIAS",
    "link": "publications.html"
  },
  {
    "id": "chapter-67",
    "year": "2011",
    "kind": "Publications",
    "title": "Instrumentation and Control for the Remote Operation of the Projectile Motion and Free-Fall Experiment",
    "description": "Bachelor Thesis",
    "link": "publications.html"
  },
  {
    "id": "chapter-2",
    "year": "2011",
    "kind": "Education",
    "title": "Undergraduate graduation — UNAM",
    "description": "Completed undergraduate studies in mechatronics engineering.",
    "link": "",
    "date": "2011-05"
  },
  {
    "id": "dated-85",
    "year": "2011",
    "date": "2011-05",
    "kind": "Career",
    "title": "Concluded appointment — Proveedora Mexicana de Monofilamentos S.A. de C.V.",
    "description": "Concluded the Plant Engineer appointment.",
    "link": ""
  },
  {
    "id": "dated-86",
    "year": "2011",
    "date": "2011-06",
    "kind": "Career",
    "title": "Joined Arrow Electronics Inc.",
    "description": "Started as Field Applications Engineer.",
    "link": ""
  },
  {
    "id": "dated-88",
    "year": "2011",
    "date": "2011-11",
    "kind": "Career",
    "title": "Joined Recicla para Ayudar a Quien Más lo Necesita A.C.",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-20",
    "year": "2012",
    "kind": "Projects",
    "title": "BCI Neurocar",
    "description": "BCI · A BCI car prototype to be used from PET recycling funding to help handicap.",
    "link": "projects.html"
  },
  {
    "id": "chapter-27",
    "year": "2012",
    "kind": "Projects",
    "title": "Laser Engravings",
    "description": "Products · Special Engravings and fabrications",
    "link": "projects.html"
  },
  {
    "id": "chapter-28",
    "year": "2012",
    "kind": "Projects",
    "title": "AoLDC Apparrel",
    "description": "Products · One layer of different acrylic products Light Displays",
    "link": "projects.html"
  },
  {
    "id": "chapter-36",
    "year": "2012",
    "kind": "Projects",
    "title": "BCI and Robotics for Schools",
    "description": "Social Causes · Trading PET for BCI Robotics education at schools",
    "link": "projects.html"
  },
  {
    "id": "chapter-37",
    "year": "2012",
    "kind": "Projects",
    "title": "Recicla para Ayudar",
    "description": "Social Causes · A social cause project PET recycling to support lighting marginalized communities",
    "link": "projects.html"
  },
  {
    "id": "chapter-38",
    "year": "2012",
    "kind": "Projects",
    "title": "Local PET Gathering",
    "description": "Social Causes · PET Gathering at schools",
    "link": "projects.html"
  },
  {
    "id": "chapter-75",
    "year": "2012",
    "kind": "Activities",
    "title": "Arduino and Applications in the Industry",
    "description": "Speaker, Instituto Politécnico Nacional, March 2012. Demonstrations and practical exploration of academic and industrial Arduino applications.",
    "link": ""
  },
  {
    "id": "dated-89",
    "year": "2012",
    "date": "2012-12",
    "kind": "Career",
    "title": "Concluded appointment — Recicla para Ayudar a Quien Más lo Necesita A.C.",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-26",
    "year": "2013",
    "kind": "Projects",
    "title": "Electric Fence",
    "description": "Products · Electric Fence and Gate controllers",
    "link": "projects.html"
  },
  {
    "id": "dated-90",
    "year": "2013",
    "date": "2013-01",
    "kind": "Career",
    "title": "Joined Azul 257",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-19",
    "year": "2014",
    "kind": "Projects",
    "title": "3D Mindwave Unity Environment",
    "description": "BCI · A 3D Interactive BCI Environment",
    "link": "projects.html"
  },
  {
    "id": "chapter-65",
    "year": "2014",
    "kind": "Publications",
    "title": "Test and Development of a Brainwave Password Application",
    "description": "IEEE/SICE",
    "link": "publications.html"
  },
  {
    "id": "dated-91",
    "year": "2014",
    "date": "2014-01",
    "kind": "Career",
    "title": "Concluded appointment — Azul 257",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-4",
    "year": "2014",
    "kind": "Awards",
    "title": "MEXT Scholarship",
    "description": "Japanese Government Scholarship, embassy recommendation route.",
    "link": "",
    "date": "2014-04"
  },
  {
    "id": "dated-87",
    "year": "2014",
    "date": "2014-04",
    "kind": "Career",
    "title": "Concluded appointment — Arrow Electronics Inc.",
    "description": "Concluded the Field Applications Engineer appointment.",
    "link": ""
  },
  {
    "id": "chapter-47",
    "year": "2015",
    "kind": "Projects",
    "title": "Ganbare Shisa",
    "description": "Games · Small Blender Animation Drafting",
    "link": "projects.html"
  },
  {
    "id": "chapter-52",
    "year": "2015",
    "kind": "Publications",
    "title": "Path Detection in Virtual Environment for Synchronous EEG by Density-Based Support Vector Machine",
    "description": "Journal of Information and Communications Engineering",
    "link": "publications.html"
  },
  {
    "id": "chapter-62",
    "year": "2015",
    "kind": "Publications",
    "title": "Density Based Support Vector Machine Classification for a Synchronous EEG Path Tracing Virtual Environment",
    "description": "ICIIBMS",
    "link": "publications.html"
  },
  {
    "id": "chapter-63",
    "year": "2015",
    "kind": "Publications",
    "title": "Synchronous Emotion Pattern Recognition with a Virtual Training Environment",
    "description": "ICAI",
    "link": "publications.html"
  },
  {
    "id": "chapter-64",
    "year": "2015",
    "kind": "Publications",
    "title": "Stability and Performance Evaluation of Wireless Tele-Control System for MIMO Plant",
    "description": "ICWN",
    "link": "publications.html"
  },
  {
    "id": "chapter-5",
    "year": "2015",
    "kind": "Education",
    "title": "Master’s studies — University of the Ryukyus",
    "description": "Entered the master’s program in information engineering, Graduate School of Engineering and Science.",
    "link": "",
    "date": "2015-04"
  },
  {
    "id": "dated-92",
    "year": "2015",
    "date": "2015-08",
    "kind": "Career",
    "title": "Joined Mirai Innovation Lab",
    "description": "Started as Lead Hardware and Product Developer.",
    "link": ""
  },
  {
    "id": "chapter-10",
    "year": "2016",
    "kind": "Projects",
    "title": "Machine Learning for BCI",
    "description": "AI · Unsupervised and Supervised Learning for BCI",
    "link": "projects.html"
  },
  {
    "id": "chapter-16",
    "year": "2016",
    "kind": "Projects",
    "title": "Hand Augmentation",
    "description": "Robotics · A supernumerary robotic limb hand robot",
    "link": "projects.html"
  },
  {
    "id": "chapter-51",
    "year": "2016",
    "kind": "Publications",
    "title": "Brain Wave Pattern Classification: Towards the Design of an Effective Online Classifier",
    "description": "European Journal of Information Science and Technology",
    "link": "publications.html"
  },
  {
    "id": "chapter-56",
    "year": "2016",
    "kind": "Publications",
    "title": "Brain Wave Pattern Classification from Virtual Training Environment by Self-Organizing Maps",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-57",
    "year": "2016",
    "kind": "Publications",
    "title": "Disturbance Response and Stability Analysis of Wireless Tele-Control System for MIMO Plant",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-58",
    "year": "2016",
    "kind": "Publications",
    "title": "On the Effect of Informed Nodes on Learning over Complex Adaptive Networks",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-59",
    "year": "2016",
    "kind": "Publications",
    "title": "A New Double Adaptation Algorithm for Acoustic Noise Control",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-60",
    "year": "2016",
    "kind": "Publications",
    "title": "Classification of Attention Deficit Hyperactivity Disorder (ADHD) Using Non-Linear EEG Features",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-61",
    "year": "2016",
    "kind": "Publications",
    "title": "Tractor Oil Pump Fault Diagnosis by Pseudo-Spectrum Analysis",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-70",
    "year": "2016",
    "kind": "Publications",
    "title": "Feature Extraction and Classification of Attention and Meditation EEG Signals Using Moving Average Methods",
    "description": "IEEJ",
    "link": "publications.html"
  },
  {
    "id": "chapter-9",
    "year": "2016",
    "kind": "Projects",
    "title": "Face Mask Detection",
    "description": "AI · Edge AI Implementation on NPU",
    "link": "projects.html"
  },
  {
    "id": "chapter-18",
    "year": "2017",
    "kind": "Projects",
    "title": "Aura EEG Device",
    "description": "BCI · An EEG Reading Harwdare Device",
    "link": "projects.html"
  },
  {
    "id": "chapter-50",
    "year": "2017",
    "kind": "Publications",
    "title": "An Online Synchronous Brain Wave Signal Pattern Classifier with Parallel Processing Optimization for Embedded System Implementation",
    "description": "International Journal of Advanced Computer Science and Applications",
    "link": "publications.html"
  },
  {
    "id": "chapter-53",
    "year": "2017",
    "kind": "Publications",
    "title": "BrainWave Processing Modular System",
    "description": "Master Thesis",
    "link": "publications.html"
  },
  {
    "id": "chapter-54",
    "year": "2017",
    "kind": "Publications",
    "title": "Non-Linear EEG Signal Feature Extraction and Healthy or Epileptic User Seizure Discrimination",
    "description": "ICTES",
    "link": "publications.html"
  },
  {
    "id": "chapter-55",
    "year": "2017",
    "kind": "Publications",
    "title": "Implementation of a Cloud Processing Based Voice Communication and Noise Reduction Embedded System Network",
    "description": "ICTES",
    "link": "publications.html"
  },
  {
    "id": "chapter-6",
    "year": "2017",
    "kind": "Education",
    "title": "M.S. in Information Engineering",
    "description": "Completed the master’s program at the University of the Ryukyus.",
    "link": "",
    "date": "2017-03"
  },
  {
    "id": "chapter-7",
    "year": "2017",
    "kind": "Awards",
    "title": "Graduate School Dean’s Award",
    "description": "Graduate School of Engineering and Science, University of the Ryukyus.",
    "link": "",
    "date": "2017-03"
  },
  {
    "id": "dated-78",
    "year": "2017",
    "date": "2017-04",
    "kind": "Education",
    "title": "Doctoral studies — Osaka University",
    "description": "Entered the doctoral program at the Graduate School of Engineering Science, Osaka University.",
    "link": ""
  },
  {
    "id": "dated-94",
    "year": "2017",
    "date": "2017-04",
    "kind": "Career",
    "title": "Joined Advanced Telecommunications Research Institute International (ATR)",
    "description": "Started as Research Trainee.",
    "link": ""
  },
  {
    "id": "chapter-11",
    "year": "2018",
    "kind": "Projects",
    "title": "OCR Pharmacy Prescription for Fillers",
    "description": "AI · An AI OCR recognition platform for medical prescription filling machines",
    "link": "projects.html"
  },
  {
    "id": "chapter-21",
    "year": "2018",
    "kind": "Projects",
    "title": "BMI for Supernumerary",
    "description": "BCI · BMI to perform a goal-oriented task while simultaneously using their own arms to do a different task.",
    "link": "projects.html"
  },
  {
    "id": "dated-79",
    "year": "2018",
    "date": "2018-03",
    "kind": "Education",
    "title": "Osaka University — withdrawal from doctoral studies",
    "description": "Withdrew from the doctoral program; no doctoral degree is claimed.",
    "link": ""
  },
  {
    "id": "dated-95",
    "year": "2018",
    "date": "2018-03",
    "kind": "Career",
    "title": "Concluded appointment — Advanced Telecommunications Research Institute International (ATR)",
    "description": "Concluded the Research Trainee appointment.",
    "link": ""
  },
  {
    "id": "dated-93",
    "year": "2018",
    "date": "2018-06",
    "kind": "Career",
    "title": "Concluded appointment — Mirai Innovation Lab",
    "description": "Concluded the Lead Hardware and Product Developer appointment.",
    "link": ""
  },
  {
    "id": "dated-96",
    "year": "2018",
    "date": "2018-06",
    "kind": "Career",
    "title": "Joined ZMP Inc.",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-73",
    "year": "2018",
    "kind": "Patents",
    "title": "Interactive Biosignal Processing System with Sensor Feedback",
    "description": "Granted patent No. 388756. Interactive biosignal processing system with sensor feedback.",
    "link": "publications.html",
    "date": "2018-09"
  },
  {
    "id": "chapter-23",
    "year": "2019",
    "kind": "Projects",
    "title": "BCI e-Textile",
    "description": "BCI · BMI Headset with e-textiles and use of wearable neurofeedback",
    "link": "projects.html"
  },
  {
    "id": "dated-80",
    "year": "2019",
    "date": "2019-06",
    "kind": "Education",
    "title": "Quantic School of Business and Technology — enrollment",
    "description": "Enrolled at Quantic School of Business and Technology.",
    "link": ""
  },
  {
    "id": "dated-81",
    "year": "2020",
    "date": "2020-06",
    "kind": "Education",
    "title": "Quantic School of Business and Technology — graduation",
    "description": "Graduated from Quantic School of Business and Technology. The specific program title has not been supplied.",
    "link": ""
  },
  {
    "id": "dated-97",
    "year": "2020",
    "date": "2020-09",
    "kind": "Career",
    "title": "Concluded appointment — ZMP Inc.",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "dated-98",
    "year": "2021",
    "date": "2021-03",
    "kind": "Career",
    "title": "Joined Arrow Electronics Inc.",
    "description": "Started as Dedicated Field Applications Engineer.",
    "link": ""
  },
  {
    "id": "chapter-24",
    "year": "2022",
    "kind": "Projects",
    "title": "Touch Water Dispenser",
    "description": "Products · Touch panel water dispensing machine with RFID",
    "link": "projects.html"
  },
  {
    "id": "chapter-25",
    "year": "2022",
    "kind": "Projects",
    "title": "Bus Tracking Device",
    "description": "Products · Bus GPS and GPRS Tracker",
    "link": "projects.html"
  },
  {
    "id": "dated-100",
    "year": "2022",
    "date": "2022-04",
    "kind": "Career",
    "title": "Joined University of Advanced Technologies",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "dated-82",
    "year": "2022",
    "date": "2022-04",
    "kind": "Education",
    "title": "Master’s studies — University of Advanced Technologies",
    "description": "Entered a master’s program at the University of Advanced Technologies.",
    "link": ""
  },
  {
    "id": "dated-102",
    "year": "2022",
    "date": "2022-10",
    "kind": "Career",
    "title": "Joined Capgemini S. de R.L. de C.V.",
    "description": "Started as Senior Hardware Engineer.",
    "link": ""
  },
  {
    "id": "dated-99",
    "year": "2022",
    "date": "2022-10",
    "kind": "Career",
    "title": "Concluded appointment — Arrow Electronics Inc.",
    "description": "Concluded the Dedicated Field Applications Engineer appointment.",
    "link": ""
  },
  {
    "id": "chapter-17",
    "year": "2023",
    "kind": "Projects",
    "title": "Verdopplerbot AI V1",
    "description": "Robotics · Archwire bending Robot Machine",
    "link": "projects.html"
  },
  {
    "id": "chapter-30",
    "year": "2023",
    "kind": "Projects",
    "title": "VaSenzios",
    "description": "Products · An interactive inductive glass prototype",
    "link": "projects.html"
  },
  {
    "id": "chapter-31",
    "year": "2023",
    "kind": "Projects",
    "title": "Retail Level RGB LED Lamp",
    "description": "Products · An IR remote RGB Commercial Level Lamp",
    "link": "projects.html"
  },
  {
    "id": "chapter-32",
    "year": "2023",
    "kind": "Projects",
    "title": "Inductive Braille",
    "description": "Products · A dynamic Braille proposed",
    "link": "projects.html"
  },
  {
    "id": "chapter-39",
    "year": "2023",
    "kind": "Projects",
    "title": "Senior People Manufacturing",
    "description": "Social Causes · Senior people employment for electronics assembly program",
    "link": "projects.html"
  },
  {
    "id": "chapter-45",
    "year": "2023",
    "kind": "Projects",
    "title": "PDO 3D",
    "description": "Games · Mexican 3D Politics game",
    "link": "projects.html"
  },
  {
    "id": "chapter-46",
    "year": "2023",
    "kind": "Projects",
    "title": "PDO 2D",
    "description": "Games · Mexican 2D retro type game",
    "link": "projects.html"
  },
  {
    "id": "chapter-72",
    "year": "2024",
    "kind": "Patents",
    "title": "Matrix Electromagnetic Transduction System",
    "description": "Patent application MXa2023002399. Inductive array / matrix electromagnetic transduction system. Patent pending, as listed in the career record.",
    "link": "publications.html",
    "date": "2024-01"
  },
  {
    "id": "dated-101",
    "year": "2024",
    "date": "2024-04",
    "kind": "Career",
    "title": "Concluded appointment — University of Advanced Technologies",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "dated-83",
    "year": "2024",
    "date": "2024-04",
    "kind": "Education",
    "title": "University of Advanced Technologies — withdrawal from master’s studies",
    "description": "Withdrew from the master’s program without submitting a thesis. No completed master’s degree is claimed for this program.",
    "link": ""
  },
  {
    "id": "chapter-8",
    "year": "2024",
    "kind": "Career",
    "title": "SenzioTek — independent venture",
    "description": "Established SenzioTek. Activities listed in the CV include freelance interpreting, electronics engineering and vehicle rental services.",
    "link": "",
    "date": "2024-09"
  },
  {
    "id": "dated-103",
    "year": "2024",
    "date": "2024-09",
    "kind": "Career",
    "title": "Concluded appointment — Capgemini S. de R.L. de C.V.",
    "description": "Concluded the Senior Hardware Engineer appointment.",
    "link": ""
  },
  {
    "id": "chapter-33",
    "year": "2025",
    "kind": "Projects",
    "title": "XR Interaction System",
    "description": "Products · A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces.",
    "link": "projects.html"
  },
  {
    "id": "chapter-35",
    "year": "2025",
    "kind": "Projects",
    "title": "Vegetables here, games there...",
    "description": "Social Causes · Spreading AI and AL through gaming experiences",
    "link": "projects.html"
  },
  {
    "id": "chapter-42",
    "year": "2025",
    "kind": "Projects",
    "title": "Where Are my Veggies",
    "description": "Games · GoL NES Implementation",
    "link": "projects.html"
  },
  {
    "id": "chapter-48",
    "year": "2025",
    "kind": "Projects",
    "title": "8-bit Trouble",
    "description": "Games · Fusion begins 2012, all your base are belong to us!!",
    "link": "projects.html"
  },
  {
    "id": "chapter-71",
    "year": "2025",
    "kind": "Patents",
    "title": "Mixed Reality Environment Generation Technology",
    "description": "Patent application MXa2025009159. Mixed reality system for generating interactive environments. Patent pending, as listed in the career record.",
    "link": "publications.html",
    "date": "2025-08"
  },
  {
    "id": "chapter-22",
    "year": "2026",
    "kind": "Projects",
    "title": "ALIFE26 BMI/AL Tutorial",
    "description": "BCI · From neural signals to AL interactive systems.",
    "link": "projects.html"
  },
  {
    "id": "chapter-34",
    "year": "2026",
    "kind": "Projects",
    "title": "Interative Arcade Machine",
    "description": "Products · An interactive Arcade machine with AI and custom games",
    "link": "projects.html"
  },
  {
    "id": "chapter-40",
    "year": "2026",
    "kind": "Projects",
    "title": "Okinawa Adventure 3D",
    "description": "Games · Okinawa culture 3D Experience",
    "link": "projects.html"
  },
  {
    "id": "chapter-41",
    "year": "2026",
    "kind": "Projects",
    "title": "Okinawa Adventure 2D",
    "description": "Games · Okinawa culture 2D Retro NES Game",
    "link": "projects.html"
  },
  {
    "id": "chapter-43",
    "year": "2026",
    "kind": "Projects",
    "title": "Stay Good: Barber Assault",
    "description": "Games · WebGL Implementation",
    "link": "projects.html"
  },
  {
    "id": "chapter-44",
    "year": "2026",
    "kind": "Projects",
    "title": "Nara Adventure",
    "description": "Games · Game of Nara Prefecture for Local Festivals",
    "link": "projects.html"
  },
  {
    "id": "chapter-49",
    "year": "2026",
    "kind": "Publications",
    "title": "Vegetables, Enemies, and Emergence: A Playable Game of Life on Nintendo for Educational Purposes",
    "description": "Innovations in Machine Intelligence",
    "link": "publications.html"
  },
  {
    "id": "chapter-76",
    "year": "2026",
    "kind": "Activities",
    "title": "Vegetables Here, Games There: BCI and New Horizons",
    "description": "Cross Labs YouTube interview, May 2026. A. Adam and B. Senzio-Savino; unconventional computing, Artificial Life and practical BCI applications.",
    "link": ""
  },
  {
    "id": "chapter-77",
    "year": "2026",
    "kind": "Activities",
    "title": "Hands-on Tutorial on Brain–Computer Interfaces (BCI)",
    "description": "ALIFE26, August 2026. Co-organizer with M. Khosravy, A. Adams and O. Witkowsky; integrating neural signals with adaptive and evolving systems.",
    "link": ""
  },
  {
    "id": "dated-104",
    "year": "2026",
    "date": "2026-03",
    "kind": "Qualifications",
    "title": "Class 3 Amateur Radio Operator License",
    "description": "Japan · License identifier EBYL00403.",
    "link": ""
  },
  {
    "id": "chapter-74",
    "year": "2026",
    "kind": "Patents",
    "title": "Liquid container assembly with removable optical projection base, and projection base module",
    "description": "Application identifier 100233478. Liquid container assembly with removable optical projection base, and projection base module. Patent pending.",
    "link": "publications.html",
    "date": "2026-06"
  }
];

const timelineData = careerEvents.map(event => ({year:event.year,title:event.title,description:event.description}));

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
    name:"AI",
    texture:"ai.jpg",
    orbitRadius:450,
    orbitSpeed:0.1,

    projects:[
        {
            nonAI: false,
            fromScratch: false,
            title:"Face Mask Detection",
			year:"2021",
            image:"npu_ai.jpg",
            links:[],
			description:
			"Edge AI Implementation on NPU"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Machine Learning for BCI",
			year:"2016",
            image:"som_bci.jpg",
            links:[{ label: "Open publication", url: "https://thesai.org/Publications/ViewPaper?Volume=8&Issue=1&Code=IJACSA&SerialNo=52" }],
			description:
			"Unsupervised and Supervised Learning for BCI"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"OCR Pharmacy Prescription for Fillers",
			year:"2018",
            image:"prescriptionai.jpg",
            links:[],
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
            nonAI: true,
            fromScratch: true,
            title:"Mobile Robot Development",
			year:"2009",
            image:"zmpbot.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/xXTng9gSrDU?si=ELs3buI4AdGuYo3N" }],
			description:
			"Autonomous Robot Hardware Development and Deployment"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Wiimote SCARA Arm",
			year:"2009",
            image:"scara_wii.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/SX0WJOZMdzA" }],
			description:
			"A pioneer SCARA arm prototype controlled with Wiimote"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Bruno Kart",
			year:"2010",
            image:"mobile_wii.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/qE38qtjhbLs" }],
			description:
			"A pioneer Wiimote Controlled Mobile Robot"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Cannonball",
			year:"2010",
            image:"cannonball.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/qE38qtjhbLs" }],
			description:
			"A pioneer Wiimote Controlled Mobile Robot"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Hand Augmentation",
			year:"2016",
            image:"supernumerary.jpg",
            links:[{ label: "Open prototype", url: "https://www.youtube.com/watch?v=GYFfOJpuJHk" },
			{ label: "Open demo 1", url: "https://youtu.be/VIz_QDKCtbs" },
			{ label: "Open demo 2", url: "https://youtu.be/LCjvAuEIvNI" },
			{ label: "Open demo 3", url: "https://youtu.be/T67_ayvPHuc" },],
			description:
			"A supernumerary robotic limb hand robot"
        },
        {
            nonAI: true,
            fromScratch: false,
            title:"Verdopplerbot AI V1",
			year:"2023",
            image:"verdopplerbotai.jpg",
            links:[{ label: "Open Demo 1", url: "https://youtu.be/AARts_NJcPw?si=C4CtIP4Z2qYBD8ji" },
			{ label: "Open Demo 2", url: "https://youtu.be/7cBsNGovwoU" },
			{ label: "Open Demo 3", url: "https://youtu.be/1RXU9yrBs6g" },
			{ label: "Open Demo 4", url: "https://youtu.be/nRNZ9IPP03k" },
			{ label: "Open Details", url: "https://youtu.be/yYEootnN5VE" }],
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
            nonAI: true,
            fromScratch: false,
            title:"Aura EEG Device",
			year:"2017",
            image:"aura.jpg",
            links:[{ label: "Open project", url: "https://www.mirai-innovation-lab.com/aura-through-time/" }],
			description:
			"An EEG Reading Harwdare Device"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"3D Mindwave Unity Environment",
			year:"2014",
            image:"bci_env.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/FN6Tui_sEzo" }],
			description:
			"A 3D Interactive BCI Environment"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"BCI Neurocar",
			year:"2012",
            image:"bcicar.jpg",
            links:[{ label: "Open video", url: "https://youtu.be/OCTTJRChK8Y?si=2u_pgF-JXPdkFs7R" }],
			description:
			"A BCI car prototype to be used from PET recycling funding to help handicap."
        },
        {
            nonAI: false,
            fromScratch: false,
            title:"BMI for Supernumerary",
			year:"2018",
            image:"bcinature.jpg",
            links:[{ label: "Open publication", url: "https://www.science.org/doi/10.1126/scirobotics.aat1228?ijkey=jgzH2rMiJdja6&keytype=ref&siteid=robotics" }],
			description:
			"BMI to perform a goal-oriented task while simultaneously using their own arms to do a different task."
        },
        {
            nonAI: false,
            fromScratch: true,
            title:"ALIFE26 BMI/AL Tutorial",
			year:"2026",
            image:"alifetutorial.jpg",
            links:[{ label: "Open tutorial", url: "https://bsenzio.github.io/bmitutorialALIFE26/" }],
			description:
			"From neural signals to AL interactive systems."
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"BCI e-Textile",
			year:"2019",
            image:"bcipatent.jpg",
            links:[{ label: "Open patent", url: "https://bsenzio.github.io/portfolio/assets/pdf/Patents/biosignal_feedback_system.pdf" }],
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
            nonAI: true,
            fromScratch: false,
            title:"Touch Water Dispenser",
			year:"2022",
            image:"touchwaterdispenser.jpg",
            links:[{ label: "Open project", url: "https://youtube.com/shorts/f878WyXYoyk?feature=share" }],
			description:
			"Touch panel water dispensing machine with RFID"
        },
        {
            nonAI: true,
            fromScratch: false,
            title:"Bus Tracking Device",
			year:"2022",
            image:"products1.jpg",
            links:[],
			description:
			"Bus GPS and GPRS Tracker"
        },
        {
            nonAI: true,
            fromScratch: false,
            title:"Electric Fence",
			year:"2013",
            image:"Y2.jpg",
            links:[{ label: "Watch Demo", url: "https://www.youtube.com/watch?v=tVdK7wsy1uI" }],
			description:
			"Electric Fence and Gate controllers"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Laser Engravings",
			year:"2012",
            image:"mabe5.JPG",
            links:[],
			description:
			"Special Engravings and fabrications"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"AOLDC Apparel",
			year:"2012",
            image:"fotl1.jpg",
            links:[],
			description:
			"One layer of different acrylic products Light Displays"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"AOLDC",
			year:"2011",
            image:"aoldc1_small.jpg",
            links:[],
			description:
			"One layer of different acrylic products"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"VaSenzios",
			year:"2023",
            image:"glass.jpg",
            links:[{ label: "Demo reel 1", url: "https://youtu.be/CrCvXHIAtJ4" },
			{ label: "Demo reel 2", url: "https://youtu.be/Q50DDXVfSDA" }],
			description:
			"An interactive inductive glass prototype"
        },
        {
            nonAI: true,
            fromScratch: false,
            title:"Retail Level RGB LED Lamp",
			year:"2023",
            image:"led_lamp.jpg",
            links:[],
			description:
			"An IR remote RGB Commercial Level Lamp"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Inductive Braille",
			year:"2023",
            image:"braille.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/lZagQIphQ3U" }],
			description:
			"A dynamic Braille proposed"
        },
		{
			nonAI: false,
			fromScratch: true,
			title:"XR Interaction System",
			year:"2025",
			image:"aruco.jpg",
			links:[{ label: "Open project", url: "https://youtu.be/JOJYk69uOSQ" }],
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."
		},		
		{
			nonAI: false,
			fromScratch: true,
			title:"Interative Arcade Machine",
			year:"2026",
			image:"arcade.jpg",
			links:[{ label: "Watch Demo", url: "https://youtu.be/BsE8TvaJvD4" },
			{ label: "Watch Demo 2", url: "https://youtu.be/acaqdT1WNYM" },
			{ label: "Watch Demo 3", url: "https://youtu.be/4nDXf4leb6Q" }],
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
            nonAI: false,
            fromScratch: true,
            title:"Vegetables here, games there...",
			year:"2025",
            image:"vegetables.jpg",
            links:[{ label: "Open project", url: "https://www.youtube.com/live/QoZwG4V6CVw?si=o_C43iGD-uhwwK3-" }],
			description:
			"Spreading AI and AL through gaming experiences"
        },
        {
            nonAI: true,
            fromScratch: true,
            title:"BCI and Robotics for Schools",
			year:"2012",
            image:"bci_schools.jpg",
            links:[{ label: "Open project", url: "https://www.youtube.com/watch?v=PMnEDyEkNCg" }],
			description:
			"Trading PET for BCI Robotics education at schools"

        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Recicla para Ayudar",
			year:"2012",
            image:"social8.JPG",
            links:[{ label: "Open project", url: "https://www.youtube.com/watch?v=tagIUTo3pMc" }],
			description:
			"A social cause project PET recycling to support lighting marginalized communities"

        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Local PET Gathering",
			year:"2012",
            image:"social16.jpg",
            links:[],
			description:
			"PET Gathering at schools"

        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Senior People Manufacturing",
			year:"2023",
            image:"oldmanufacture.jpg",
            links:[],
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
            nonAI: false,
            fromScratch: true,
            title:"Okinawa Adventure 3D",
			year:"2026",
            image:"okadv3d.jpg",
            links:[{ label: "Watch Demo", url: "https://youtu.be/BsE8TvaJvD4" }],
			description:
			"Okinawa culture 3D Experience"

        },		
	    {
            nonAI: false,
            fromScratch: true,
            title:"Okinawa Adventure 2D",
			year:"2026",
            image:"okadv.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/T-jyL2qHiG4?si=omZ6Z8QPk8VnF5wB" },
			{ label: "Watch Demo Kiosk", url: "https://youtu.be/4nDXf4leb6Q" }],
			description:
			"Okinawa culture 2D Retro NES Game"

        },		
	    {
            nonAI: false,
            fromScratch: true,
            title:"Where Are my Veggies",
			year:"2025",
            image:"wamg.jpg",
            links:[{ label: "Demo random", url: "https://youtu.be/6K8MLqRcPp8" },
			{ label: "Demo Manual", url: "https://youtu.be/FW_4LI9_3X4" },
			{ label: "Open publication", url: "https://bsenzio.github.io/portfolio/assets/pdf/Journals/IMI2025_01.pdf" }],
			description:
			"GoL NES Implementation"

        },	
	    {
            nonAI: false,
            fromScratch: true,
            title:"Stay Good: Barber Assault",
			year:"2026",
            image:"sgba.jpg",
            links:[{ label: "Open project", url: "https://bsenzio.github.io/TestStayGood/" }],
			description:
			"WebGL Implementation"

        },	
	    {
            nonAI: false,
            fromScratch: true,
            title:"Nara Adventure",
			year:"2026",
            image:"naraadventure.jpg",
			links:[{ label: "Open project", url: "https://bsenzio.github.io/portfolio/projects.html" }],
			description:
			"Game of Nara Prefecture for Local Festivals"

        },	
	    {
            nonAI: true,
            fromScratch: true,
            title:"PDO 3D",
			year:"2023",
            image:"pdo3d.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/VzqxILNy0ho" },
			{ label: "Open project", url: "https://youtu.be/rOK47AQa050?si=SvaBNDeiUAVHA6ar" }],
			description:
			"Mexican 3D Politics game"

        },	
	
	    {
            nonAI: true,
            fromScratch: true,
            title:"PDO 2D",
			year:"2023",
            image:"pdo.jpg",
            links:[{ label: "Open project", url: "https://www.youtube.com/watch?v=BKFJajgmsUY" }],
			description:
			"Mexican 2D retro type game"

        },
        {
            nonAI: true,
            fromScratch: true,
            title:"Ganbare Shisa",
			year:"2015",
            image:"shisablender.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/ENqnNoTl6a4" }],
			description:
			"Small Blender Animation Drafting"

        },
        {
            nonAI: true,
            fromScratch: true,
            title:"8-bit Trouble",
			year:"2011",
            image:"8_bit_trouble.jpg",
            links:[{ label: "Open project", url: "https://youtu.be/TFJNJK4z_fE?si=UcRHCHUPbZp82q-7" }],
			description:
			"Fusion begins 2012, all your base are belong to us!!"

        }
    ]
}

];


// Creator declarations, displayed only when explicitly enabled.
function getProjectBadges(project) {
    const badges = [];
    if (project.nonAI === true) badges.push({
        key: 'non-ai', label: 'NON-AI', symbol: '★', color: '#f2d68a',
        description: "Created without AI assistance, using the creator's own ideas, knowledge, and skills."
    });
    if (project.fromScratch === true) badges.push({
        key: 'from-scratch', label: 'From scratch', symbol: '◆', color: '#8debdc',
        description: "Designed and developed from the ground up by its creator, rather than adapted from a prebuilt project or template."
    });
    return badges;
}

function createProjectBadges(project, compact = false) {
    const badges = getProjectBadges(project);
    if (!badges.length) return null;
    const group = document.createElement('div');
    group.className = 'obs-creator-badges';
    Object.assign(group.style, {display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '12px 0', minWidth: '0'});
    badges.forEach(badge => {
        const item = document.createElement('div');
        item.className = `obs-creator-badge obs-creator-badge--${badge.key}`;
        Object.assign(item.style, {
            border: `1px solid ${badge.color}66`, borderRadius: '10px',
            padding: compact ? '5px 9px' : '10px 12px',
            background: `${badge.color}0d`, color: badge.color,
            maxWidth: '100%', boxSizing: 'border-box',
            flex: compact ? '0 1 auto' : '1 1 180px', textAlign: 'left'
        });
        item.title = badge.description;
        const heading = document.createElement('span');
        Object.assign(heading.style, {display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '.06em'});
        const icon = document.createElement('span');
        icon.textContent = badge.symbol;
        icon.setAttribute('aria-hidden', 'true');
        heading.append(icon, document.createTextNode(` ${badge.label}`));
        item.append(heading);
        if (!compact) {
            const description = document.createElement('span');
            description.textContent = badge.description;
            Object.assign(description.style, {display: 'block', fontSize: '12px', lineHeight: '1.55', marginTop: '6px', color: '#c8d2df', overflowWrap: 'anywhere'});
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
        : [{ label: "Open project", url: project.url }];
    return entries.flatMap((entry, index) => {
        if (!entry || typeof entry.url !== 'string') return [];
        const value = entry.url.trim();
        if (!value || value === 'l') return [];
        try {
            const parsed = new URL(value, document.baseURI);
            if (!['https:', 'http:'].includes(parsed.protocol)) return [];
            const label = typeof entry.label === 'string' && entry.label.trim()
                ? entry.label.trim() : `Link ${index + 1}`;
            return [{ label, url: parsed.href }];
        } catch { return []; }
    });
}

// Public helpers remain available to the home-page featured projects.
function getAllProjects() {
    return categories.flatMap(category => category.projects.map(project => ({...project, url: getProjectLinks(project)[0]?.url || "", category: category.name})));
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
    const count = key => projects.filter(project => project[key] === true).length;
    const nonAI = count('nonAI');
    const fromScratch = count('fromScratch');
    return {total, nonAI, usingAI: total - nonAI,
        fromScratch, nonScratch: total - fromScratch};
}
window.categories = categories; window.getProjectLinks = getProjectLinks; window.getAllProjects = getAllProjects; window.getRandomProjects = getRandomProjects; window.getCreatorSummary = getCreatorSummary;

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
        const filters = document.getElementById('categoryFilters');
        const status = document.getElementById('projectStatus');
        const creatorSummary = document.createElement('section');
        creatorSummary.className = 'obs-creator-summary';
        creatorSummary.setAttribute('aria-label', 'Project creation summary');
        Object.assign(creatorSummary.style, {
            gridColumn: '1 / -1', width: '100%', boxSizing: 'border-box',
            marginTop: '16px', padding: '0', borderRadius: '0', flexBasis: '100%',
            border: 'none', background: 'transparent', boxShadow: 'none',
            color: '#dce6ef', minWidth: '0', clear: 'both'
        });
        // Keep the counter and the selection/exploration legend together.
        // Append the summary after all existing text within their shared group.
        const summaryGroup = status.parentElement;
        if (getComputedStyle(summaryGroup).display.includes('flex')) {
            summaryGroup.style.flexWrap = 'wrap';
        }
        summaryGroup.append(creatorSummary);
        function renderCreatorSummary(matches) {
            const stats = getCreatorSummary(matches.map(row => row.project));
            creatorSummary.replaceChildren();
            const axes = [
                ['AI assistance', [['NON-AI', stats.nonAI, '#f2d68a'], ['Using AI', stats.usingAI, '#b3a0ef']]],
                ['Development origin', [['From scratch', stats.fromScratch, '#8debdc'], ['Non-scratch', stats.nonScratch, '#83b8f3']]]
            ];
            axes.forEach(([name, segments], index) => {
                const row = document.createElement('div');
                row.style.marginTop = index === 0 ? '0' : '16px';
                const label = document.createElement('div');
                label.textContent = name;
                Object.assign(label.style, {fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#a8b8cb'});
                const bar = document.createElement('div');
                bar.setAttribute('role', 'img');
                bar.setAttribute('aria-label', `${name}: ` + segments.map(([title, count]) => `${title} ${stats.total ? (count / stats.total * 100).toFixed(1) : '0'} percent, ${count} projects`).join('; '));
                Object.assign(bar.style, {display: 'flex', gap: '2px', height: '9px', borderRadius: '8px', overflow: 'hidden', background: '#253044'});
                const legend = document.createElement('div');
                Object.assign(legend.style, {display: 'flex', flexWrap: 'wrap', gap: '8px 24px', marginTop: '9px'});
                segments.forEach(([title, count, color]) => {
                    const percent = stats.total ? count / stats.total * 100 : 0;
                    if (count) {
                        const segment = document.createElement('span');
                        segment.title = `${title}: ${percent.toFixed(1)}% (${count}/${stats.total})`;
                        Object.assign(segment.style, {flex: `${count} 1 0`, minWidth: '0', background: color});
                        bar.append(segment);
                    }
                    const entry = document.createElement('span');
                    Object.assign(entry.style, {display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '12px'});
                    const dot = document.createElement('span');
                    Object.assign(dot.style, {width: '8px', height: '8px', flexShrink: '0', borderRadius: '50%', background: color});
                    entry.append(dot, document.createTextNode(`${title} ${percent.toFixed(1)}% · ${count}`));
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
            frameRequest = null; lastFrame = null;
        }
        function startOrbit() {
            if (frameRequest !== null || paused || reduced.matches || document.hidden || view !== 'map') return;
            frameRequest = requestAnimationFrame(animateOrbit);
        }
        function animateOrbit(timestamp) {
            frameRequest = null;
            if (paused || reduced.matches || document.hidden || view !== 'map') { lastFrame = null; return; }
            const dt = lastFrame === null ? 0 : Math.min((timestamp - lastFrame) / 1000, .05);
            lastFrame = timestamp;
            // Stop the orbital travel while someone is pointing or navigating by keyboard.
            const interacting = pointerInside || map.contains(document.activeElement);
            if (!interacting) orbitTime += dt;
            orbitWorlds.forEach(({node, angle, rx=34, ry=32, centerY=48, speed=.022}) => {
                const phase = angle + orbitTime * speed;
                node.style.left = `${50 + rx * Math.cos(phase)}%`;
                node.style.top = `${centerY + ry * Math.sin(phase)}%`;
            });
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
            node.addEventListener('pointerenter', event => {
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
            return rows.filter(row => selectedCategory === null || row.ci === selectedCategory);
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
        function renderFilters() {
            const activeElement = document.activeElement;
            const focusIndex = Array.from(filters.children).indexOf(activeElement);
            filters.replaceChildren();
            categories.forEach((category, index) => {
                const chip = button('obs-filter', '', () => selectCategory(selectedCategory === index ? null : index));
                chip.style.setProperty('--world-color',colors[index % colors.length]);
                chip.append(el('i'),document.createTextNode(category.name),el('span','',String(category.projects.length)));
                chip.setAttribute('aria-pressed',String(selectedCategory === index)); filters.append(chip);
            });
            if (focusIndex >= 0) filters.children[focusIndex]?.focus({preventScroll:true});
        }
        function renderMap(matches) {
            nodes.replaceChildren();
            orbitWorlds = [];
            const category = selectedCategory === null ? null : categories[selectedCategory];
            document.getElementById('mapBreadcrumb').textContent = category ? `SYSTEM / ${category.name.toUpperCase()}` : 'THE COMPLETE SYSTEM';
            const core = el('div','obs-core');
            const sun = el('span','obs-sun-surface');
            if (category) {
                core.classList.add('obs-category-core');
                core.style.setProperty('--core-color',colors[selectedCategory % colors.length]);
                sun.style.backgroundImage = `url("assets/images/planets/${category.texture}")`;
            }
            core.append(sun);
            core.append(el('small','',category ? 'CURRENT WORLD' : 'PROJECT SYSTEM'),el('strong','',category ? category.name : String(rows.length)),el('small','',category ? `${matches.length} projects` : 'PROJECTS · 6 WORLDS'));
            nodes.append(core);
            if (selectedCategory === null) {
                categories.forEach((cat, ci) => {
                    const angle = -Math.PI / 2 + ci * Math.PI * 2 / categories.length;
                    const world = button('obs-world','',() => selectCategory(ci));
                    world.style.left = `${50+34*Math.cos(angle+orbitTime*.022)}%`;
                    world.style.top = `${48+32*Math.sin(angle+orbitTime*.022)}%`;
                    world.style.setProperty('--spin-duration', `${35 + ci * 9}s`);
                    world.style.setProperty('--spin-delay', `${-ci * 7}s`);
                    orbitWorlds.push({node:world,angle});
                    world.style.setProperty('--world-color',colors[ci % colors.length]);
                    world.setAttribute('aria-label',`Explore ${cat.name}, ${cat.projects.length} projects`);
                    const globe = el('span','obs-globe');
                    const surface = el('span','obs-surface');
                    surface.style.backgroundImage = `url("assets/images/planets/${cat.texture}")`;
                    globe.append(surface);
                    world.append(globe,el('span','obs-world-label',cat.name),el('span','obs-world-count',`${cat.projects.length} projects`));nodes.append(world);
                });
                return;
            }
            matches.forEach((row, i) => {
                const angle = -Math.PI / 2 + i*Math.PI*2/Math.max(1,matches.length);
                // Use two rings when the category contains many projects.
                const radius = matches.length > 16 && i%2 ? 24 : 35;
                const node = button('obs-project-node','',() => selectProject(row));
                const speed=.035;
                const phase=angle+orbitTime*speed;
                node.style.left = `${50+radius*Math.cos(phase)}%`;node.style.top=`${49+radius*Math.sin(phase)}%`;
                orbitWorlds.push({node,angle,rx:radius,ry:radius,centerY:49,speed});
                node.style.setProperty('--project-spin',`${65+(i%7)*8}s`);
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
                const badges = createProjectBadges(row.project, true);
                if (badges) card.append(badges);
                collection.append(card);
            });
            if (!matches.length) collection.append(el('p','obs-no-results','No projects in this world. Return to All worlds.'));
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
                const badges = createProjectBadges(row.project);
                if (badges) inspector.append(badges);
                const links = getProjectLinks(row.project);
                if (links.length) {
                    const actions = el('div', 'obs-project-links');
                    // Keep long labels and any number of buttons inside the inspector.
                    Object.assign(actions.style, {
                        display: 'flex', flexWrap: 'wrap', gap: '10px',
                        margin: '16px 0', minWidth: '0'
                    });
                    links.forEach(({label, url}) => {
                        const link = el('a', 'obs-open-link', `${label} ↗`);
                        link.href = url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        Object.assign(link.style, {
                            maxWidth: '100%', whiteSpace: 'normal',
                            overflowWrap: 'anywhere', boxSizing: 'border-box', margin: '0'
                        });
                        addProjectSounds(link);
                        actions.append(link);
                    });
                    inspector.append(actions);
                } else inspector.append(el('p','', 'Project overview · no external link available.'));
            } else if (selectedCategory !== null) {
                inspector.append(el('div','obs-kicker',`WORLD ${String(selectedCategory+1).padStart(2,'0')}`),el('h3','',categories[selectedCategory].name),el('p','',intros[selectedCategory] || 'Explore this collection of projects.'));
            } else {
                inspector.append(el('div','obs-kicker','WELCOME, EXPLORER'),el('h3','','Different worlds. Shared curiosity.'),el('p','','Every world opens a different part of the portfolio. Select a planet to enter its constellation and discover its projects.'));
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
            if(!matches.length) list.append(el('p','obs-no-results','No projects in this world. Choose another world.'));
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
            startOrbit();
            status.textContent=`${matches.length} of ${rows.length} projects${selectedCategory===null ? ' · All worlds' : ' · '+categories[selectedCategory].name}`;
            renderCreatorSummary(matches);
        }
        document.getElementById('mapView').addEventListener('click',()=>{view='map';render();drawStars()});
        document.getElementById('cardsView').addEventListener('click',()=>{view='cards';stopOrbit();render()});
        function updateMotion(){
            root.classList.toggle('obs-paused',paused || reduced.matches);
            if(paused || reduced.matches) stopOrbit(); else startOrbit();
        }
        map.addEventListener('pointerenter',()=>{pointerInside=true;root.classList.add('obs-hovering')});
        map.addEventListener('pointerleave',()=>{pointerInside=false;root.classList.remove('obs-hovering');map.style.removeProperty('--light-x');map.style.removeProperty('--light-y')});
        map.addEventListener('pointermove', event=>{
            if(reduced.matches || paused) return;
            const rect=map.getBoundingClientRect();
            map.style.setProperty('--light-x',`${event.clientX-rect.left}px`);
            map.style.setProperty('--light-y',`${event.clientY-rect.top}px`);
        });
        document.addEventListener('visibilitychange',()=>{if(document.hidden)stopOrbit();else startOrbit()});
        reduced.addEventListener('change',()=>{paused=reduced.matches;updateMotion()});
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

})();

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
window.blogPosts = [
    {
        id: 1,
        slug: "ubr-action",
        defaultLanguage: "es",
        created: "2024-06-23", // Example date; replace with the actual date.
        featured: true,
        title: "UBR ACTION: El Despertar",
        image: "ubraction_logo.jpg",
        topic: "Crónicas",
        keywords: ["UBR Action", "Adventure", "Real Life"],
        excerpt: "Godín de día, Superhéroe de noche...",
        url: "blog.html#ubr-action",
        contentUrl: "assets/blog/stories/ubr-action.txt"
    },
    {
        id: 2,
        slug: "pdo-3d",
        defaultLanguage: "es",
        created: "2024-08-10", // Example date; replace with the actual date.
        featured: true,
        title: "Plurinominal de oposición (PDO)",
        image: "pdo_title.jpg",
        topic: "El tres de",
        keywords: ["PDO3D", "Games", "Pre-AI"],
        excerpt: "La historia mi chavo",
        url: "blog.html#pdo-3d",
        contentUrl: "assets/blog/stories/pdo-3d.txt"
    },
    {
        id: 3,
        slug: "srl-guy",
        defaultLanguage: "ja",
        created: "2017-07-11", // Example date; replace with the actual date.
        featured: true,
        title: "SRL Guy",
        image: "srl_guy.jpg",
        topic: "Going Supernumerary",
        keywords: ["Embedded Systems", "SRLs", "Japan"],
        excerpt: "Being Supernumerary Japanese",
        url: "blog.html#srl-guy",
        contentUrl: "assets/blog/stories/srl-guy.txt"
    },
    {
        id: 4,
        slug: "maputo",
        defaultLanguage: "en",
        created: "2026-10-23", // Example date; replace with the actual date.
        featured: true,
        title: "Maputo Fighters",
        image: "maputo_fighters.jpg",
        topic: "Fighting Games",
        keywords: ["Embedded Systems", "Games", "Entertainment", "Friendly Abroad", "Fighting Games"],
        excerpt: "Mozambique fighters yeah!",
        url: "blog.html#maputo-fighters",
        contentUrl: "assets/blog/stories/maputo-fighters.txt"
    },
    {
        id: 5,
        slug: "glasses",
        defaultLanguage: "en",
        created: "2026-07-10", // Example date; replace with the actual date.
        featured: true,
        title: "VaSenzios Holograph",
        image: "glass_holograph.jpg",
        topic: "Hologlasses",
        keywords: ["Invention", "Ideas", "Friendly Abroad"],
        excerpt: "An idea for holographic tech in your table...",
        url: "blog.html#glass-holograph",
        contentUrl: "assets/blog/stories/glass-holograph.txt"
    },
	
];

(() => {
    function initializeBlog() {
        const grid = document.getElementById("blogGrid");
        if (!grid) return; // This file can also be loaded by the home page.
        const listing = document.getElementById("blogListing");
        const search = document.getElementById("blogSearch");
        const topic = document.getElementById("blogTopic");
        const keywordFilter = document.getElementById("blogKeyword");
        const selectedKeywordsContainer = document.getElementById("blogSelectedKeywords");
        const selectedKeywords = new Set();
        const count = document.getElementById("blogCount");
        const languageFilter = document.getElementById("blogLanguage");
        const dateFrom = document.getElementById("blogDateFrom");
        const dateTo = document.getElementById("blogDateTo");
        const resetFilters = document.getElementById("blogResetFilters");
        const reader = document.getElementById("storyReader");
        const title = document.getElementById("storyTitle");
        const content = document.getElementById("storyContent");
        const cache = new Map();
        let version = 0;
        let listScroll = 0;
        let previousLink = null;
        let wasReading = false;
        const languageButton = document.getElementById("storyLanguage");
        const languageStatus = document.getElementById("translationStatus");
        const languages = ["es", "en", "ja"];
        const labels = { es: "Español", en: "English", ja: "日本語" };
        const translations = new Map();
        let activePost = null;
        let originalBlocks = null;
        let currentLanguage = "es";
        let translationController = null;
        function sourceLanguage(post) {
            const value = String(post.defaultLanguage || "es").trim().toLowerCase();
            return ({ español: "es", spanish: "es", english: "en", japanese: "ja", "日本語": "ja" })[value] ||
                (languages.includes(value) ? value : "es");
        }
        function languageState(language) {
            currentLanguage = language;
            reader.dataset.language = language;
            content.lang = language;
            languageButton.textContent = labels[language];
            const next = languages[(languages.indexOf(language) + 1) % languages.length];
            languageButton.setAttribute("aria-label", `Language: ${labels[language]}. Switch to ${labels[next]}`);
            languageButton.title = `Switch to ${labels[next]}`;
        }
        function showTranslationStatus(message = "") {
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
            try { return /\.txt$/i.test(new URL(post.contentUrl, document.baseURI).pathname); } catch { return false; }
        }
        async function translateText(text, source, target, signal) {
            if (!text || !text.trim()) return text;
            // Bound each URL and preserve every character, including long paragraphs.
            const characters = Array.from(text);
            const pieces = [];
            for (let i = 0; i < characters.length; i += 900) {
                const part = characters.slice(i, i + 900).join("");
                const params = new URLSearchParams({ client: "gtx", sl: source, tl: target, dt: "t", q: part });
                const response = await fetch("https://translate.googleapis.com/translate_a/single?" + params, { signal });
                if (!response.ok) throw new Error("Translation unavailable");
                const data = await response.json();
                if (!Array.isArray(data?.[0])) throw new Error("Invalid translation");
                const translated = data[0].map(item => typeof item?.[0] === "string" ? item[0] : "").join("");
                if (!translated) throw new Error("Empty translation");
                pieces.push(translated);
            }
            return pieces.join("");
        }
        languageButton?.addEventListener("click", async () => {
            if (!activePost || !originalBlocks || languageButton.disabled || !postIsTxt(activePost)) return;
            const request = version;
            const post = activePost;
            const source = sourceLanguage(post);
            const target = languages[(languages.indexOf(currentLanguage) + 1) % languages.length];
            const key = JSON.stringify([post.slug, source, target, post.title, post.excerpt, post.topic, originalBlocks]);
            translationController?.abort();
            const controller = new AbortController();
            translationController = controller;
            const timeout = setTimeout(() => controller.abort(), 90000);
            languageButton.disabled = true;
            reader.setAttribute("aria-busy", "true");
            showTranslationStatus("Translating…");
            try {
                let result = translations.get(key);
                if (!result) {
                    result = { title: post.title, excerpt: post.excerpt || "", topic: post.topic || "", blocks: structuredClone(originalBlocks) };
                    if (target !== source) {
                        for (const field of ["title", "excerpt"]) {
                            result[field] = await translateText(result[field], source, target, controller.signal);
                        }
                        for (const block of result.blocks) {
                            const fields = ["paragraph", "heading", "link"].includes(block.type) ? ["text"] : block.type === "image" ? ["alt", "caption"] : [];
                            for (const field of fields) {
                                if (typeof block[field] === "string") block[field] = await translateText(block[field], source, target, controller.signal);
                            }
                        }
                    }
                    translations.set(key, result);
                }
                if (request !== version) return;
                title.textContent = result.title;
                title.lang = target;
                const excerpt = document.getElementById("storyExcerpt");
                excerpt.textContent = result.excerpt;
                excerpt.lang = target;
                document.title = `${result.title} | Bruno Senzio-Savino`;
                languageState(target);
                renderContent(result.blocks);
                showTranslationStatus();
            } catch {
                if (request === version) showTranslationStatus("Translation unavailable. Click the language button to try again.");
            } finally {
                clearTimeout(timeout);
                if (request === version) {
                    reader.removeAttribute("aria-busy");
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
                return ["http:", "https:"].includes(url.protocol) ||
                    (image && url.protocol === "file:") ? url.href : null;
            } catch { return null; }
        }
        function validDate(value) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
            const date = new Date(value + "T12:00:00Z");
            return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
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
        function youtubeVideo(value) {
            try {
                const url = new URL(value);
                if (!['https:', 'http:'].includes(url.protocol)) return null;
                const host = url.hostname.toLowerCase();
                let id;
                if (host === 'youtu.be' || host === 'www.youtu.be') {
                    id = url.pathname.split('/')[1];
                } else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)) {
                    const parts = url.pathname.split('/').filter(Boolean);
                    if (parts[0] === 'watch') id = url.searchParams.get('v');
                    else if (['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1];
                }
                if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return null;
                return id;
            } catch { return null; }
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
                const trimmed = line.trim();
                const videoId = youtubeVideo(trimmed);
                // One image per line: ![Description](path "Optional caption")
                // Use <path> if a filename contains spaces or parentheses.
                const image = trimmed.match(/^!\[([^\]]*)\]\(\s*(?:<([^>]+)>|([^\s]+?))(?:\s+"([^"]*)")?\s*\)$/);
                if (!trimmed) flush();
                else if (videoId) {
                    flush();
                    blocks.push({ type: "youtube", videoId });
                } else if (image) {
                    flush();
                    blocks.push({
                        type: "image",
                        src: image[2] || image[3],
                        alt: image[1],
                        caption: image[4] || ""
                    });
                } else if (/^#{1,3}\s+/.test(line)) {
                    flush();
                    blocks.push({ type: "heading", text: line.replace(/^#{1,3}\s+/, "") });
                } else paragraph.push(line);
            });
            flush();
            return blocks;
        }
        const prev = document.getElementById("carouselPrev");
        const next = document.getElementById("carouselNext");
        const dots = document.getElementById("carouselDots");
        const position = document.getElementById("carouselPosition");
        // A fresh audio instance allows quick successive clicks without cutting off a sound.
        function playCarouselSound(file) {
            const audio = new Audio(`assets/audio/sfx/${file}`);
            audio.volume = 0.55;
            audio.play().catch(() => {});
        }
        for (const button of [prev, next]) {
            button.addEventListener("mouseenter", () => { if (!button.disabled) playCarouselSound("sfxhover.mp3"); });
            button.addEventListener("click", () => { if (!button.disabled) playCarouselSound("sfxclick.mp3"); });
        }
        const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
        function scheduleSparkle(card) {
            const delay = 800 + Math.random() * 6500;
            setTimeout(() => {
                if (!card.isConnected) return;
                if (!reducedMotion.matches && !document.hidden) {
                    const side = Math.floor(Math.random() * 4);
                    const along = 8 + Math.random() * 84;
                    const x = side === 0 ? 0 : side === 1 ? 100 : along;
                    const y = side === 2 ? 0 : side === 3 ? 100 : along;
                    card.style.setProperty("--spark-x", `${x}%`);
                    card.style.setProperty("--spark-y", `${y}%`);
                    card.style.setProperty("--spark-duration", `${(0.8 + Math.random() * 0.8).toFixed(2)}s`);
                    card.classList.remove("is-sparkling");
                    void card.offsetWidth;
                    card.classList.add("is-sparkling");
                }
                scheduleSparkle(card);
            }, delay);
        }
        grid.addEventListener("pointermove", event => {
            if (event.pointerType === "touch" || reducedMotion.matches) return;
            const card = event.target.closest(".story-card");
            if (!card || card.getAttribute("aria-hidden") === "true") return;
            const box = card.getBoundingClientRect();
            card.style.setProperty("--image-x", `${((event.clientX - box.left) / box.width - .5) * -10}px`);
            card.style.setProperty("--image-y", `${((event.clientY - box.top) / box.height - .5) * -7}px`);
        });
        grid.addEventListener("pointerout", event => {
            const card = event.target.closest(".story-card");
            if (card && !card.contains(event.relatedTarget)) {
                card.style.removeProperty("--image-x"); card.style.removeProperty("--image-y");
            }
        });
        let carouselIndex = 0;
        function updateCarousel() {
            const slides = [...grid.querySelectorAll(".story-card")];
            if (!slides.length) { prev.disabled = next.disabled = true; position.textContent = ""; dots.replaceChildren(); return; }
            carouselIndex = (carouselIndex + slides.length) % slides.length;
            prev.disabled = next.disabled = slides.length < 2;
            position.textContent = `${String(carouselIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
            const spacing = Math.min(grid.clientWidth * .31, 320);
            slides.forEach((slide, index) => {
                let offset = index - carouselIndex;
                const half = Math.floor(slides.length / 2);
                if (offset < -half) offset += slides.length;
                if (offset > half) offset -= slides.length;
                const distance = Math.abs(offset);
                const visible = distance <= 2;
                const scale = distance === 0 ? 1 : distance === 1 ? .82 : .65;
                const angle = offset === 0 ? 0 : (offset < 0 ? 1 : -1) * (distance === 1 ? 40 : 55);
                slide.style.transform = `translate(-50%, -50%) translateX(${offset * spacing}px) rotateY(${angle}deg) scale(${scale})`;
                slide.style.zIndex = String(Math.max(0, 10 - distance * 4));
                slide.style.opacity = !visible ? "0" : distance === 0 ? "1" : distance === 1 ? ".85" : ".45";
                slide.style.pointerEvents = visible ? "auto" : "none";
                slide.setAttribute("aria-hidden", String(offset !== 0));
                const link = slide.querySelector(".story-link");
                if (link) link.tabIndex = offset === 0 ? 0 : -1;
            });
            [...dots.children].forEach((dot, i) => dot.setAttribute("aria-current", String(i === carouselIndex)));
        }
        function goToStory(index) { carouselIndex = index; updateCarousel(); }
        prev.addEventListener("click", () => goToStory(carouselIndex - 1));
        next.addEventListener("click", () => goToStory(carouselIndex + 1));
        grid.addEventListener("click", event => {
            const slide = event.target.closest(".story-card");
            if (!slide) return;
            const index = [...grid.querySelectorAll(".story-card")].indexOf(slide);
            if (index !== carouselIndex) { event.preventDefault(); goToStory(index); }
        });
        grid.addEventListener("keydown", event => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); goToStory(carouselIndex + (event.key === "ArrowRight" ? 1 : -1)); }
        });
        let touchStartX = null;
        grid.addEventListener("touchstart", event => { touchStartX = event.touches[0].clientX; }, { passive:true });
        grid.addEventListener("touchend", event => {
            if (touchStartX === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(delta) > 45) goToStory(carouselIndex + (delta < 0 ? 1 : -1));
            touchStartX = null;
        }, { passive:true });
        window.addEventListener("resize", updateCarousel);
        function renderCards() {
            const query = search.value.trim().toLocaleLowerCase();
            const from = dateFrom?.value || "";
            const to = dateTo?.value || "";
            const invalidRange = Boolean(from && to && from > to);
            const matches = (post, ignored = "") => {
                const language = sourceLanguage(post);
                const created = validDate(post.created) ? post.created : "";
                const formattedDate = created ? new Intl.DateTimeFormat("en-US", {
                    year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
                }).format(new Date(created + "T12:00:00Z")) : "";
                const aliases = { es: "es español spanish", en: "en english inglés", ja: "ja 日本語 japanese japonés" };
                return !invalidRange &&
                    (ignored === "topic" || topic.value === "all" || post.topic === topic.value) &&
                    [...selectedKeywords].every(keyword => (post.keywords || []).includes(keyword)) &&
                    (ignored === "language" || !languageFilter || languageFilter.value === "all" || languageFilter.value === language) &&
                    (!from || (created && created >= from)) &&
                    (!to || (created && created <= to)) &&
                    [post.title, post.excerpt, post.topic, aliases[language], created, formattedDate, ...(post.keywords || [])]
                        .join(" ").toLocaleLowerCase().includes(query);
            };
            // Each menu shows availability under every other active filter.
            for (const [control, kind, values] of [
                [topic, "topic", post => [post.topic]],
                [keywordFilter, "keyword", post => post.keywords || []],
                [languageFilter, "language", post => [sourceLanguage(post)]]
            ]) {
                if (!control) continue;
                const available = new Set(blogPosts.filter(post => matches(post, kind)).flatMap(values));
                for (const option of control.options) {
                    option.disabled = option.value !== "all" && option.value !== "" && (kind === "keyword" ? selectedKeywords.has(option.value) || !available.has(option.value) : option.value !== control.value && !available.has(option.value));
                }
            }
            const filtered = blogPosts.filter(post => matches(post)).sort((a, b) => {
                // ISO dates sort chronologically; undated entries go last.
                const aDate = validDate(a.created) ? a.created : "";
                const bDate = validDate(b.created) ? b.created : "";
                return bDate.localeCompare(aDate) || (Number(b.id) || 0) - (Number(a.id) || 0);
            });
            grid.replaceChildren();
            dots.replaceChildren(); carouselIndex = 0; grid.scrollLeft = 0;
            count.textContent = invalidRange ? "The From date must be on or before the To date." : `${filtered.length} of ${blogPosts.length} stories`;
            filtered.forEach((post, index) => {
                const dot = document.createElement("button");
                dot.type = "button"; dot.setAttribute("aria-label", `Show story ${index + 1}: ${post.title}`);
                dot.addEventListener("click", () => goToStory(index)); dots.append(dot);
                const card = element("article", "story-card");
                card.dataset.language = sourceLanguage(post);
                scheduleSparkle(card);
                // Card metadata remains in the site language (English).
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
                    image.src = `assets/blog/titleimg/${post.image}`;
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
                body.append(element("span", "story-original-language", "Original language: " + labels[sourceLanguage(post)]));
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
            if (!filtered.length) grid.append(element("p", "blog-empty", "No stories match your filters. Try another keyword, language or date range."));
            updateCarousel();
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
                } else if (block.type === "youtube") {
                    const id = block.videoId;
                    if (!/^[A-Za-z0-9_-]{11}$/.test(id || "")) continue;
                    const figure = element("figure", "story-video");
                    const frame = document.createElement("iframe");
                    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&playsinline=1`;
                    frame.title = "YouTube video";
                    frame.loading = "lazy";
                    frame.width = "640";
                    frame.height = "360";
                    frame.style.cssText = "display:block;width:100%;height:auto;aspect-ratio:16/9;min-height:200px;border:0;border-radius:12px;background:#080e19;";
                    frame.allow = "encrypted-media; picture-in-picture; fullscreen";
                    frame.allowFullscreen = true;
                    frame.referrerPolicy = "strict-origin-when-cross-origin";
                    const caption = element("figcaption");
                    const link = element("a", "", "Watch on YouTube ↗");
                    link.href = `https://www.youtube.com/watch?v=${id}`;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    caption.append(link);
                    figure.append(frame, caption);
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
            translationController?.abort();
            activePost = null;
            originalBlocks = null;
            languageButton.disabled = true;
            reader.removeAttribute("aria-busy");
            showTranslationStatus();
            let slug;
            try { slug = decodeURIComponent(location.hash.slice(1)); }
            catch { slug = ""; }
            const post = blogPosts.find(item => item.slug === slug);
            if (!post) {
                const restore = wasReading;
                listing.hidden = false; reader.hidden = true;
                content.replaceChildren();
                document.title = "Blog | Bruno Senzio-Savino";
                wasReading = false;
                if (restore) {
                    previousLink?.focus({ preventScroll: true });
                    window.scrollTo(0, listScroll);
                }
                return;
            }
            activePost = post;
            const readerCover = document.getElementById("storyReaderCover");
            if (readerCover) {
                readerCover.replaceChildren();
                readerCover.hidden = true;
                if (post.image) {
                    const coverImage = document.createElement("img");
                    coverImage.alt = post.title || "Story cover";
                    coverImage.width = 520;
                    coverImage.height = 260;
                    coverImage.decoding = "async";
                    coverImage.addEventListener("load", () => {
                        if (readerCover.firstChild === coverImage) readerCover.hidden = false;
                    }, { once: true });
                    coverImage.addEventListener("error", () => {
                        if (readerCover.firstChild === coverImage) readerCover.hidden = true;
                    }, { once: true });
                    readerCover.append(coverImage);
                    coverImage.src = `assets/blog/titleimg/${post.image}`;
                }
            }
            languageButton.hidden = !postIsTxt(post);
            languageState(sourceLanguage(post));
            wasReading = true;
            listing.hidden = true; reader.hidden = false;
            title.textContent = post.title;
            title.lang = sourceLanguage(post);
            document.getElementById("storyExcerpt").lang = sourceLanguage(post);
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
                storyReady(Array.isArray(post.content) ? post.content : [], request);
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
                storyReady(blocks, request);
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
        [...new Set(blogPosts.flatMap(post => post.keywords || []).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b))
            .forEach(value => {
                const option = element("option", "", value);
                option.value = value; keywordFilter?.append(option);
            });
        function renderSelectedKeywords() {
            if (!selectedKeywordsContainer) return;
            selectedKeywordsContainer.replaceChildren();
            for (const keyword of selectedKeywords) {
                const button = element("button", "blog-keyword-chip", keyword + " ×");
                button.type = "button";
                button.setAttribute("aria-label", "Remove keyword " + keyword);
                button.addEventListener("click", () => {
                    selectedKeywords.delete(keyword);
                    renderSelectedKeywords();
                    renderCards();
                });
                selectedKeywordsContainer.append(button);
            }
        }
        keywordFilter?.addEventListener("change", () => {
            if (keywordFilter.value) selectedKeywords.add(keywordFilter.value);
            keywordFilter.value = "";
            renderSelectedKeywords();
            renderCards();
        });
        search.addEventListener("input", renderCards);
        topic.addEventListener("change", renderCards);
        for (const control of [languageFilter, dateFrom, dateTo]) control?.addEventListener("change", renderCards);
        resetFilters?.addEventListener("click", () => {
            search.value = "";
            topic.value = "all";
            selectedKeywords.clear();
            if (keywordFilter) keywordFilter.value = "";
            renderSelectedKeywords();
            if (languageFilter) languageFilter.value = "all";
            if (dateFrom) dateFrom.value = "";
            if (dateTo) dateTo.value = "";
            renderCards();
        });
        window.addEventListener("hashchange", route);
        renderCards(); route();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeBlog, { once: true });
    else initializeBlog();
})();

})();

// ---- js/home.js ----
(() => {
// Homepage: existing profile and skill carousel + Explorer Desk.
(() => {
function initializeHome() {

// Shared effects for carousel arrows, document downloads and game cartridges.
const homeHoverSound = new Audio('assets/audio/sfx/sfxhover.mp3');
const homeClickSound = new Audio('assets/audio/sfx/sfxclick.mp3');
homeHoverSound.preload = homeClickSound.preload = 'auto';
const homeSoundControls = '.carousel-btn, .lp-next, .document-button, .game-cartridge';
function playHomeSound(sound) {
    try {
        sound.currentTime = 0;
        const playback = sound.play();
        if (playback) playback.catch(() => {});
    } catch {
        // Audio availability must not interrupt downloads or game selection.
    }
}
document.addEventListener('pointerover', event => {
    if (event.pointerType === 'touch') return;
    const control = event.target.closest(homeSoundControls);
    if (!control || control.disabled) return;
    if (event.relatedTarget && control.contains(event.relatedTarget)) return;
    playHomeSound(homeHoverSound);
});
// Capture plays the effect before a cartridge or carousel action updates the page.
document.addEventListener('click', event => {
    const control = event.target.closest(homeSoundControls);
    if (!control || control.disabled) return;
    homeHoverSound.pause();
    playHomeSound(homeClickSound);
}, true);

// =========================
// PROFILE IMAGE ROTATION
// =========================

const profileImages = [
    "assets/images/profile.jpg",
    "assets/images/profile1.jpg",
    "assets/images/profile2.jpg",
    "assets/images/profile3.jpg",
    "assets/images/profile4.jpg",
    "assets/images/profile5.jpg"
];

const profilePhoto = document.documentElement.classList.contains("compact-home") ? null :
document.getElementById("profile-photo");

if(profilePhoto){

    let currentProfile = 0;

    setInterval(() => {

        currentProfile =
        (currentProfile + 1)
        % profileImages.length;

        profilePhoto.src =
        profileImages[currentProfile];

    }, 3000);

}


// =========================
// SKILL CAROUSEL
// =========================


const skillStage = document.querySelector('.skill-carousel-section .carousel-3d');
if (skillStage && !document.documentElement.classList.contains('compact-home')) {
 let skillIndex = 0;
 let skillSlides = Array.from(skillStage.querySelectorAll('.skill-slide'));
 const prev = document.getElementById('prevSkill');
 const next = document.getElementById('nextSkill');
 function updateSkills() {
  const count = skillSlides.length;
  if (count) skillIndex = ((skillIndex % count) + count) % count;
  const gap = Math.min(320, Math.max(70, skillStage.clientWidth * .34));
  skillSlides.forEach((slide, index) => {
   let offset = ((index - skillIndex) % count + count) % count;
   if (offset > count / 2) offset -= count;
   const visible = Math.abs(offset) <= 1;
   slide.classList.toggle('active', offset === 0);
   slide.style.left = '50%'; slide.style.top = '50%';
   slide.style.transition = 'transform .5s ease, opacity .5s ease';
   slide.style.transform = `translate(-50%,-50%) translateX(${offset * gap}px) rotateY(${-offset * 35}deg) scale(${offset === 0 ? 1 : .8})`;
   slide.style.opacity = visible ? (offset === 0 ? '1' : '.65') : '0';
   slide.style.visibility = visible ? 'visible' : 'hidden';
   slide.style.pointerEvents = offset === 0 ? 'auto' : 'none';
   slide.style.zIndex = offset === 0 ? '10' : '5';
  });
  [prev,next].forEach(button => { if(button) button.disabled = count < 2; });
 }
 prev?.addEventListener('click', () => { skillIndex--; updateSkills(); });
 next?.addEventListener('click', () => { skillIndex++; updateSkills(); });
 // Broken image files should not become empty carousel positions.
 skillSlides.forEach(slide => {
  const img = slide.querySelector('img');
  const removeBroken = () => {
   const active = skillSlides[skillIndex];
   skillSlides = skillSlides.filter(item => item !== slide);
   slide.hidden = true; slide.style.display = 'none';
   const retained = skillSlides.indexOf(active);
   skillIndex = retained >= 0 ? retained : 0;
   updateSkills();
  };
  if (img) {
   img.addEventListener('error', removeBroken, {once:true});
   if (img.complete && img.naturalWidth === 0) removeBroken();
  }
 });
 window.addEventListener('resize', updateSkills);
 updateSkills();
}


initializeDesk();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initializeHome,{once:true});
else initializeHome();

function initializeDesk() {
    const desk = document.querySelector('.launchpad');
    if (!desk || document.documentElement.classList.contains('compact-home')) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = false;
    let projectElapsed=0,blogElapsed=0,journeyElapsed=0;
    let timelineHover=false;
    let projectHover=false;
    function animatePanel(panel) {
        if (!motionPreference.matches && panel.animate) panel.animate(
            [{opacity:.3,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
            {duration:350,easing:'ease-out'});
    }
    function node(tag, cls, text) {
        const n=document.createElement(tag);
        if(cls)n.className=cls;
        if(text!==undefined)n.textContent=text;
        return n;
    }
    const milestone=document.getElementById('timelineContainer');
    const journey=document.getElementById('journeyStops');
    const journeyPanel=document.getElementById('journeySurface');
    const count=document.getElementById('careerCount');
    const events=typeof careerEvents!=='undefined'&&Array.isArray(careerEvents)?careerEvents:[];
    // Undated records remain preserved in timeline.js until their actual dates are supplied.
    const chapters=events.filter(e=>e.year).slice().sort((a,b)=>(a.date||a.year+'-00').localeCompare(b.date||b.year+'-00'));
    const years=[...new Set(chapters.map(e=>e.year))];
    let chapterIndex=0;
    let wheelTotal=0,lastWheel=0,dragY=null;
    function moveHistory(amount){
        if(!chapters.length)return;
        chapterIndex=(chapterIndex+amount+chapters.length)%chapters.length;
        journeyElapsed=0;showHistory(amount);
    }
    let reelPosition=0,reelTarget=0,reelFrame=null,reelLast=null;
    const reelCards=[];
    chapters.forEach((item,index)=>{
        const card=node('article','ct-reel-card');
        const dateLabel=item.date?new Intl.DateTimeFormat('en-US',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(item.date+'-01T12:00:00Z')):item.year;
        card.append(node('small','ct-reel-date',dateLabel+' / '+item.kind),node('h4','ct-reel-title',item.title),node('p','',item.description));
        if(item.link){
            const label=item.kind==='Projects'?'Explore Projects ↗':'View Publications ↗';
            const link=node('a','ct-scrolling-link');link.href=item.link;
            link.setAttribute('aria-label',label);
            const track=node('span','ct-link-track');
            track.append(node('span','',label));
            const duplicate=node('span','',label);duplicate.setAttribute('aria-hidden','true');
            track.append(duplicate);link.append(track);card.append(link);
        }
        card.addEventListener('click',event=>{if(index!==chapterIndex&&!event.target.closest('a')){chapterIndex=index;journeyElapsed=0;showHistory()}});
        milestone.append(card);reelCards.push(card);
    });
    function paintReel(){
        const total=chapters.length;
        if(!total)return;
        reelCards.forEach((card,index)=>{
            let offset=((index-reelPosition)%total+total)%total;
            if(offset>total/2)offset-=total;
            const distance=Math.abs(offset),visible=distance<3.1;
            card.style.visibility=visible?'visible':'hidden';
            card.style.pointerEvents=visible?'auto':'none';
            card.setAttribute('aria-hidden',String(index!==chapterIndex));
            card.inert=index!==chapterIndex;
            if(!visible)return;
            const angle=Math.max(-1.8,Math.min(1.8,offset*.6));
            const y=Math.sin(angle)*235;
            const z=(Math.cos(angle)-1)*160;
            const scale=Math.max(.48,1-distance*.16);
            card.style.transform=`translate(-50%,-50%) translate3d(0,${y}px,${z}px) rotateX(${-offset*23}deg) scale(${scale})`;
            card.style.opacity=String(Math.max(0,1-distance*.32));
            card.style.zIndex=String(Math.round(1000-distance*100));
            card.classList.toggle('ct-reel-active',index===chapterIndex);
        });
    }
    function animateReel(timestamp){
        reelFrame=null;
        const dt=reelLast===null?16:Math.min(50,timestamp-reelLast);reelLast=timestamp;
        reelPosition+=(reelTarget-reelPosition)*(1-Math.exp(-dt/145));
        if(Math.abs(reelTarget-reelPosition)<.001){reelPosition=reelTarget;reelLast=null;paintReel();return;}
        paintReel();reelFrame=requestAnimationFrame(animateReel);
    }
    function showHistory(){
        const event=chapters[chapterIndex];
        if(!event){milestone.append(node('p','lp-empty','The next chapter is on its way.'));return;}
        const currentWrapped=((Math.round(reelTarget)%chapters.length)+chapters.length)%chapters.length;
        let delta=chapterIndex-currentWrapped;
        if(delta>chapters.length/2)delta-=chapters.length;
        if(delta< -chapters.length/2)delta+=chapters.length;
        reelTarget+=delta;
        if(motionPreference.matches){if(reelFrame!==null)cancelAnimationFrame(reelFrame);reelFrame=null;reelPosition=reelTarget;paintReel()}
        else if(reelFrame===null&&Math.abs(reelPosition-reelTarget)>.001){reelLast=null;reelFrame=requestAnimationFrame(animateReel)}
        else paintReel();
        count.textContent=`${event.year} / ${event.kind} · ${chapterIndex+1} of ${chapters.length}`;
        journeyPanel.setAttribute('aria-label',`Career timeline: ${event.title}. Scroll, drag vertically or use up and down arrow keys.`);
        const yearIndex=years.indexOf(event.year);
        journey.style.setProperty('--year-position',`${years.length>1?yearIndex/(years.length-1)*100:0}%`);
        Array.from(journey.children).forEach((mark,i)=>mark.classList.toggle('ct-current',i===yearIndex));
    }
    years.forEach(year=>{
        const mark=node('button','ct-year-mark',year);mark.type='button';mark.setAttribute('aria-label','Explore '+year);
        mark.addEventListener('click',()=>{chapterIndex=chapters.findIndex(item=>item.year===year);journeyElapsed=0;showHistory()});journey.append(mark);
    });
    journey.addEventListener('pointermove',event=>{
        if(event.pointerType!=='mouse'||!years.length)return;
        const rect=journey.getBoundingClientRect();
        const yearIndex=Math.max(0,Math.min(years.length-1,Math.floor((event.clientX-rect.left)/rect.width*years.length)));
        if(chapters[chapterIndex]?.year!==years[yearIndex]){chapterIndex=chapters.findIndex(item=>item.year===years[yearIndex]);journeyElapsed=0;showHistory()}
    });
    journeyPanel.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')timelineHover=true});
    journeyPanel.addEventListener('pointerleave',()=>{timelineHover=false});
    milestone.addEventListener('wheel',event=>{
        if(chapters.length<2)return;
        event.preventDefault();
        wheelTotal+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?400:1);
        const now=performance.now();
        if(Math.abs(wheelTotal)>=35&&now-lastWheel>=230){moveHistory(wheelTotal>0?1:-1);wheelTotal=0;lastWheel=now;}
    },{passive:false});
    milestone.addEventListener('pointerdown',event=>{
        if(event.button!==undefined&&event.button!==0)return;
        if(event.target.closest('a,button'))return;
        dragY=event.clientY;milestone.setPointerCapture?.(event.pointerId);timelineHover=true;
    });
    milestone.addEventListener('pointermove',event=>{
        if(dragY===null)return;
        const distance=dragY-event.clientY;
        if(Math.abs(distance)>=55){moveHistory(distance>0?1:-1);dragY=event.clientY;}
    });
    function endDrag(event){dragY=null;timelineHover=event.pointerType==='mouse'&&journeyPanel.matches(':hover');}
    milestone.addEventListener('pointerup',endDrag);milestone.addEventListener('pointercancel',()=>{dragY=null;timelineHover=false});
    journeyPanel.addEventListener('keydown',event=>{
        if(event.target.closest('a,button'))return;
        if(!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
        event.preventDefault();
        if(event.key==='Home'||event.key==='End'){chapterIndex=event.key==='Home'?0:chapters.length-1;journeyElapsed=0;showHistory();}
        else moveHistory(event.key==='ArrowDown'?1:-1);
    });
    showHistory();

    const lenses=document.getElementById('projectLenses');
    const feature=document.getElementById('featuredProjects');
    const position=document.getElementById('projectPosition');
    const next=document.getElementById('nextDiscovery');
    const source=typeof categories!=='undefined'&&Array.isArray(categories)?categories:[];
    let picks=[];
    // A small curated preview, not a second full project catalogue.
    source.forEach(category=>{
        const sorted=(category.projects||[]).slice().sort((a,b)=>Number(b.year||0)-Number(a.year||0));
        const featured=sorted.filter(p=>p.featured);
        (featured.length?featured:sorted.slice(0,2)).forEach(p=>picks.push({...p,category:category.name}));
    });
    if(!picks.length&&typeof projects!=='undefined'&&Array.isArray(projects)){
        const marked=projects.filter(p=>p.featured);
        picks=(marked.length?marked:projects.slice(0,6)).map(p=>({...p,category:p.category||'Selected work'}));
    }
    let lens='All',projectIndex=0;
    const lensValues=['All',...new Set(picks.map(p=>p.category))];
    const filtered=()=>picks.filter(p=>lens==='All'||p.category===lens);
    function showProject(){
        const items=filtered();projectIndex=items.length?projectIndex%items.length:0;
        feature.replaceChildren();
        Array.from(lenses.children).forEach((b,i)=>b.setAttribute('aria-pressed',String(lensValues[i]===lens)));
        next.disabled=items.length<=2;
        if(!items.length){feature.append(node('p','lp-empty','Explore the full collection in Projects.'));position.textContent='WORK IN PROGRESS';return;}
        for(let offset=0;offset<Math.min(2,items.length);offset++){
            const item=items[(projectIndex+offset)%items.length];
            const row=node('article','lp-project-row');
            const cover=node('div','lp-project-image');
            if(item.image){
                const img=node('img');img.alt=item.title;img.loading='lazy';img.decoding='async';img.src='assets/images/projects/'+item.image;
                img.addEventListener('error',()=>img.remove(),{once:true});cover.append(img);
            }
            cover.append(node('span','lp-project-tag',`${item.category}${item.year?' / '+item.year:''}`));
            const body=node('div','lp-project-abstract');body.append(node('h4','',item.title),node('p','',item.description||item.shortDescription||''));
            const link=node('a','lp-project-open','Explore ↗');link.href='projects.html';body.append(link);row.append(cover,body);feature.append(row);
        }
        animatePanel(feature);
        position.textContent=`${projectIndex+1}–${(projectIndex+Math.min(2,items.length)-1)%items.length+1} / ${items.length}`;
    }
    lensValues.forEach(value=>{
        const b=node('button','lp-lens',value);b.type='button';
        b.addEventListener('click',()=>{lens=value;projectIndex=0;projectElapsed=0;showProject()});lenses.append(b);
    });
    next.addEventListener('click',()=>{projectIndex+=2;projectElapsed=0;showProject()});showProject();

    const journal=document.getElementById('featuredBlog');
    const posts=typeof blogPosts!=='undefined'&&Array.isArray(blogPosts)?blogPosts:[];
    const latest=posts.map((post,i)=>({post,i})).sort((a,b)=>String(b.post.created||'').localeCompare(String(a.post.created||''))||b.i-a.i).slice(0,3);
    let blogIndex=0;
    function blogImage(post,cls) {
        const img=node('img',cls);img.alt='';img.loading='lazy';img.decoding='async';img.src='assets/blog/titleimg/'+post.image;
        img.addEventListener('error',()=>img.remove(),{once:true});return img;
    }
    function showBlog(){
        journal.replaceChildren();
        const active=latest[blogIndex]?.post;
        if(!active){journal.append(node('p','lp-empty','New stories are on their way.'));return;}
        const story=node('a','lp-blog-spotlight');story.href='blog.html#'+encodeURIComponent(active.slug||'');
        const screen=node('div','lp-blog-screen');
        if(active.image)screen.append(blogImage(active,'lp-blog-photo'));
        else screen.append(node('span','lp-cover-fallback','STORY SELECT'));
        screen.append(node('span','lp-story-chip',`STORY ${String(blogIndex+1).padStart(2,'0')} / ${String(latest.length).padStart(2,'0')}`));
        story.append(screen);
        if(active.created){const time=node('time','',active.created);time.dateTime=active.created;story.append(time)}
        story.append(node('h4','',active.title),node('p','',active.excerpt||''),node('span','lp-blog-read','Read the story ↗'));
        journal.append(story);
        const queue=node('div','lp-blog-queue');
        latest.forEach(({post},i)=>{
            const b=node('button','lp-blog-pick');b.type='button';b.setAttribute('aria-pressed',String(i===blogIndex));
            if(post.image)b.append(blogImage(post,''));
            b.append(node('span','',String(i+1).padStart(2,'0')),document.createTextNode(post.title));
            b.addEventListener('click',()=>{blogIndex=i;blogElapsed=0;showBlog()});queue.append(b);
        });
        journal.append(queue);animatePanel(story);
    }
    showBlog();

    // Hover pauses autoplay; navigation uses the button or keyboard.
    feature.setAttribute('tabindex','0');
    feature.setAttribute('role','group');
    feature.setAttribute('aria-label','Featured projects. Use Next discovery or the left and right arrow keys to explore.');
    feature.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')projectHover=true});
    feature.addEventListener('pointerleave',()=>{projectHover=false});
    feature.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight'].includes(event.key)||!filtered().length)return;
        event.preventDefault();projectIndex=(projectIndex+(event.key==='ArrowRight'?1:-1)+filtered().length)%filtered().length;projectElapsed=0;showProject();
    });
    const motionButton=null;
    const projectPanel=feature.closest('.lp-lab');
    const blogPanel=journal.closest('.lp-journal');
    function paused(){return userPaused||motionPreference.matches||document.hidden}
    function updateMotion(){
        if(motionButton){motionButton.textContent=userPaused?'Resume animation ▶':'Pause animation Ⅱ';motionButton.setAttribute('aria-pressed',String(userPaused));}
    }
    motionButton?.addEventListener('click',()=>{userPaused=!userPaused;updateMotion()});
    motionPreference.addEventListener('change',()=>{userPaused=motionPreference.matches;updateMotion()});
    const meters={
        project:null,
        blog:document.getElementById('blogTimer'),
        journey:null
    };
    function progress(meter,elapsed,duration,enabled){
        if(!meter)return;
        meter.style.setProperty('--timer-progress',`${enabled?Math.min(100,elapsed/duration*100):0}%`);
    }
    let last=performance.now();
    setInterval(()=>{
        const now=performance.now(),dt=Math.min(now-last,500);last=now;
        if(!paused()){
            // No whole-section hover pause: the mouse timeline cannot stop the other panels.
            if(!projectHover&&!projectPanel?.querySelector(':focus-visible')&&document.activeElement!==feature){
                projectElapsed+=dt;
                if(projectElapsed>=7000){projectElapsed=0;if(filtered().length>2){projectIndex+=2;showProject()}}
            }
            if(!blogPanel?.querySelector(':focus-visible')){
                blogElapsed+=dt;
                if(blogElapsed>=9000){blogElapsed=0;if(latest.length>1){blogIndex=(blogIndex+1)%latest.length;showBlog()}}
            }
            if(!timelineHover&&!journeyPanel.contains(document.activeElement)&&document.activeElement!==journeyPanel){
                journeyElapsed+=dt;
                if(journeyElapsed>=6000){journeyElapsed=0;if(chapters.length>1){chapterIndex=(chapterIndex+1)%chapters.length;showHistory(1)}}
            }
        }
        progress(meters.project,projectElapsed,7000,filtered().length>1);
        progress(meters.blog,blogElapsed,9000,latest.length>1);
        const countdown=document.getElementById('blogCountdown');
        if(countdown)countdown.textContent=String(Math.max(1,Math.ceil((9000-blogElapsed)/1000)));
        progress(meters.journey,journeyElapsed,6000,chapters.length>1);
    },100);
    updateMotion();
}
})();

})();

// ---- inline ----
(() => {
(() => {
 const track=document.getElementById('cartridge-track');
 if(!track) return;
 const originals=[...track.querySelectorAll('.game-cartridge')];
 const belt=document.createElement('div');belt.className='cartridge-belt';
 const group=document.createElement('div');group.className='cartridge-group';
 originals.forEach(item=>group.appendChild(item));belt.appendChild(group);
 const copy=group.cloneNode(true);copy.setAttribute('aria-hidden','true');
 copy.querySelectorAll('.game-cartridge').forEach((item,index)=>{
   item.tabIndex=-1;item.removeAttribute('role');item.removeAttribute('aria-label');
   item.addEventListener('click',()=>originals[index].click());
 });
 belt.appendChild(copy);track.replaceChildren(belt);
 const resize=()=>{
   const width=Math.max(track.clientWidth,originals.length*108+48);
   group.style.width=copy.style.width=width+'px';
 };
 if('ResizeObserver' in window)new ResizeObserver(resize).observe(track);
 window.addEventListener('resize',resize);resize();
})();
})();

// ---- inline ----
(() => {
(() => {
 const game=document.getElementById('game');
 if(!game) return;
 if(!game.hasAttribute('tabindex')) game.tabIndex=0;
 game.setAttribute('aria-label','NES emulator. Click to play; Escape releases arrow keys for page navigation.');
 let playing=false;
 const setPlaying=value=>{playing=value;document.body.classList.toggle('arcade-playing',value);};
 const activate=()=>{setPlaying(true);};
 game.addEventListener('pointerdown',activate);
 game.addEventListener('focusin',activate);
 document.addEventListener('pointerdown',event=>{if(!game.contains(event.target))setPlaying(false);},true);
 game.addEventListener('focusout',event=>{if(!game.contains(event.relatedTarget))setPlaying(false);});
 window.addEventListener('blur',()=>{setPlaying(false);});
 document.addEventListener('keydown',event=>{
   if(event.key==='Escape'){setPlaying(false);return;}
   const target=event.target;
   if(target && (target.isContentEditable || target.closest('input,textarea,select'))) return;
   if(playing && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(event.key)) {
     // Cancel browser scrolling while preserving keyboard events for EmulatorJS.
     event.preventDefault();
   }
 },{capture:true,passive:false});
 const previousStart=window.EJS_onGameStart;
 window.EJS_onGameStart=(...args)=>{
   if(typeof previousStart==='function')previousStart(...args);
   setPlaying(true);
 };
})();
})();

// ---- inline ----
(() => {
(() => {
 if(new URLSearchParams(location.search).get('unity')!=='staygood' || document.documentElement.classList.contains('compact-home')) return;
 const game=document.getElementById('game');
 const frame=document.createElement('iframe');frame.className='unity-arcade-frame';
 frame.title='Stay Good: Barber Assault — Unity WebGL';
 frame.src='unity/staygood/index.html';
 frame.allow='autoplay; fullscreen; gamepad';frame.allowFullscreen=true;
 game.replaceChildren(frame);
 document.querySelectorAll('.game-cartridge').forEach(c=>c.classList.toggle('selected-cartridge',!!c.dataset.link));
 document.querySelectorAll('.arcade-instruction-tape span').forEach(span=>{span.textContent='STAY GOOD · W: LOOK UP · A: MOVE LEFT · S: CROUCH · D: MOVE RIGHT · E / MOUSE 1: FIRE / USE TOOL · F: FORWARD DASH · 2: SHAMPOO JETPACK · SPACE: JUMP, TRIPLE JUMP & WALL CLIMB';});
 document.body.classList.add('arcade-playing');
})();
})();

// ---- inline ----
(() => {
(() => {
 const query=new URLSearchParams(location.search);
 const unity=query.get('unity')==='staygood';
 const rom=query.get('rom') || 'assets/roms/wamg.nes';
 const cartridge=[...document.querySelectorAll('.game-cartridge')].find(c=>unity?!!c.dataset.link:c.dataset.rom===rom);
 const title=unity?'Stay Good: Barber Assault':rom.endsWith('/wamg.nes')?'Where Are My Veggies?':cartridge?.alt || 'NES Arcade';
 const display=document.querySelector('.arcade-game-title');
 display.setAttribute('aria-label','Now playing: '+title);
 display.querySelectorAll('span').forEach(span=>{span.textContent=title.toUpperCase();});
})();
})();
