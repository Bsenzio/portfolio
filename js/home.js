// Homepage: existing profile and skill carousel + Explorer Desk.
(() => {
function initializeHome() {
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


initializeDesk();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initializeHome,{once:true});
else initializeHome();

function initializeDesk() {
    const desk = document.querySelector('.launchpad');
    if (!desk) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPaused = false;
    let projectElapsed=0,blogElapsed=0,journeyElapsed=0;
    let timelineHover=false;
    let projectHover=false;
    function animatePanel(panel) {
        if (!motionPreference.matches && panel.animate) panel.animate(
            [{opacity:.3,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
            {duration:350,easing:'ease-out'});
    }
    function node(tag, cls, text) {
        const n=document.createElement(tag);
        if(cls)n.className=cls;
        if(text!==undefined)n.textContent=text;
        return n;
    }
    const milestone=document.getElementById('timelineContainer');
    const journey=document.getElementById('journeyStops');
    const journeyPanel=document.getElementById('journeySurface');
    const count=document.getElementById('careerCount');
    const events=typeof careerEvents!=='undefined'&&Array.isArray(careerEvents)?careerEvents:[];
    // Undated records remain preserved in timeline.js until their actual dates are supplied.
    const chapters=events.filter(e=>e.year).slice().sort((a,b)=>(a.date||a.year+'-00').localeCompare(b.date||b.year+'-00'));
    const years=[...new Set(chapters.map(e=>e.year))];
    let chapterIndex=0;
    let wheelTotal=0,lastWheel=0,dragY=null;
    function moveHistory(amount){
        if(!chapters.length)return;
        chapterIndex=(chapterIndex+amount+chapters.length)%chapters.length;
        journeyElapsed=0;showHistory(amount);
    }
    let reelPosition=0,reelTarget=0,reelFrame=null,reelLast=null;
    const reelCards=[];
    chapters.forEach((item,index)=>{
        const card=node('article','ct-reel-card');
        const dateLabel=item.date?new Intl.DateTimeFormat('en-US',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(item.date+'-01T12:00:00Z')):item.year;
        card.append(node('small','ct-reel-date',dateLabel+' / '+item.kind),node('h4','ct-reel-title',item.title),node('p','',item.description));
        if(item.link){const link=node('a','',item.kind==='Projects'?'Explore Projects ↗':'View Publications ↗');link.href=item.link;card.append(link)}
        card.addEventListener('click',event=>{if(index!==chapterIndex&&!event.target.closest('a')){chapterIndex=index;journeyElapsed=0;showHistory()}});
        milestone.append(card);reelCards.push(card);
    });
    function paintReel(){
        const total=chapters.length;
        if(!total)return;
        reelCards.forEach((card,index)=>{
            let offset=((index-reelPosition)%total+total)%total;
            if(offset>total/2)offset-=total;
            const distance=Math.abs(offset),visible=distance<3.1;
            card.style.visibility=visible?'visible':'hidden';
            card.style.pointerEvents=visible?'auto':'none';
            card.setAttribute('aria-hidden',String(index!==chapterIndex));
            card.inert=index!==chapterIndex;
            if(!visible)return;
            const angle=Math.max(-1.8,Math.min(1.8,offset*.6));
            const y=Math.sin(angle)*235;
            const z=(Math.cos(angle)-1)*160;
            const scale=Math.max(.48,1-distance*.16);
            card.style.transform=`translate(-50%,-50%) translate3d(0,${y}px,${z}px) rotateX(${-offset*23}deg) scale(${scale})`;
            card.style.opacity=String(Math.max(0,1-distance*.32));
            card.style.zIndex=String(Math.round(1000-distance*100));
            card.classList.toggle('ct-reel-active',index===chapterIndex);
        });
    }
    function animateReel(timestamp){
        reelFrame=null;
        const dt=reelLast===null?16:Math.min(50,timestamp-reelLast);reelLast=timestamp;
        reelPosition+=(reelTarget-reelPosition)*(1-Math.exp(-dt/145));
        if(Math.abs(reelTarget-reelPosition)<.001){reelPosition=reelTarget;reelLast=null;paintReel();return;}
        paintReel();reelFrame=requestAnimationFrame(animateReel);
    }
    function showHistory(){
        const event=chapters[chapterIndex];
        if(!event){milestone.append(node('p','lp-empty','The next chapter is on its way.'));return;}
        const currentWrapped=((Math.round(reelTarget)%chapters.length)+chapters.length)%chapters.length;
        let delta=chapterIndex-currentWrapped;
        if(delta>chapters.length/2)delta-=chapters.length;
        if(delta< -chapters.length/2)delta+=chapters.length;
        reelTarget+=delta;
        if(motionPreference.matches){if(reelFrame!==null)cancelAnimationFrame(reelFrame);reelFrame=null;reelPosition=reelTarget;paintReel()}
        else if(reelFrame===null&&Math.abs(reelPosition-reelTarget)>.001){reelLast=null;reelFrame=requestAnimationFrame(animateReel)}
        else paintReel();
        count.textContent=`${event.year} / ${event.kind} · ${chapterIndex+1} of ${chapters.length}`;
        journeyPanel.setAttribute('aria-label',`Career timeline: ${event.title}. Scroll, drag vertically or use up and down arrow keys.`);
        const yearIndex=years.indexOf(event.year);
        journey.style.setProperty('--year-position',`${years.length>1?yearIndex/(years.length-1)*100:0}%`);
        Array.from(journey.children).forEach((mark,i)=>mark.classList.toggle('ct-current',i===yearIndex));
    }
    years.forEach(year=>{
        const mark=node('button','ct-year-mark',year);mark.type='button';mark.setAttribute('aria-label','Explore '+year);
        mark.addEventListener('click',()=>{chapterIndex=chapters.findIndex(item=>item.year===year);journeyElapsed=0;showHistory()});journey.append(mark);
    });
    journey.addEventListener('pointermove',event=>{
        if(event.pointerType!=='mouse'||!years.length)return;
        const rect=journey.getBoundingClientRect();
        const yearIndex=Math.max(0,Math.min(years.length-1,Math.floor((event.clientX-rect.left)/rect.width*years.length)));
        if(chapters[chapterIndex]?.year!==years[yearIndex]){chapterIndex=chapters.findIndex(item=>item.year===years[yearIndex]);journeyElapsed=0;showHistory()}
    });
    journeyPanel.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')timelineHover=true});
    journeyPanel.addEventListener('pointerleave',()=>{timelineHover=false});
    milestone.addEventListener('wheel',event=>{
        if(chapters.length<2)return;
        event.preventDefault();
        wheelTotal+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?400:1);
        const now=performance.now();
        if(Math.abs(wheelTotal)>=35&&now-lastWheel>=230){moveHistory(wheelTotal>0?1:-1);wheelTotal=0;lastWheel=now;}
    },{passive:false});
    milestone.addEventListener('pointerdown',event=>{
        if(event.button!==undefined&&event.button!==0)return;
        if(event.target.closest('a,button'))return;
        dragY=event.clientY;milestone.setPointerCapture?.(event.pointerId);timelineHover=true;
    });
    milestone.addEventListener('pointermove',event=>{
        if(dragY===null)return;
        const distance=dragY-event.clientY;
        if(Math.abs(distance)>=55){moveHistory(distance>0?1:-1);dragY=event.clientY;}
    });
    function endDrag(event){dragY=null;timelineHover=event.pointerType==='mouse'&&journeyPanel.matches(':hover');}
    milestone.addEventListener('pointerup',endDrag);milestone.addEventListener('pointercancel',()=>{dragY=null;timelineHover=false});
    journeyPanel.addEventListener('keydown',event=>{
        if(event.target.closest('a,button'))return;
        if(!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
        event.preventDefault();
        if(event.key==='Home'||event.key==='End'){chapterIndex=event.key==='Home'?0:chapters.length-1;journeyElapsed=0;showHistory();}
        else moveHistory(event.key==='ArrowDown'?1:-1);
    });
    showHistory();

    const lenses=document.getElementById('projectLenses');
    const feature=document.getElementById('featuredProjects');
    const position=document.getElementById('projectPosition');
    const next=document.getElementById('nextDiscovery');
    const source=typeof categories!=='undefined'&&Array.isArray(categories)?categories:[];
    let picks=[];
    // A small curated preview, not a second full project catalogue.
    source.forEach(category=>{
        const sorted=(category.projects||[]).slice().sort((a,b)=>Number(b.year||0)-Number(a.year||0));
        const featured=sorted.filter(p=>p.featured);
        (featured.length?featured:sorted.slice(0,2)).forEach(p=>picks.push({...p,category:category.name}));
    });
    if(!picks.length&&typeof projects!=='undefined'&&Array.isArray(projects)){
        const marked=projects.filter(p=>p.featured);
        picks=(marked.length?marked:projects.slice(0,6)).map(p=>({...p,category:p.category||'Selected work'}));
    }
    let lens='All',projectIndex=0;
    const lensValues=['All',...new Set(picks.map(p=>p.category))];
    const filtered=()=>picks.filter(p=>lens==='All'||p.category===lens);
    function showProject(){
        const items=filtered();projectIndex=items.length?projectIndex%items.length:0;
        feature.replaceChildren();
        Array.from(lenses.children).forEach((b,i)=>b.setAttribute('aria-pressed',String(lensValues[i]===lens)));
        next.disabled=items.length<=2;
        if(!items.length){feature.append(node('p','lp-empty','Explore the full collection in Projects.'));position.textContent='WORK IN PROGRESS';return;}
        for(let offset=0;offset<Math.min(2,items.length);offset++){
            const item=items[(projectIndex+offset)%items.length];
            const row=node('article','lp-project-row');
            const cover=node('div','lp-project-image');
            if(item.image){
                const img=node('img');img.alt=item.title;img.loading='lazy';img.decoding='async';img.src='assets/images/projects/'+item.image;
                img.addEventListener('error',()=>img.remove(),{once:true});cover.append(img);
            }
            cover.append(node('span','lp-project-tag',`${item.category}${item.year?' / '+item.year:''}`));
            const body=node('div','lp-project-abstract');body.append(node('h4','',item.title),node('p','',item.description||item.shortDescription||''));
            const link=node('a','lp-project-open','Explore ↗');link.href='projects.html';body.append(link);row.append(cover,body);feature.append(row);
        }
        animatePanel(feature);
        position.textContent=`${projectIndex+1}–${(projectIndex+Math.min(2,items.length)-1)%items.length+1} / ${items.length}`;
    }
    lensValues.forEach(value=>{
        const b=node('button','lp-lens',value);b.type='button';
        b.addEventListener('click',()=>{lens=value;projectIndex=0;projectElapsed=0;showProject()});lenses.append(b);
    });
    next.addEventListener('click',()=>{projectIndex+=2;projectElapsed=0;showProject()});showProject();

    const journal=document.getElementById('featuredBlog');
    const posts=typeof blogPosts!=='undefined'&&Array.isArray(blogPosts)?blogPosts:[];
    const latest=posts.map((post,i)=>({post,i})).sort((a,b)=>String(b.post.created||'').localeCompare(String(a.post.created||''))||b.i-a.i).slice(0,3);
    let blogIndex=0;
    function blogImage(post,cls) {
        const img=node('img',cls);img.alt='';img.loading='lazy';img.decoding='async';img.src='assets/blog/'+post.image;
        img.addEventListener('error',()=>img.remove(),{once:true});return img;
    }
    function showBlog(){
        journal.replaceChildren();
        const active=latest[blogIndex]?.post;
        if(!active){journal.append(node('p','lp-empty','New stories are on their way.'));return;}
        const story=node('a','lp-blog-spotlight');story.href='blog.html#'+encodeURIComponent(active.slug||'');
        const screen=node('div','lp-blog-screen');
        if(active.image)screen.append(blogImage(active,'lp-blog-photo'));
        else screen.append(node('span','lp-cover-fallback','STORY SELECT'));
        screen.append(node('span','lp-story-chip',`STORY ${String(blogIndex+1).padStart(2,'0')} / ${String(latest.length).padStart(2,'0')}`));
        story.append(screen);
        if(active.created){const time=node('time','',active.created);time.dateTime=active.created;story.append(time)}
        story.append(node('h4','',active.title),node('p','',active.excerpt||''),node('span','lp-blog-read','Read the story ↗'));
        journal.append(story);
        const queue=node('div','lp-blog-queue');
        latest.forEach(({post},i)=>{
            const b=node('button','lp-blog-pick');b.type='button';b.setAttribute('aria-pressed',String(i===blogIndex));
            if(post.image)b.append(blogImage(post,''));
            b.append(node('span','',String(i+1).padStart(2,'0')),document.createTextNode(post.title));
            b.addEventListener('click',()=>{blogIndex=i;blogElapsed=0;showBlog()});queue.append(b);
        });
        journal.append(queue);animatePanel(story);
    }
    showBlog();

    // Explore the project deck directly by moving across the image area.
    feature.setAttribute('tabindex','0');
    feature.setAttribute('role','group');
    feature.setAttribute('aria-label','Featured projects. Move across the image to explore, or use left and right arrow keys.');
    feature.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')projectHover=true});
    feature.addEventListener('pointerleave',()=>{projectHover=false});
    feature.addEventListener('pointermove',event=>{
        if(event.pointerType!=='mouse')return;
        const cover=feature.querySelector('.lp-project-image');
        if(!cover)return;
        const rect=cover.getBoundingClientRect();
        if(event.clientY<rect.top||event.clientY>rect.bottom)return;
        const items=filtered();
        const index=Math.min(items.length-1,Math.max(0,Math.floor((event.clientX-rect.left)/rect.width*items.length)));
        if(index>=0&&index!==projectIndex){projectIndex=index;projectElapsed=0;showProject()}
    });
    feature.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight'].includes(event.key)||!filtered().length)return;
        event.preventDefault();projectIndex=(projectIndex+(event.key==='ArrowRight'?1:-1)+filtered().length)%filtered().length;projectElapsed=0;showProject();
    });
    const motionButton=null;
    const projectPanel=feature.closest('.lp-lab');
    const blogPanel=journal.closest('.lp-journal');
    function paused(){return userPaused||motionPreference.matches||document.hidden}
    function updateMotion(){
        if(motionButton){motionButton.textContent=userPaused?'Resume animation ▶':'Pause animation Ⅱ';motionButton.setAttribute('aria-pressed',String(userPaused));}
    }
    motionButton?.addEventListener('click',()=>{userPaused=!userPaused;updateMotion()});
    motionPreference.addEventListener('change',()=>{userPaused=motionPreference.matches;updateMotion()});
    const meters={
        project:null,
        blog:document.getElementById('blogTimer'),
        journey:null
    };
    function progress(meter,elapsed,duration,enabled){
        if(!meter)return;
        meter.style.setProperty('--timer-progress',`${enabled?Math.min(100,elapsed/duration*100):0}%`);
    }
    let last=performance.now();
    setInterval(()=>{
        const now=performance.now(),dt=Math.min(now-last,500);last=now;
        if(!paused()){
            // No whole-section hover pause: the mouse timeline cannot stop the other panels.
            if(!projectHover&&!projectPanel?.querySelector(':focus-visible')&&document.activeElement!==feature){
                projectElapsed+=dt;
                if(projectElapsed>=7000){projectElapsed=0;if(filtered().length>2){projectIndex+=2;showProject()}}
            }
            if(!blogPanel?.querySelector(':focus-visible')){
                blogElapsed+=dt;
                if(blogElapsed>=9000){blogElapsed=0;if(latest.length>1){blogIndex=(blogIndex+1)%latest.length;showBlog()}}
            }
            if(!timelineHover&&!journeyPanel.contains(document.activeElement)&&document.activeElement!==journeyPanel){
                journeyElapsed+=dt;
                if(journeyElapsed>=6000){journeyElapsed=0;if(chapters.length>1){chapterIndex=(chapterIndex+1)%chapters.length;showHistory(1)}}
            }
        }
        progress(meters.project,projectElapsed,7000,filtered().length>1);
        progress(meters.blog,blogElapsed,9000,latest.length>1);
        const countdown=document.getElementById('blogCountdown');
        if(countdown)countdown.textContent=String(Math.max(1,Math.ceil((9000-blogElapsed)/1000)));
        progress(meters.journey,journeyElapsed,6000,chapters.length>1);
    },100);
    updateMotion();
}
})();
