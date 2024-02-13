let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

nextBtn.addEventListener('click', function(){
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0])
})

prevBtn.addEventListener('click', function(){
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1])
})


function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("html"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "html" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("html", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("html").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

loco();

var clutter = "";

document.querySelector("#content>p").textContent.split(" ").forEach(function(dets){
    clutter += `<span> ${dets} </span>`

    document.querySelector("#content>p").innerHTML = clutter;
})


gsap.to("#content>p>span",{
    scrollTrigger:{
        trigger: `.about`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`body`,
        scrub:.7,
    },
    stagger:.2,
    color:`#dadada69`
})

const observer = new IntersectionObserver((entries) => {
  for(const entry of entries){
      console.log(entry)
      if (entry.isIntersecting){
          entry.target.classList.add('show');
      }else {
          entry.target.classList.remove('show')
      }
  }
});

const hiddenElements = document.querySelectorAll('.hidden');
for (const hiddenElement of hiddenElements){
  observer.observe(hiddenElement);
}

const observerImg = new IntersectionObserver((entries) => {
  for(const entry of entries){
      console.log(entry)
      if (entry.isIntersecting){
          entry.target.classList.add('scale-in');
      }else {
          entry.target.classList.remove('scale-in')
      }
  }
});

const hiddenImgElements = document.querySelectorAll('.scale-out');
for (const hiddenImgElement of hiddenImgElements){
  observerImg.observe(hiddenImgElement);
}