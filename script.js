gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main-tag"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main-tag" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main-tag", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main-tag").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var timeline = gsap.timeline();
timeline.to(".myloading , .myloading img", {

  opacity: 0,
  duration: 1.5,
  delay: 0.5
})


timeline.from(".left img", {
  scale: 0.5,
  opacity: 0,
  duration: 1

})

timeline.from(".right h4 , .right h1 , .right h6 , .right a", {
  x: 900,
  duration: 0.3,
  stagger: 0.2

})


let mynote = document.getElementById('mynotebook');
let portfolio = document.getElementById('portfolio');
let ecommerce = document.getElementById('ecommerce');
let newsapp = document.getElementById('newsapp');
let hireMe = document.getElementById('hireMe');


mynote.addEventListener('click', () => {
  window.location.href = 'https://mynoteb00kapp.netlify.app/';
})

portfolio.addEventListener('click', () => {
  window.location.href = 'https://sanjayksingh.netlify.app/';
})

ecommerce.addEventListener('click', () => {
  window.location.href = 'https://prabhatcenter-react.netlify.app/';
})

newsapp.addEventListener('click', () => {
  window.location.href = 'https://prabhatnewsapp.netlify.app/';
})

hireMe.addEventListener('click', () => {
  window.location.href = 'mailto:sanjay892000@gmail.com';
})

let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  /*   let dataURL = "http://localhost:5000/api/sanjay/massage" */
  let dataURL = "https://my-portfolio-web-3083.onrender.com"
  addDataFun(dataURL);

})

let addDataFun = async (URLs) => {
  let name = document.getElementById('inputname').value;
  let email = document.getElementById('inputemail').value;
  let subject = document.getElementById('inputsubject').value;
  let massage = document.getElementById('massage').value;
  let response = await fetch(`${URLs}/api/sanjay/massage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: name, email: email, subject: subject, massage: massage }),
  });
  const data = await response.json();
  if (data) {
    alert('Form submitted!');
    name = " ",
      email = " ",
      subject =" ",
      massage = " "
  }
  console.log(data);
}