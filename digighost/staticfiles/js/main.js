gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function(){

const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menuOverlay.classList.toggle("active");
});

});

/* ================= SINGLE initScroll (FIXED) ================= */

function initScroll(){

const scrollContainer = document.querySelector("[data-scroll-container]");

const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 0.8,
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
        end: "bottom top",
        scrub: 1,
        anticipatePin: 1
    }
});


ScrollTrigger.refresh();

/* ================= CLEAN LOGO NAV EFFECT ================= */

let heroLogo = document.querySelector(".hero-title");
let nav = document.querySelector(".nav");

gsap.to(heroLogo,{
    scale:0.25,
    top:40,   // navbar ke andar position
    ease:"none",
    scrollTrigger:{
        trigger:".hero",
        start:"top top",
        end:"bottom top",
        scrub:true,
    }
});

/* SECTION REVEAL */

gsap.from(".section",{
y:80,
opacity:0,
duration:1,
scrollTrigger:{
trigger:".section",
start:"top 85%",
toggleActions:"play none none reverse"
}
});

setTimeout(()=>{
    locoScroll.update();
},500);
}

/* ================= INFINITE LOOP ================= */
function infiniteLoop(rowSelector, speed = 40){

    const rows = document.querySelectorAll(rowSelector);

    rows.forEach(row => {

        const originalContent = row.innerHTML;

        // 3x duplicate for safety
        row.innerHTML += originalContent + originalContent;

        const totalWidth = row.scrollWidth / 3;

        gsap.to(row, {
            x: -totalWidth,
            duration: speed,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => {
                    return parseFloat(x) % totalWidth;
                })
            }
        });

    });
}

window.addEventListener("load", () => {
    infiniteLoop(".row", 45);
});

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

document.addEventListener("DOMContentLoaded", function(){
    initScroll();
    setTimeout(()=>{
  ScrollTrigger.refresh();
},1000);
});

/* ================= IMAGE WALL SLIDER ================= */

const rows = document.querySelectorAll(".row");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");

let slideIndex = 0;
const slideAmount = 250; // kitna px move kare (adjust kar sakte ho)

function updateSlide() {
    rows.forEach(row => {
        row.style.transform = `translateX(${slideIndex}px)`;
    });
}

/* LEFT CLICK */
leftBtn.addEventListener("click", () => {
    slideIndex += slideAmount;
    updateSlide();
});

/* RIGHT CLICK */
rightBtn.addEventListener("click", () => {
    slideIndex -= slideAmount;
    updateSlide();
});


/* BUTTON CURSOR EFFECT */

const buttons = document.querySelectorAll(".capsule-btn");
const cursorFollower = document.querySelector(".cursor-follower");

buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        cursorFollower.classList.add("cursor-hover");
    });

    btn.addEventListener("mouseleave", () => {
        cursorFollower.classList.remove("cursor-hover");
    });
});

gsap.registerPlugin(ScrollTrigger);

/* HERO → RED SECTION PREMIUM TRANSITION */

/* HERO → RED PREMIUM TRANSITION */

gsap.timeline({
  scrollTrigger: {
    trigger: ".red",
    scroller: "[data-scroll-container]",  // VERY IMPORTANT
    start: "top 80%",
    end: "top 20%",
    scrub: 1,
  }
})

.to(".hero", {
  scale: 0.85,
  opacity: 0.4,
  ease: "power3.out"
}, 0)

.from(".red", {
  y: 200,
  opacity: 0,
  ease: "power3.out"
}, 0.2)

.from(".red .reveal-text", {
  y: 120,
  opacity: 0,
  stagger: 0.2,
  ease: "power4.out"
}, 0.4);

gsap.to("#morphPath", {
  scrollTrigger: {
    trigger: ".red",
    scroller: "[data-scroll-container]",
    start: "top bottom",
    end: "top 40%",
    scrub: 1,
  },
  attr: {
    d: "M0,80 C360,0 1080,320 1440,80 L1440,320 L0,320 Z"
  },
  ease: "none"
});


/* ================= ULTRA DOCK TEXT EFFECT ================= */

document.querySelectorAll(".dock-text").forEach(text => {

  // 1️⃣ Split text into word spans
  const words = text.innerText.split(" ");
  text.innerHTML = "";

  words.forEach(word => {
    const span = document.createElement("span");
    span.innerText = word + " ";
    text.appendChild(span);
  });

  const spans = text.querySelectorAll("span");

  // 2️⃣ Mouse move effect
  text.addEventListener("mousemove", (e) => {

    spans.forEach(span => {

      const rect = span.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(e.clientX - center);

      const maxDistance = 250; 
      let scale = 2 - (distance / maxDistance);

      if(scale < 1) scale = 1;

      // Smooth GSAP animation
      gsap.to(span, {
        scale: scale,
        duration: 0.25,
        ease: "power3.out"
      });

      // Color shift activation
      if(distance < 80){
        span.classList.add("active");
      } else {
        span.classList.remove("active");
      }

    });

  });

  // 3️⃣ Reset on leave
  text.addEventListener("mouseleave", () => {

    spans.forEach(span => {

      gsap.to(span, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out"
      });

      span.classList.remove("active");

    });

  });

});


/* ================= BENTO GALLERY SCRUB ================= */

function initBento(){

  const gallery = document.querySelector("#bentoGallery");
  const items = gallery.querySelectorAll(".gallery__item");

  gsap.from(items,{
    scale:0.8,
    opacity:0,
    stagger:0.15,
    duration:1,
    ease:"power3.out",
    scrollTrigger:{
      trigger:gallery,
      scroller:"[data-scroll-container]",
      start:"top 80%",
    }
  });

  ScrollTrigger.create({
    trigger:gallery,
    scroller:"[data-scroll-container]",
    start:"top top",
    end:"+=200%",
    scrub:true,
    
  });
}

initBento();


// gsap.registerPlugin(ScrollTrigger);

// gsap.from(".section-title", {
//     y: 80,
//     opacity: 0,
//     duration: 1,
//     ease: "power4.out",
//     scrollTrigger: {
//         trigger: ".section-title",
//         start: "top 80%",
//     }
// });

// gsap.from(".batch-card", {
//     y: 100,
//     opacity: 0,
//     duration: 1.2,
//     stagger: 0.3,
//     ease: "power4.out",
//     scrollTrigger: {
//         trigger: ".batch-wrapper",
//         start: "top 85%",
//     }
// });



gsap.to(".footer-parallax", {
    y: -100,
    ease: "none",
    scrollTrigger: {
        trigger: ".dg-footer",
        scroller: "[data-scroll-container]",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});