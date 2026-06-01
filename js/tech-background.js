const svg =
document.getElementById(
    "tech-background"
);

svg.setAttribute(
    "viewBox",
    "0 0 1920 1080"
);

const nodes = [];
const links = [];

for(let i=0;i<40;i++){

    const x =
    Math.random()*1920;

    const y =
    Math.random()*1080;

    nodes.push({x,y});

}

nodes.forEach((a,i)=>{

    nodes.forEach((b,j)=>{

        if(i>=j) return;

        const dx = a.x-b.x;
        const dy = a.y-b.y;

        const d =
        Math.sqrt(dx*dx+dy*dy);

        if(d<250){

            const line =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );

            line.setAttribute(
                "stroke",
                "#00ffaa"
            );

            line.setAttribute(
                "stroke-opacity",
                "0.2"
            );

            svg.appendChild(line);

            links.push({
                line,
                a,
                b
            });
        }
    });
});

nodes.forEach(node=>{

    const circle =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    circle.setAttribute(
        "r",
        3
    );

    circle.setAttribute(
        "fill",
        "#00ffaa"
    );

    svg.appendChild(circle);

    node.circle = circle;

    node.phase =
    Math.random()*10;
});

for(let y=0;y<1080;y+=60){

    const line =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute(
        "x1",
        0
    );

    line.setAttribute(
        "y1",
        y
    );

    line.setAttribute(
        "x2",
        1920
    );

    line.setAttribute(
        "y2",
        y
    );

    line.setAttribute(
        "stroke",
        "#00ffaa"
    );

    line.setAttribute(
        "stroke-opacity",
        "0.05"
    );

    svg.appendChild(line);
}

function animate(t){

    nodes.forEach(node=>{

        const offset =
        Math.sin(
            t*0.0005 +
            node.phase
        )*10;

        node.circle.setAttribute(
            "cx",
            node.x + offset
        );

        node.circle.setAttribute(
            "cy",
            node.y
        );
    });

    links.forEach(link=>{

        const ax =
        link.a.x +
        Math.sin(
            t*0.0005 +
            link.a.phase
        )*10;

        const bx =
        link.b.x +
        Math.sin(
            t*0.0005 +
            link.b.phase
        )*10;

        link.line.setAttribute(
            "x1",
            ax
        );

        link.line.setAttribute(
            "y1",
            link.a.y
        );

        link.line.setAttribute(
            "x2",
            bx
        );

        link.line.setAttribute(
            "y2",
            link.b.y
        );
    });

    requestAnimationFrame(
        animate
    );
}

requestAnimationFrame(
    animate
);