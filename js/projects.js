// =====================================
// DATA
// =====================================

const categories = [

{
    name:"XR",
    texture:"xr.jpg",
    orbitRadius:280,
    orbitSpeed:0.12,

    projects:[
        {
            title:"XR Interaction System",
            image:"assets/projects/xr_system.jpg",
            url:"xr.html"
        },
        {
            title:"MR Patent",
            image:"assets/projects/mixed_reality_patent.jpg",
            url:"mr_patent.html"
        }
    ]
},

{
    name:"AI",
    texture:"ai.jpg",
    orbitRadius:420,
    orbitSpeed:0.08,

    projects:[
        {
            title:"Game of Life",
            image:"game_of_life_nintendo.jpg",
            url:"gol.html"
        }
    ]
},

{
    name:"BCI",
    texture:"bci.jpg",
    orbitRadius:560,
    orbitSpeed:0.06,

    projects:[
        {
            title:"Vegetables Here Games There",
            image:"assets/projects/bci.jpg",
            url:"bci.html"
        }
    ]
},

{
    name:"Games",
    texture:"games.jpg",
    orbitRadius:700,
    orbitSpeed:0.04,

    projects:[
        {
            title:"Arcade Machine",
            image:"assets/projects/arcade.jpg",
            url:"arcade.html"
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
	largestPlanetRadius * 4
	+
	ring * 220;

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

		orbitRadiusX:
		radius,

		orbitRadiusY:
		radius * 0.35,

		orbitSpeed:
		0.05 +
		index * 0.01,

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

<img src="assets/projects/${project.image}">

<div class="satellite-info">

<h3>${project.title}</h3>

</div>

`;

moon.onclick=()=>{

window.location.href=
project.url;

};

orbitContainer.appendChild(
moon
);

moons.push({

    element:moon,

    planetIndex:index,

	radius:
	category.planetRadius * 1.8 +
	(pIndex * 60),

    speed:0.8,

    angleOffset:
    (Math.PI*2 /
    category.projects.length)
    *
    pIndex

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

    t *
    planet.orbitSpeed +

    planet.angleOffset;

    const x =
    Math.cos(
        orbitAngle
    )
    *
    planet.orbitRadiusX;

    const y =
    Math.sin(
        orbitAngle
    )
    *
    planet.orbitRadiusY;

    const z =
    Math.sin(
        orbitAngle
    )
    *
    400;

    planet.x = x;
    planet.y = y;

	planet.z = z;

	planet.mesh.position.set(
		x,
		y,
		z
	);

    const scale =
    THREE.MathUtils.mapLinear(

        z,

        -250,
        250,

        0.75,
        1.25

    );

    planet.mesh.scale.set(
        scale,
        scale,
        scale
    );
	
	planet.mesh.material.transparent =
	true;

	planet.mesh.material.opacity =
	THREE.MathUtils.mapLinear(

		z,

		-250,
		250,

		0.45,
		1

	);	

    planet.mesh.rotation.y +=
    0.01;

    labels[index].style.left =
    `${window.innerWidth/2 +
    x -
    planet.planetRadius/2}px`;

    labels[index].style.top =
    `${window.innerHeight/2 +
    y -
    planet.planetRadius -
    25}px`;
	
	labels[index].style.opacity =
	THREE.MathUtils.mapLinear(

		z,

		-400,
		400,

		0.2,
		1

	);	
	

});

// moons

moons.forEach(moon=>{

    const parent =
    planets[moon.planetIndex];

    const angle =

    t *
    moon.speed +

    moon.angleOffset;

    const moonOrbitX =
    moon.radius;

    const moonOrbitY =
    moon.radius * 0.45;

    const x =

    parent.x +

    Math.cos(angle)
    *
    moonOrbitX;

    const y =

    parent.y +

    Math.sin(angle)
    *
    moonOrbitY;

    const z =

    parent.z +

    Math.sin(angle)
    *
    80;

    const depthScale =
    THREE.MathUtils.mapLinear(

        z,

        -500,
        500,

        0.4,
        1.1

    );

    moon.element.style.opacity =
    THREE.MathUtils.mapLinear(

        z,

        -500,
        500,

        0.15,
        1

    );

    moon.element.style.transform =
    `scale(${depthScale})`;

    if(
        z < parent.z &&
        z < 0
    ){

        moon.element.style.display =
        "none";

    }
    else{

        moon.element.style.display =
        "block";

    }

    moon.element.style.left =
    `${window.innerWidth/2 + x - 40}px`;

    moon.element.style.top =
    `${window.innerHeight/2 + y - 40}px`;

});



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