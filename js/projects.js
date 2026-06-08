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
    texture:"ai.jpg",
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
    texture:"bci.jpg",
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

categories.forEach(category=>{

    category.planetRadius =
    Math.min(
        140,
        45 +
        Math.sqrt(
            category.projects.length
        ) * 25
    );

});


// =====================================
// REFERENCES
// =====================================

const orbitContainer =
document.getElementById("orbitContainer");

const projectPanel =
document.createElement("div");

projectPanel.id = "projectPanel";

projectPanel.innerHTML = `

<div class="panel-close">✕</div>

<div class="panel-content">

    <img id="panelImage">

    <div>

        <div id="panelYear"></div>

        <h2 id="panelTitle"></h2>

        <p id="panelDescription"></p>

        <a
            id="panelLink"
            target="_blank"
        >
            See more...
        </a>

    </div>

</div>

`;

document.body.appendChild(
    projectPanel
);

projectPanel
.querySelector(".panel-close")
.onclick = ()=>{

    selectedMoon = null;

    document
    .querySelectorAll(".satellite")
    .forEach(m=>m.classList.remove("focused"));

    projectPanel.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "project-open"
    );

};

// =====================================
// THREE.JS
// =====================================
const systemRadius = 550;
const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
5000
);

camera.position.z = 1200;

const renderer =
new THREE.WebGLRenderer({

    alpha:true,
    antialias:true

});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("galaxy3d")
.appendChild(renderer.domElement);

// =====================================
// LIGHTS
// =====================================

scene.add(
new THREE.AmbientLight(
0xffffff,
1.8
));

const pointLight =
new THREE.PointLight(
0xffffff,
2
);

pointLight.position.set(
0,
0,
500
);

scene.add(pointLight);

// =====================================
// TEXTURES
// =====================================

const loader =
new THREE.TextureLoader();

// =====================================
// GLOBAL STATS
// =====================================

const totalCategories =
categories.length;

const totalProjects =
categories.reduce(
    (sum,category)=>
    sum + category.projects.length,
    0
);


// =====================================
// CENTRAL PLANET
// =====================================

const largestPlanetRadius =
Math.max(
    ...categories.map(
        c => c.planetRadius
    )
);

const corePlanet =
new THREE.Mesh(

	new THREE.SphereGeometry(
		largestPlanetRadius * 2.2,
		64,
		64
	),

    new THREE.MeshStandardMaterial({

        map: loader.load(
            "assets/images/planets/planet_texture.jpg"
        )

    })

);

scene.add(corePlanet);

const coreLabel =
document.createElement("div");

coreLabel.className =
"core-label";

coreLabel.innerHTML = `

    <div class="core-title">

        PROJECT SYSTEM
		Selected picks

    </div>

    <div class="core-stats">

        ${totalCategories}
        Categories

        <br>

        ${totalProjects}
        Projects

    </div>

`;

orbitContainer.appendChild(
    coreLabel
);


// =====================================
// CATEGORY PLANETS
// =====================================

const planets = [];

const planetsPerRing = 6;

categories.forEach((category,index)=>{

    const ring =
    Math.floor(index / planetsPerRing);

    const posInRing =
    index % planetsPerRing;

	const radius =
	category.orbitRadius;

	const planetsInThisRing =
	Math.min(
		planetsPerRing,
		categories.length - ring * planetsPerRing
	);
    const angle =
    (Math.PI * 2 / planetsInThisRing)
    * posInRing;

    const x =
    Math.cos(angle) * radius;

    const y =
    Math.sin(angle) * radius;

    const mesh =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            category.planetRadius,
            64,
            64
        ),

        new THREE.MeshStandardMaterial({

            map: loader.load(
                `assets/images/planets/${category.texture}`
            )

        })

    );

    mesh.position.set(
        x,
        y,
        0
    );

    scene.add(mesh);

	planets.push({

		mesh,

		orbitRadius: radius,

		orbitSpeed:
		category.orbitSpeed,

		angleOffset:
		angle,

		x,
		y,

		planetRadius:
		category.planetRadius

	});

});

// =====================================
// SATELLITES HTML
// =====================================

const moons = [];

