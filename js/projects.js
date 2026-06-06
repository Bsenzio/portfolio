// =====================================
// PROJECT GALAXY
// =====================================

const categories = [

{
    name:"XR",
    color:"#00bfff",
    radius:220,
    speed:0.30,

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
    color:"#b347ff",
    radius:320,
    speed:0.00020,

    projects:[

        {
            title:"Game of Life",
            image:"game_of_life_nintendo.jpg",
            url:"gol.html"
        }

    ]
},

{
    name:"Games",
    color:"#00ff99",
    radius:420,
    speed:0.00015,

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
document.getElementById(
    "orbitContainer"
);

const solarSystem =
document.querySelector(
    ".solar-system"
);

// =====================================
// STARS
// =====================================

for(let i=0;i<300;i++){

    const star =
    document.createElement("div");

    star.className =
    "star";

    star.style.left =
    Math.random()*100 + "vw";

    star.style.top =
    Math.random()*100 + "vh";

    star.style.opacity =
    Math.random();

    document.body.appendChild(
        star
    );

}

// =====================================
// ORBITS + SATELLITES
// =====================================

const satellites = [];

categories.forEach(category=>{

    // ORBIT

    const orbit =
    document.createElement("div");

    orbit.className =
    "orbit";

    orbit.style.width =
    `${category.radius * 2}px`;

    orbit.style.height =
    `${category.radius * 2}px`;

    orbit.style.borderColor =
    category.color;

    orbitContainer.appendChild(
        orbit
    );

    // LABEL

    const label =
    document.createElement("div");

    label.className =
    "orbit-label";

    label.textContent =
    category.name;

    label.style.color =
    category.color;

    orbitContainer.appendChild(
        label
    );

    // PROJECTS

    category.projects.forEach(
    (project,index)=>{

        const satellite =
        document.createElement(
            "div"
        );

        satellite.className =
        "satellite";

        satellite.innerHTML = `

            <img
                src="assets/projects/${project.image}"
                alt="${project.title}"
            >

            <div class="satellite-info">

                <h3>
                    ${project.title}
                </h3>

            </div>

        `;

        satellite.addEventListener(
        "mouseenter",
        ()=>{
            satellite.style.zIndex=999;
        });

        satellite.addEventListener(
        "mouseleave",
        ()=>{
            satellite.style.zIndex=1;
        });

        satellite.addEventListener(
        "click",
        ()=>{
            window.location.href =
            project.url;
        });

        orbitContainer.appendChild(
            satellite
        );

        satellites.push({

            element:satellite,

            radius:
            category.radius,

            speed:
            category.speed,

            angleOffset:
            (Math.PI*2 /
            category.projects.length)
            *
            index

        });

    });

});

// =====================================
// MOUSE ROTATION
// =====================================

let rotationX = 0;
let rotationY = 0;

document.addEventListener(
"mousemove",
e=>{

    const centerX =
    window.innerWidth/2;

    const centerY =
    window.innerHeight/2;

    rotationY =
    (e.clientX-centerX)
    * 0.015;

    rotationX =
    (e.clientY-centerY)
    * -0.008;

});

// =====================================
// ANIMATION
// =====================================

function animateGalaxy(){

    const t =
    performance.now() * 0.001;

    satellites.forEach(
    satellite=>{

        const angle =

            t *
            satellite.speed +

            satellite.angleOffset;

        const x =

            Math.cos(angle)
            *
            satellite.radius;

        const y =

            Math.sin(angle)
            *
            satellite.radius;

        satellite.element.style.left =

            `${600 + x - 60}px`;

        satellite.element.style.top =

            `${600 + y - 60}px`;

    });

    solarSystem.style.transform = `

        rotateX(${rotationX}deg)
        rotateZ(${rotationY}deg)

    `;

	requestAnimationFrame(
		animateGalaxy
	);

}

animateGalaxy();