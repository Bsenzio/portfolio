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