categories.forEach(
(category,index)=>{

category.projects.forEach(
(project,pIndex)=>{

const moon =
document.createElement("div");

moon.className =
"satellite";

moon.innerHTML = `

<img src="assets/images/projects/${project.image}">

<div class="satellite-info">

<h3>${project.title}</h3>

</div>

`;

moon.onclick=()=>{

    selectedMoon = moon;

    document
    .querySelectorAll(".satellite")
    .forEach(m=>m.classList.remove("focused"));

    moon.classList.add("focused");

    document
    .getElementById("panelImage")
    .src =
    `assets/images/projects/${project.image}`;

    document
    .getElementById("panelTitle")
    .textContent =
    project.title;

	document
	.getElementById(
		"panelYear"
	)
	.textContent =
	project.year;

    document
    .getElementById("panelDescription")
    .textContent =
    project.description;

    document
    .getElementById("panelLink")
    .href =
    project.url;

    document.body.classList.add(
        "project-open"
    );

    projectPanel.classList.add(
        "open"
    );

};

orbitContainer.appendChild(
moon
);

moons.push({

    element: moon,

    project,

    planetIndex: index,

    radius:
    category.planetRadius * 1.15,

    angleOffset:
    (Math.PI * 2 /
    category.projects.length)
    * pIndex,

    orbitSpeed: 0.8

});

moon.addEventListener(
"mouseenter",
()=>{

    moon.classList.add(
        "focused"
    );

});

moon.addEventListener(
"mouseleave",
()=>{

    moon.classList.remove(
        "focused"
    );

});


});

});

// =====================================
// LABELS
// =====================================

const labels = [];

categories.forEach(category=>{


const div =
document.createElement("div");

div.style.position="absolute";
div.style.color="white";
div.style.fontWeight="bold";
div.style.textShadow="0 0 10px cyan";

div.innerHTML = `

    <div class="category-title">

        ${category.name}

    </div>

    <div class="category-count">

        ${category.projects.length}
        Projects

    </div>

`;

orbitContainer.appendChild(
div
);

labels.push(div);

});

// =====================================
// ANIMATION
// =====================================
let selectedMoon = null;

function animate(){

requestAnimationFrame(
animate
);

const t =
performance.now()*0.001;

corePlanet.rotation.y +=
0.002;

coreLabel.style.left =
`${window.innerWidth/2 - 120}px`;

coreLabel.style.top =
`${window.innerHeight/2 - 60}px`;

// planets

// planets

planets.forEach(
(planet,index)=>{

	const orbitAngle =
	(t * planet.orbitSpeed) +
	planet.angleOffset;

    const x =
    Math.cos(
        orbitAngle
    )
    *
    planet.orbitRadius;
	
    const y =
    Math.sin(
        orbitAngle
    )
    *
    planet.orbitRadius;
	planet.currentAngle = orbitAngle;
    planet.x = x;
    planet.y = y;


	planet.mesh.position.set(
		x,
		y,
		0
	);

    planet.mesh.rotation.y +=
    0.01;

	labels[index].style.left =
	`${window.innerWidth/2 + x}px`;

	labels[index].style.top =
	`${window.innerHeight/2 -
	y -
	planet.planetRadius -
	40}px`;

	labels[index].style.transform =
	"translateX(-50%)";
	
	

});

// moons

moons.forEach(moon=>{

    if(
        selectedMoon === moon.element &&
        moon.frozenX !== undefined
    ){

        moon.element.style.left =
        `${moon.frozenX}px`;

        moon.element.style.top =
        `${moon.frozenY}px`;

        return;
    }

    const parent =
    planets[moon.planetIndex];

    const angle =
    (t * moon.orbitSpeed) +
    moon.angleOffset;

    const x =
    parent.x +
    Math.cos(angle) *
    moon.radius;

    const y =
    parent.y +
    Math.sin(angle) *
    moon.radius;

    const screenX =
    window.innerWidth/2 + x;

    const screenY =
    window.innerHeight/2 - y;

    moon.element.style.left =
    `${screenX}px`;

    moon.element.style.top =
    `${screenY}px`;

    moon.frozenX = screenX;
    moon.frozenY = screenY;

    if(
        moon.element.classList.contains(
            "focused"
        )
    ){

        moon.element.style.transform =
        "translate(-50%,-50%) scale(1.4)";

    }else{

        moon.element.style.transform =
        "translate(-50%,-50%)";
    }

});

if(
    selectedMoon &&
    projectPanel.classList.contains(
        "open"
    )
){

    const moonRect =
    selectedMoon.getBoundingClientRect();

    projectPanel.style.left =
    `${moonRect.right + 25}px`;

    projectPanel.style.top =
    `${moonRect.top - 40}px`;

    projectPanel.style.transform =
    "none";
}

renderer.render(
scene,
camera
);

}

animate();

// =====================================
// RESIZE
// =====================================

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});