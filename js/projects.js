// =====================================
// PROJECT GALAXY
// =====================================

const categories = [

{
    name:"XR",
    color:"#00bfff",
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
    color:"#b347ff",
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
    color:"#ff9933",
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
    color:"#00ff99",
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
// PLANETS + MOONS
// =====================================

const planets = [];
const moons = [];

categories.forEach(
(category,index)=>{

    // -------------------
    // PLANET
    // -------------------

    const planet =
    document.createElement("div");

    planet.className =
    "category-planet";

    planet.style.borderColor =
    category.color;

    planet.innerHTML = `

        <div
            class="planet-surface"
            style="
                background:${category.color};
            ">
        </div>

        <div class="planet-label">

            ${category.name}

        </div>

    `;

    orbitContainer.appendChild(
        planet
    );

    const planetData = {

        element:planet,

        radius:
        category.orbitRadius,

        speed:
        category.orbitSpeed,

        angleOffset:
        (Math.PI*2 /
        categories.length)
        *
        index,

        x:0,
        y:0

    };

    planets.push(
        planetData
    );

    // -------------------
    // MOONS
    // -------------------

    category.projects.forEach(
    (project,pIndex)=>{

        const moon =
        document.createElement(
            "div"
        );

        moon.className =
        "satellite";

        moon.innerHTML = `

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

        moon.addEventListener(
        "click",
        ()=>{

            window.location.href =
            project.url;

        });

        orbitContainer.appendChild(
            moon
        );

        moons.push({

            element:moon,

            parent:
            planetData,

            radius:
            110,

            speed:
            0.8,

            angleOffset:
            (Math.PI*2 /
            category.projects.length)
            *
            pIndex

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
    window.innerWidth / 2;

    const centerY =
    window.innerHeight / 2;

    rotationY =
    (e.clientX-centerX)
    * 0.01;

    rotationX =
    (e.clientY-centerY)
    * -0.005;

});

// =====================================
// ANIMATION
// =====================================

function animateGalaxy(){

    const t =
    performance.now()
    * 0.001;

    const centerX = 800;
    const centerY = 800;

    // -------------------
    // PLANETS
    // -------------------

    planets.forEach(
    planet=>{

        const angle =

            t *
            planet.speed +

            planet.angleOffset;

        planet.x =

            centerX +

            Math.cos(angle)
            *
            planet.radius;

        planet.y =

            centerY +

            Math.sin(angle)
            *
            planet.radius;

        planet.element.style.left =

            `${planet.x-50}px`;

        planet.element.style.top =

            `${planet.y-50}px`;

    });

    // -------------------
    // MOONS
    // -------------------

    moons.forEach(
    moon=>{

        const angle =

            t *
            moon.speed +

            moon.angleOffset;

        const x =

            moon.parent.x +

            Math.cos(angle)
            *
            moon.radius;

        const y =

            moon.parent.y +

            Math.sin(angle)
            *
            moon.radius;

        moon.element.style.left =

            `${x-60}px`;

        moon.element.style.top =

            `${y-60}px`;

    });

    solarSystem.style.transform =

        `rotateX(${rotationX}deg)
         rotateZ(${rotationY}deg)`;

    requestAnimationFrame(
        animateGalaxy
    );

}

animateGalaxy();