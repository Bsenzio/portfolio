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

const profilePhoto =
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

const slides =
document.querySelectorAll(".skill-slide");

let current = 0;

function updateCarousel(){

    slides.forEach((slide,index)=>{

        let offset =
        index - current;

        const half =
        Math.floor(slides.length / 2);

        if(offset < -half)
            offset += slides.length;

        if(offset > half)
            offset -= slides.length;

        slide.style.transition =
        "all .6s ease";

        // CENTER

        if(offset === 0){

            slide.style.transform = `
                translate(-50%,-50%)
                translateX(0px)
                scale(1)
                rotateY(0deg)
            `;

            slide.style.zIndex = "10";
            slide.style.opacity = "1";
        }

        // LEFT

        else if(offset === -1){

            slide.style.transform = `
                translate(-50%,-50%)
                translateX(-320px)
                rotateY(40deg)
                scale(.82)
            `;

            slide.style.zIndex = "6";
            slide.style.opacity = ".85";
        }

        // RIGHT

        else if(offset === 1){

            slide.style.transform = `
                translate(-50%,-50%)
                translateX(320px)
                rotateY(-40deg)
                scale(.82)
            `;

            slide.style.zIndex = "6";
            slide.style.opacity = ".85";
        }

        // FAR LEFT

        else if(offset === -2){

            slide.style.transform = `
                translate(-50%,-50%)
                translateX(-600px)
                rotateY(55deg)
                scale(.65)
            `;

            slide.style.zIndex = "2";
            slide.style.opacity = ".45";
        }

        // FAR RIGHT

        else if(offset === 2){

            slide.style.transform = `
                translate(-50%,-50%)
                translateX(600px)
                rotateY(-55deg)
                scale(.65)
            `;

            slide.style.zIndex = "2";
            slide.style.opacity = ".45";
        }

        // HIDDEN

        else{

            slide.style.transform = `
                translate(-50%,-50%)
                translateX(${offset * 900}px)
                scale(.4)
            `;

            slide.style.zIndex = "0";
            slide.style.opacity = "0";
        }

    });

}


// =========================
// BUTTONS
// =========================

const nextBtn =
document.getElementById("nextSkill");

const prevBtn =
document.getElementById("prevSkill");

if(nextBtn && prevBtn && slides.length){

    nextBtn.addEventListener("click",()=>{

        current =
        (current + 1)
        % slides.length;

        updateCarousel();
    });

    prevBtn.addEventListener("click",()=>{

        current =
        (current - 1 + slides.length)
        % slides.length;

        updateCarousel();
    });

    updateCarousel();
}