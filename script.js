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

let currentProfile = 0;

const profilePhoto = document.getElementById("profile-photo");

setInterval(() => {

    currentProfile++;

    if(currentProfile >= profileImages.length){
        currentProfile = 0;
    }

    profilePhoto.src = profileImages[currentProfile];

}, 3000); // cambia cada 3 segundos


const slides =
document.querySelectorAll(".skill-slide");

let current = 0;

function updateCarousel(){

    slides.forEach((slide,index)=>{

        let offset =
        index-current;

        if(offset < -2)
            offset += slides.length;

        if(offset > 2)
            offset -= slides.length;

        if(offset === 0){

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateX(0px)
            scale(1)
            rotateY(0deg)
            `;

            slide.style.zIndex = 10;
            slide.style.opacity = 1;
        }

        else if(offset === -1){

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateX(-300px)
            rotateY(45deg)
            scale(.8)
            `;

            slide.style.zIndex = 5;
            slide.style.opacity = .8;
        }

        else if(offset === 1){

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateX(300px)
            rotateY(-45deg)
            scale(.8)
            `;

            slide.style.zIndex = 5;
            slide.style.opacity = .8;
        }

        else{

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateX(${offset*450}px)
            scale(.6)
            `;

            slide.style.zIndex = 1;
            slide.style.opacity = .2;
        }

    });

}

document
.getElementById("nextSkill")
.addEventListener("click",()=>{

    current =
    (current+1)%slides.length;

    updateCarousel();
});

document
.getElementById("prevSkill")
.addEventListener("click",()=>{

    current =
    (current-1+slides.length)
    %slides.length;

    updateCarousel();
});

updateCarousel();