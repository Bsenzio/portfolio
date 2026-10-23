// Home rendering and carousel controllers: one initialization, isolated scope.
(() => {
function initializeHome() {

const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const career = document.getElementById('timelineContainer');
if (career && typeof timelineData !== 'undefined' && Array.isArray(timelineData)) {
 career.innerHTML = timelineData.map(item => `<div class="timeline-slide"><span class="year">${escapeHTML(item.year)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></div>`).join('');
}
const featuredContainer = document.getElementById('featuredProjects');
if (featuredContainer && typeof projects !== 'undefined' && Array.isArray(projects)) {
 const featured = projects.filter(item => item && item.featured);
 if (featured.length) featuredContainer.innerHTML = featured.map(item => `<div class="project-slide">${item.image ? `<img src="assets/projects/${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" class="featured-project-image">` : ''}<h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.shortDescription || '')}</p></div>`).join('');
}
const blogContainer = document.getElementById('featuredBlog');
if (blogContainer && typeof blogPosts !== 'undefined' && Array.isArray(blogPosts)) {
 blogContainer.innerHTML = blogPosts.filter(item => item && item.featured).map(item => `<div class="blog-slide"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.excerpt || '')}</p></div>`).join('');
}
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


const skillStage = document.querySelector('.skill-carousel-section .carousel-3d');
if (skillStage) {
 let skillIndex = 0;
 let skillSlides = Array.from(skillStage.querySelectorAll('.skill-slide'));
 const prev = document.getElementById('prevSkill');
 const next = document.getElementById('nextSkill');
 function updateSkills() {
  const count = skillSlides.length;
  if (count) skillIndex = ((skillIndex % count) + count) % count;
  const gap = Math.min(320, Math.max(70, skillStage.clientWidth * .34));
  skillSlides.forEach((slide, index) => {
   let offset = ((index - skillIndex) % count + count) % count;
   if (offset > count / 2) offset -= count;
   const visible = Math.abs(offset) <= 1;
   slide.classList.toggle('active', offset === 0);
   slide.style.left = '50%'; slide.style.top = '50%';
   slide.style.transition = 'transform .5s ease, opacity .5s ease';
   slide.style.transform = `translate(-50%,-50%) translateX(${offset * gap}px) rotateY(${-offset * 35}deg) scale(${offset === 0 ? 1 : .8})`;
   slide.style.opacity = visible ? (offset === 0 ? '1' : '.65') : '0';
   slide.style.visibility = visible ? 'visible' : 'hidden';
   slide.style.pointerEvents = offset === 0 ? 'auto' : 'none';
   slide.style.zIndex = offset === 0 ? '10' : '5';
  });
  [prev,next].forEach(button => { if(button) button.disabled = count < 2; });
 }
 prev?.addEventListener('click', () => { skillIndex--; updateSkills(); });
 next?.addEventListener('click', () => { skillIndex++; updateSkills(); });
 // Broken image files should not become empty carousel positions.
 skillSlides.forEach(slide => {
  const img = slide.querySelector('img');
  const removeBroken = () => {
   const active = skillSlides[skillIndex];
   skillSlides = skillSlides.filter(item => item !== slide);
   slide.hidden = true; slide.style.display = 'none';
   const retained = skillSlides.indexOf(active);
   skillIndex = retained >= 0 ? retained : 0;
   updateSkills();
  };
  if (img) {
   img.addEventListener('error', removeBroken, {once:true});
   if (img.complete && img.naturalWidth === 0) removeBroken();
  }
 });
 window.addEventListener('resize', updateSkills);
 updateSkills();
}

const timelineSlides =
document.querySelectorAll("#timelineContainer .timeline-slide");

let timelineCurrent = 0;

function updateTimeline(){

    timelineSlides.forEach((slide,index)=>{

        let offset =
        index - timelineCurrent;

        if(offset < -Math.floor(timelineSlides.length / 2))
            offset += timelineSlides.length;

        if(offset > Math.floor(timelineSlides.length / 2))
            offset -= timelineSlides.length;

        if(offset === 0){

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateY(0px)
            scale(1)
            `;

            slide.style.opacity = 1;
            slide.style.zIndex = 10;
        }

        else if(offset === -1){

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateY(-180px)
            scale(.8)
            `;

            slide.style.opacity = .5;
            slide.style.zIndex = 5;
        }

        else if(offset === 1){

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateY(180px)
            scale(.8)
            `;

            slide.style.opacity = .5;
            slide.style.zIndex = 5;
        }

        else{

            slide.style.opacity = 0;
            slide.style.zIndex = 0;

            slide.style.transform =
            `
            translate(-50%,-50%)
            translateY(${offset*400}px)
            scale(.5)
            `;
        }

    });

}

document
.getElementById("nextTimeline")
?.addEventListener("click",()=>{

    if (!timelineSlides.length) return;

    timelineCurrent =
    (timelineCurrent+1)
    % timelineSlides.length;

    updateTimeline();
});

document
.getElementById("prevTimeline")
?.addEventListener("click",()=>{

    if (!timelineSlides.length) return;

    timelineCurrent =
    (timelineCurrent-1+timelineSlides.length)
    % timelineSlides.length;

    updateTimeline();
});





function createSimpleSlider(slideClass, prevId, nextId, containerSelector) {
    const previous = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    const container = containerSelector
        ? document.querySelector(containerSelector)
        : previous?.closest('.dashboard-column');

    if (!container) return;

    let currentSlide = null;
    let position = 0;

    function getSlides() {
        // Read the current DOM, including cards inserted after page load.
        return Array.from(container.querySelectorAll(slideClass))
            .filter(slide => slide.textContent.trim() ||
                slide.querySelector('img[src], video, iframe, canvas'));
    }

    function update(direction = 0) {
        const items = getSlides();
        const oldIndex = items.indexOf(currentSlide);
        if (oldIndex >= 0) position = oldIndex;
        position = items.length
            ? ((position + direction) % items.length + items.length) % items.length
            : 0;
        currentSlide = items[position] || null;

        items.forEach(slide => {
            const active = slide === currentSlide;
            slide.style.opacity = active ? '1' : '0';
            slide.style.transform = active ? 'translateY(0px)' : 'translateY(40px)';
            slide.style.zIndex = active ? '10' : '0';
            slide.style.pointerEvents = active ? 'auto' : 'none';
            slide.style.visibility = active ? 'visible' : 'hidden';
            slide.setAttribute('aria-hidden', String(!active));
        });

        [previous, next].forEach(button => {
            if (button) {
                button.disabled = items.length < 2;
                button.hidden = items.length < 2;
            }
        });
    }

    previous?.addEventListener('click', () => update(-1));
    next?.addEventListener('click', () => update(1));
    new MutationObserver(() => update()).observe(container, {
        childList: true,
        subtree: true
    });
    update();
}

function getAllProjects() {

    const allProjects = [];

    const sourceCategories = typeof categories !== "undefined" && Array.isArray(categories)
        ? categories : [];

    sourceCategories.forEach(category => {

        (category.projects || []).forEach(project => {

            allProjects.push({
                ...project,
                category: category.name
            });

        });

    });

    return allProjects;
}

function getRandomProjects(count = 3) {

    const projects =
    [...getAllProjects()];

    for(
        let i = projects.length - 1;
        i > 0;
        i--
    ){

        const j =
        Math.floor(
            Math.random() * (i + 1)
        );

        [projects[i], projects[j]] =
        [projects[j], projects[i]];
    }

    return projects.slice(0, count);
}

function loadFeaturedProjects() {

    const container =
    document.getElementById(
        "featuredProjects"
    );

    if(!container || container.querySelector(".project-slide")) return;

    const featured =
    getRandomProjects(3);

	container.innerHTML =
	featured.map(project => `

		<div class="project-slide">

			<img
				src="assets/images/projects/${project.image}"
				alt="${project.title}"
				class="featured-project-image"
			>

			<h3 class="featured-project-title">
				${project.title}
			</h3>

		</div>

	`).join("");
}

updateTimeline();

loadFeaturedProjects();

createSimpleSlider(
    ".project-slide",
    "prevProject",
    "nextProject",
    "#featuredProjects"
);

createSimpleSlider(
    ".blog-slide",
    "prevBlog",
    "nextBlog"
);


}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeHome, {once:true});
else initializeHome();
})();
