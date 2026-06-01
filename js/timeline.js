const timelineData = [

{
    year:"2006-2011",
    title:"B.S. Mechatronics Engineering",
    description:"UNAM · Faculty of Engineering Best Student Award"
},

{
    year:"2014",
    title:"MEXT Scholarship",
    description:"Relocated to Japan through MEXT"
},

{
    year:"2017",
    title:"M.S. Information Engineering",
    description:"University of the Ryukyus"
},

{
    year:"2024",
    title:"CTO – SenzioTek",
    description:"AI · XR · Robotics"
},

{
    year:"2025",
    title:"Mixed Reality Patent",
    description:"MXa2025009159"
},

{
    year:"2026",
    title:"NES Educational AI Publication",
    description:"Playable Game of Life on Nintendo"
}

];

function updateTimeline(){

    timelineSlides.forEach((slide,index)=>{

        let offset =
        index - timelineCurrent;

        const half =
        Math.floor(
            timelineSlides.length / 2
        );

        if(offset > half)
            offset -= timelineSlides.length;

        if(offset < -half)
            offset += timelineSlides.length;

	/* CENTRO */
	if(offset === 0){

		slide.style.transform = `
			translate(-50%,-50%)
			translateY(0px)
			scale(.75)
		`;

		slide.style.opacity = 1;
		slide.style.zIndex = 10;
	}

	/* ARRIBA 1 */
	else if(offset === -1){

		slide.style.transform = `
			translate(-50%,-50%)
			translateY(-170px)
			scale(.55)
			rotateX(35deg)
		`;

		slide.style.opacity = .55;
		slide.style.zIndex = 7;
	}

	/* ABAJO 1 */
	else if(offset === 1){

		slide.style.transform = `
			translate(-50%,-50%)
			translateY(170px)
			scale(.55)
			rotateX(-35deg)
		`;

		slide.style.opacity = .55;
		slide.style.zIndex = 7;
	}

	/* ARRIBA 2 */
	else if(offset === -2){

		slide.style.transform = `
			translate(-50%,-50%)
			translateY(-270px)
			scale(.35)
			rotateX(60deg)
		`;

		slide.style.opacity = .2;
		slide.style.zIndex = 4;
	}

	/* ABAJO 2 */
	else if(offset === 2){

		slide.style.transform = `
			translate(-50%,-50%)
			translateY(270px)
			scale(.35)
			rotateX(-60deg)
		`;

		slide.style.opacity = .2;
		slide.style.zIndex = 4;
	}

        /* RESTO */

        else{

            slide.style.transform = `
                translate(-50%,-50%)
                translateY(${offset*300}px)
                scale(.4)
            `;

            slide.style.opacity = 0;
            slide.style.zIndex = 0;
        }

    });

}
