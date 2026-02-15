gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function(){

const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");

menuBtn.addEventListener("click", () => {

    menuBtn.classList.toggle("active");
    menuOverlay.classList.toggle("active");

});

});


window.addEventListener("load", () => {

setTimeout(() => {

gsap.to(".loader",{
opacity:0,
duration:1,
onComplete:()=>{
document.querySelector(".loader").style.display="none";
document.body.style.overflow="auto";
initScroll();
initSmoke();
}
});

},2000);

});

function initScroll(){

const locoScroll = new LocomotiveScroll({
el: document.querySelector("[data-scroll-container]"),
smooth:true,
multiplier:0.9,
lerp:0.08
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]",{
scrollTop(value){
return arguments.length
? locoScroll.scrollTo(value,0,0)
: locoScroll.scroll.instance.scroll.y;
},
getBoundingClientRect(){
return {top:0,left:0,width:window.innerWidth,height:window.innerHeight};
}
});

ScrollTrigger.addEventListener("refresh",()=>locoScroll.update());
ScrollTrigger.refresh();

/* HERO ZOOM */

gsap.to(".hero-title",{
scale:0.4,
opacity:0.2,
scrollTrigger:{
trigger:".hero",
scroller:"[data-scroll-container]",
start:"top top",
end:"bottom top",
scrub:true
}
});

/* SECTION REVEAL */

gsap.to(".section",{
opacity:1,
y:0,
scrollTrigger:{
trigger:".section",
scroller:"[data-scroll-container]",
start:"top 80%",
end:"top 40%",
scrub:true
}
});

}

function initScroll(){

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1,
    lerp: 0.08
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
        return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});

ScrollTrigger.defaults({
    scroller: "[data-scroll-container]"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

/* HERO ZOOM OUT */

gsap.fromTo(".hero-title",
{
scale:1.2,
opacity:1
},
{
scale:0.4,
opacity:0.2,
ease:"none",
scrollTrigger:{
trigger:".hero",
start:"top top",
end:"bottom top",
scrub:1
}
});


/* SECTION REVEAL */

gsap.fromTo(".section",
{
y:150,
opacity:0
},
{
y:0,
opacity:1,
ease:"power2.out",
scrollTrigger:{
trigger:".section",
start:"top 85%",
end:"top 50%",
scrub:1
}
});


ScrollTrigger.refresh();
}



function infiniteLoop(rowSelector, speed = 40){

    const rows = document.querySelectorAll(rowSelector);

    rows.forEach(row => {

        const items = row.children;

        // clone items
        [...items].forEach(item=>{
            const clone = item.cloneNode(true);
            row.appendChild(clone);
        });

        const totalWidth = row.scrollWidth / 2;

        gsap.fromTo(row,
            { x: 0 },
            {
                x: -totalWidth,
                duration: speed,
                ease: "none",
                repeat: -1
            }
        );
    });
}

infiniteLoop(".row", 45);



/* CUSTOM CURSOR */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

document.addEventListener("mousemove", (e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

function animateCursor(){
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    follower.style.left = posX + "px";
    follower.style.top = posY + "px";

    requestAnimationFrame(animateCursor);
}
animateCursor();

/* HOVER TARGETS */

const hoverElements = document.querySelectorAll(
    "a, .menu-btn, .hero-title"
);

hoverElements.forEach(el=>{
    el.addEventListener("mouseenter", ()=>{
        follower.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", ()=>{
        follower.classList.remove("cursor-hover");
    });
});
