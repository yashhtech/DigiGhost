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


/* ================= SINGLE initScroll (FIXED) ================= */

function initScroll(){

const scrollContainer = document.querySelector("[data-scroll-container]");

const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1,
    lerp: 0.08
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
        return arguments.length
            ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true})
            : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
});


ScrollTrigger.defaults({
    scroller: scrollContainer
});


let tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".hero",
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
    }
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

/* HERO ZOOM */

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




/* ================= INFINITE LOOP ================= */

function infiniteLoop(rowSelector, speed = 40){

    const rows = document.querySelectorAll(rowSelector);

    rows.forEach(row => {

        const items = row.children;

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



/* ================= CUSTOM CURSOR ================= */

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


/* ================= HOVER TARGETS ================= */

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
