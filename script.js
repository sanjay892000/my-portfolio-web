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
  document.getElementById('inputname').value=''
  document.getElementById('inputemail').value=''
  document.getElementById('inputsubject').value=''
  document.getElementById('massage').value=''
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
  }
}