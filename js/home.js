// =========================
// CAREER JOURNEY
// =========================

const timelineContainer =
document.getElementById(
    "timelineContainer"
);

timelineData.forEach(item=>{

    timelineContainer.innerHTML += `

        <div class="timeline-slide">

            <span class="year">
                ${item.year}
            </span>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.description}
            </p>

        </div>

    `;

});


// =========================
// PROJECTS
// =========================

const projectContainer =
document.getElementById(
    "featuredProjects"
);

projects
.filter(project=>project.featured)
.forEach(project=>{

    projectContainer.innerHTML += `

        <div class="project-slide">

            <img
            src="assets/projects/${project.image}">

            <h3>
                ${project.title}
            </h3>

            <p>
                ${project.shortDescription}
            </p>

        </div>

    `;

});


// =========================
// BLOG
// =========================

const blogContainer =
document.getElementById(
    "featuredBlog"
);

blogPosts
.filter(post=>post.featured)
.forEach(post=>{

    blogContainer.innerHTML += `

        <div class="blog-slide">

            <img
            src="assets/blog/${post.image}">

            <h3>
                ${post.title}
            </h3>

            <p>
                ${post.excerpt}
            </p>

        </div>

    `;

});