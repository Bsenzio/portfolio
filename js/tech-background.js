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