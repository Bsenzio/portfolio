// =====================================
// DATA
// =====================================

const categories = [

{
    name:"XR",
    texture:"xr.jpg",
    orbitRadius:280,
    orbitSpeed:0.1,

    projects:[
		{
			title:"XR Interaction System",
			image:"xr_system.jpg",
			url:"xr.html",
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."
		},
        {
            title:"MR Patent",
            image:"mixed_reality_patent.jpg",
            url:"mr_patent.html",
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."

        }
    ]
},

{
    name:"AI",
    texture:"ai.jpg",
    orbitRadius:280,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Game of Life",
            image:"game_of_life_nintendo.jpg",
            url:"gol.html",
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."

        }
    ]
},

{
    name:"BCI",
    texture:"bci.jpg",
    orbitRadius:280,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Vegetables Here Games There",
            image:"bci.jpg",
            url:"bci.html",
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."

        }
    ]
},

{
    name:"Games",
    texture:"games.jpg",
    orbitRadius:280,
    orbitSpeed:0.1,

    projects:[
        {
            title:"Arcade Machine",
            image:"arcade.jpg",
            url:"arcade.html",
			description:
			"A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces."

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

        <h2 id="panelTitle"></h2>

        <p id="panelDescription"></p>

	<a
		id="panelLink"
		target="_blank"
	>
		Open Project
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

        PROJECT GALAXY

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
    category.planetRadius * 1.8 +
    (pIndex * 60),

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