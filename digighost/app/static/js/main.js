// ================= GSAP =================

gsap.registerPlugin(ScrollTrigger);

// ================= DOM READY =================

document.addEventListener("DOMContentLoaded", () => {

    // ================= MENU =================

    const menuBtn = document.querySelector(".menu-btn");
    const menuOverlay = document.querySelector(".menu-overlay");

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            menuOverlay.classList.toggle("active");
        });
    }

    // ================= INIT SCROLL =================

    initScroll();

    // ================= INFINITE LOOP =================

    infiniteLoop(".row", 45);

    // ================= CUSTOM CURSOR =================

    initCursor();

    // ================= IMAGE WALL SLIDER =================

    initSlider();

    // ================= DOCK TEXT EFFECT =================

    initDockText();

    // ================= BENTO GALLERY =================

    initBento();

    // ================= FOOTER PARALLAX =================

    initFooterParallax();

    // ================= HERO RED TRANSITION =================

    initHeroTransition();

});

// ================= LOCOMOTIVE + SCROLLTRIGGER =================

function initScroll() {

    const scrollContainer = document.querySelector("[data-scroll-container]");

    if (!scrollContainer) return;

    // Prevent double initialization
    if (window.locoScroll) {
        window.locoScroll.destroy();
    }

    window.locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 0.8,
        lerp: 0.08
    });

    const locoScroll = window.locoScroll;

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, {
                    duration: 0,
                    disableLerp: true
                })
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

    // ================= HERO LOGO EFFECT =================

    const heroLogo = document.querySelector(".hero-title");

    if (heroLogo) {

        gsap.to(heroLogo, {
            scale: 0.25,
            top: 40,
            ease: "none",

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }

    // ================= SECTION REVEAL =================

    const sections = document.querySelectorAll(".section");

    if (sections.length > 0) {

        gsap.from(".section", {
            y: 80,
            opacity: 0,
            duration: 1,

            scrollTrigger: {
                trigger: ".section",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

    }

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

    setTimeout(() => {
        locoScroll.update();
    }, 1000);
}

// ================= INFINITE LOOP =================

function infiniteLoop(rowSelector, speed = 40) {

    const rows = document.querySelectorAll(rowSelector);

    if (!rows.length) return;

    rows.forEach(row => {

        const originalContent = row.innerHTML;

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

// ================= CUSTOM CURSOR =================

function initCursor() {

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    let posX = 0;
    let posY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });

    function animateCursor() {

        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;

        follower.style.left = posX + "px";
        follower.style.top = posY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects

    const hoverElements = document.querySelectorAll(
        "a, button, .menu-btn, .hero-title, .capsule-btn"
    );

    hoverElements.forEach(el => {

        el.addEventListener("mouseenter", () => {
            follower.classList.add("cursor-hover");
        });

        el.addEventListener("mouseleave", () => {
            follower.classList.remove("cursor-hover");
        });

    });
}

// ================= IMAGE WALL SLIDER =================

function initSlider() {

    const rows = document.querySelectorAll(".row");
    const leftBtn = document.querySelector(".arrow.left");
    const rightBtn = document.querySelector(".arrow.right");

    if (!rows.length) return;

    let slideIndex = 0;
    const slideAmount = 250;

    function updateSlide() {

        rows.forEach(row => {
            row.style.transform = `translateX(${slideIndex}px)`;
        });

    }

    if (leftBtn) {

        leftBtn.addEventListener("click", () => {
            slideIndex += slideAmount;
            updateSlide();
        });

    }

    if (rightBtn) {

        rightBtn.addEventListener("click", () => {
            slideIndex -= slideAmount;
            updateSlide();
        });

    }
}

// ================= HERO TO RED TRANSITION =================

function initHeroTransition() {

    const hero = document.querySelector(".hero");
    const red = document.querySelector(".red");

    if (!hero || !red) return;

    gsap.timeline({
        scrollTrigger: {
            trigger: ".red",
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "top 20%",
            scrub: 1
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

    // SVG Morph

    const morphPath = document.querySelector("#morphPath");

    if (morphPath) {

        gsap.to("#morphPath", {

            scrollTrigger: {
                trigger: ".red",
                scroller: "[data-scroll-container]",
                start: "top bottom",
                end: "top 40%",
                scrub: 1
            },

            attr: {
                d: "M0,80 C360,0 1080,320 1440,80 L1440,320 L0,320 Z"
            },

            ease: "none"
        });

    }
}

// ================= DOCK TEXT =================

function initDockText() {

    const dockTexts = document.querySelectorAll(".dock-text");

    if (!dockTexts.length) return;

    dockTexts.forEach(text => {

        const words = text.innerText.split(" ");

        text.innerHTML = "";

        words.forEach(word => {

            const span = document.createElement("span");

            span.innerText = word;
            span.style.display = "inline-block";
            span.style.marginRight = "12px"; // adjust space here
            text.appendChild(span);

        });

        const spans = text.querySelectorAll("span");

        let ticking = false;

        text.addEventListener("mousemove", (e) => {

            if (ticking) return;

            requestAnimationFrame(() => {

                spans.forEach(span => {

                    const rect = span.getBoundingClientRect();

                    const center = rect.left + rect.width / 2;

                    const distance = Math.abs(e.clientX - center);

                    let scale = 1.5 - (distance / 300);

                    if (scale < 1) scale = 1;

                    span.style.transform = `scale(${scale})`;

                });

                ticking = false;

            });

            ticking = true;

        });

        text.addEventListener("mouseleave", () => {

            spans.forEach(span => {

                gsap.to(span, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out"
                });

            });

        });

    });

}

// ================= BENTO GALLERY =================

function initBento() {

    const gallery = document.querySelector("#bentoGallery");

    if (!gallery) return;

    const items = gallery.querySelectorAll(".gallery__item");

    if (!items.length) return;

    gsap.from(items, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
            trigger: gallery,
            scroller: "[data-scroll-container]",
            start: "top 80%"
        }
    });

    ScrollTrigger.create({
        trigger: gallery,
        scroller: "[data-scroll-container]",
        start: "top top",
        end: "+=100%",
        scrub: true
    });

}

// ================= FOOTER PARALLAX =================

function initFooterParallax() {

    const footer = document.querySelector(".dg-footer");
    const footerParallax = document.querySelector(".footer-parallax");

    if (!footer || !footerParallax) return;

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

}

// ================= WINDOW LOAD =================

window.addEventListener("load", () => {

    ScrollTrigger.refresh();

    if (window.locoScroll) {
        window.locoScroll.update();
    }

});