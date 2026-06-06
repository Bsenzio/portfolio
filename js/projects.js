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
            image:"xr_system.jpg",
            url:"xr.html"
        },
        {
            title:"MR Patent",
            image:"mixed_reality_patent.jpg",
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
            image:"bci.jpg",
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
            image:"arcade.jpg",
            url:"arcade.html"
        }
    ]
}

];

// =====================================
// REFERENCES
// =====================================

const orbitContainer =
document.getElementById("orbitContainer");

// =====================================
// THREE.JS
// =====================================

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
// CENTRAL PLANET
// =====================================

const corePlanet =
new THREE.Mesh(

new THREE.SphereGeometry(
120,
64,
64
),

new THREE.MeshStandardMaterial({

map:loader.load(
"assets/projects/planet_texture.jpg"
)

})

);

scene.add(corePlanet);

// =====================================
// CATEGORY PLANETS
// =====================================

const planets = [];

categories.forEach(
(category,index)=>{

const mesh =
new THREE.Mesh(

new THREE.SphereGeometry(
55,
64,
64
),

new THREE.MeshStandardMaterial({

map:loader.load(
`assets/planets/${category.texture}`
)

})

);

scene.add(mesh);

planets.push({

mesh,

radius:
category.orbitRadius,

speed:
category.orbitSpeed,

angleOffset:
(Math.PI*2 /
categories.length)
*
index

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

radius:110,

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

div.innerText =
category.name;

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

// planets

planets.forEach(
(planet,index)=>{

const angle =

t *
planet.speed +

planet.angleOffset;

const x =
Math.cos(angle)
*
planet.radius;

const y =
Math.sin(angle)
*
planet.radius;

planet.mesh.position.set(
x,
y,
0
);

planet.mesh.rotation.y +=
0.01;

// label

labels[index].style.left =
`${800+x-20}px`;

labels[index].style.top =
`${800+y-90}px`;

});

// moons

moons.forEach(
moon=>{

const parent =
planets[
moon.planetIndex
];

const angle =

t *
moon.speed +

moon.angleOffset;

const x =

parent.mesh.position.x +

Math.cos(angle)
*
moon.radius;

const y =

parent.mesh.position.y +

Math.sin(angle)
*
moon.radius;

moon.element.style.left =
`${800+x-60}px`;

moon.element.style.top =
`${800+y-60}px`;

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