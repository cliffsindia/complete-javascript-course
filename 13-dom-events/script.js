'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnSCrollTo =document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
//menu  fade  animation
const  nav=document.querySelector('.nav');
const  tabs=document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operatiosn__content');

const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));

//for (let i = 0; i < btnsOpenModal.length; i++)
 // btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//const btnSCrollTo =document.querySelector('.btn--scroll-to');
//const section1=document.querySelector('#section--1');
//button scrolling
btnSCrollTo.addEventListener('click', function(e){
  const slcoords=section1.getBoundingClientRect();
  console.log(slcoords);

  console.log(e.target.getBoundingClientRect());
  
  console.log('Current scroll (X/Y)', window.pageXOffset,window.pageYOffset);
  
  console.log('height/width viewport', 
    document.documentElement.clientHeight,
    document.documentElement.clientWidth);


});
//page navigation
/*  not  convient  for lot  of  links 
document.querySelectorAll('.nav__link').forEach(function(el) {
el.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('LINK')
  const  id =this.getAttribute('href');
  console.log(id);
  document.querySelector(id).scrollIntoView({
    behaviour: 'smooth'
  });
});

});
*/


//1.add  event  listener  to  commom parent element
//2.determine  what  element  orginated  the  event
document.querySelector('.nav__links').addEventListener
 ('click', function (e) {
  e.preventDefault();
//matching  strategy 
if  (e.target.classList.contains('nav__link')) {
  const  id=e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({
    behaviour: 'smooth'
  });
} 

});

//tabbed component

/*
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.parentElement;
  console.log(clicked);
});
*/
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guard  clause
  if(!clicked) return;
 //remove  active classes 
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
  //activate  tab
  clicked.classList.add('operations__tab--active');

//activate  content  area
console.log(clicked.dataset.tab)  
document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active'); 

});

//menu fade  animation
/*const handleHover=function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link=e.target;
    const siblings=link.closest('.nav').querySelector('imag');

    siblings.forEach(el=>{
      if (el !==link) el.style.opacity=opacity;
      });
    logo.style.opacity=opacity;
    }
  };
*/

 const handleHover=function(e)  {
    if(e.target.classList.contains('nav__link')) {
      const link=e.target;
      const siblings=link.closest('.nav').querySelectorAll('.nav__link');
      const logo =link.closest('.nav').querySelector('imag');
  
      siblings.forEach(el=>{
        if (el !==link) el.style.opacity=this;
        });
      logo.style.opacity=this;
      }
    };
  
//passing  argument  into  handler
 nav.addEventListener('mouseover', handleHover.bind(0.5));
 nav.addEventListener('mouseout', handleHover.bind(1 ));

 //sticky navigation
const initialCoords=section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
   console.log(window.scrollY);

   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
   else nav.classList.remove('sticky');

 });

//sticky  navinagation :  intersection observer api
const  obsCallback =function (entries, observer ) {
   entries.forEach(entry =>{
    console.log(entry);
   });
};

const obsOptions = {
  root : null,
  threshold : 0,0.2
};

const observer = new IntersectionObserver
   (obsCallback,obsOptions);
   observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] =entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
   };

const headerObserver = new IntersectionObserver (stickyNav, {
  root: null,
  threshold : 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


//selecting  elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//const  header =document.querySelector('.header');
const  allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1')
const allButtons =document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//creating and  inserting  elements
//insertadjacenthtml
const message =document.createElement('div');
message.classList.add('cookie-message');


//message.textContent='We use  cookies for improved functionality and  analytics.
 message.innerHTML=`We use  cookies for improved functionality and 
 analytics. <button class="btn btn--close-cookie">Got it!</button>`;
 
 header.prepend(message);
// header.append(message);

//header.append(message.cloneNode(true));
//header.before(message);
header.after(message);

//delete.elements
document.querySelector('.btn--close-cookie')
   .addEventListener('click', function(){
    //message.remove();
    message.parentElement.removeChild(message);
});

<<<<<<< HEAD
=======
//style

message.style.backgroundColor=`#37383d`;
message.style.width='120%';

console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+40+'px';
document.documentElement.style.setProperty('--color=primary','orangered')

//attributes
const  logo=document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt='Beautiful minimalist logo';

//non standard

console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.src);

console.log(logo.getAttribute('src'));

const  link=document.querySelector('.nav__link--btn');

console.log(link.href);
console.log(link.getAttribute('href'));
//data attributes

console.log(logo.dataset.versionNumber);
//classes
logo.classList.add('c','j')
logo.classList.remove('c','j')
logo.classList.toggle('c')
logo.classList.contains('c') //not  includes
 
//don't  use
//logo.classNmae='jonas'

//const btnSCrollTo =document.querySelector('.btn--scroll-to');
//const section1=document.querySelector('#section--1');

btnSCrollTo.addEventListener('click', function(e){
  const slcoords=section1.getBoundingClientRect();
  console.log(slcoords);

  console.log(e.target.getBoundingClientRect());
  
  console.log('Current scroll (X/Y)', window.pageXOffset,window.pageYOffset);
  
  console.log('height/width viewport', 
    document.documentElement.clientHeight,
    document.documentElement.clientWidth);
//Scrolling
//window.scrollTo(slcoords.left +window.pageXOffset,
 //  slcoords.top + window.pageYOffset);

//window.scrollTo({
//left:  slcoords.left + window.pageXOffset,
//top: slcoords.top + window.pageYOffset,
//behavior:'smooth',

//});
section1.scrollIntoView({behavior:'smooth'});   

});
/*
const h1=document.querySelector('h1');

//h1.addEventListener('mouseenter',function (e) {
 // alert('addEventListener : Great! You are reading  the  heading  : D');
//});
//h1.onmouseenter =function (e) {
  //alert('onmouseenter : Great! You are reading  the  heading  : D');
//};

const alertH1 = function (e) {alert('addEventListener : Great! You are reading the heading : D');
 // h1.removeEventListener('mouseenter',alertH1);  

};

h1.addEventListener('mouseenter',alertH1);

setTimeout(() => removeEventListener('mouseenter', alertH1), 3000);

const randomInt =(min,max )=>
  Math.floor(Math.random() * (max-min +1) +min);
const randomColor =() =>
  `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor=randomColor();
  //console.log('LINK', e.target);
  console.log('LINK', e.target, e.curentTarget);
  console.log(e.currentTarget===this);

  //stop propagation not good idea
 // e.stopPropagation;
  });

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor=randomColor();
    console.log('CONTAINER', e.target,e.currentTarget);
    });
  
document.querySelector('.nav').addEventListener('click', function (e) {
     this.style.backgroundColor=randomColor();
     console.log('NAV', e.target,e.currentTarget);
      },
      // true
       );

const h1=document.querySelector('h1');

//goimg  downwards :  child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color='white';
h1.lastElementChild.style.color='orangered';
//going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.backgroundColor='var (--gradient-secondary)';
h1.closest('h1').style.backgroundColor='var (--gradient-primary)';

//going sideways : siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform ='scale(0.5)';
});

*/
>>>>>>> 858e5f0d0c93cf06866cb796ebfa01d24814739a
