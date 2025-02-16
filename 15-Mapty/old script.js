'use strict';

//prettier-ignore
const  months =['January','February','March','April','May','June','July','August', 'Septemner','October', 'November', 'December' ];

const  form =document.querySelector('.form');
const containerWorkouts=document.querySelector('.workouts');
const inputType=document.querySelector('.form__input--type');
const inputDistance=document.querySelector('.form__input--distance');
const inputDuration=document.querySelector('.form__input--duration');
const inputCadence=document.querySelector('.form__input--cadence');
const inputElevation=document.querySelector('.form__input--elevation');

let  map, mapEvent; 

class App {
    #map;
    #mapEvent;
   constructor () {
      this._getPosition();
         
      form.addEventListener('submit', this.mewWorkout.bind(this));
      //e.preventDefault(); 
      inputType.addEventListener('change', this._toggleElevationField);  
       }    
       
    /*/// _getPosition() {
      // inputDistance.value= inputDuration.value = inputCadence.value = inputElevation.value='';
       // console.log(mapEvent); 
       // const {lat, lng} = mapEvent.latlng;   //which  generated after  the  clicking on  map
         
        // L.marker(coords)
        L.marker([lat,lng])
        .addTo(map)
       //  .bindPopup('A pretty CSS popup.<br> Easily customizable.')
         //.bindPopup('workout')
        .bindPopup(L.popup({
             maxWidth : 250,
             minWidth : 100,
             autoClose : false,
             closeOnClick : false, 
             className : 'running-popup',
 
         }))
         .setPopupContent('Workout')
         .openPopup();
        
      });
 
    inputType.addEventListener('change', function () {
     inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
     inputCadence.closest('.form__row').classList.toggle('form__row--hidden') 
    });
    }
    */
     _getPosition() {
            
         if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
                function() {
                    alert('could not get  your  position');
                });
            }
        _loadMap(position) {
            const {latitude} = position.coords;
            const {longitude} =position.coords; 
            console.log(`https://www.google.co.in/maps/@${latitude}, ${longitude}`); //},  
            const coords = [latitude, longitude];
            console.log(this)
            this.map = L.map('map').setView(coords, 13); 
                //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {    
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            //handling clicks on  map 
            //this.map.on('click', function(mapE) {    
            this.map.on('click', this._showForm.bind)   
               /*  moved  below 
                 mapEvent=mapE;
                //console.log(mapEvent);
                form.classList.remove('hidden');
                inputDistance.focus();
                 }); */
            }
    _showForm(mapE) {
        this.mapEvent=mapE;
        //console.log(mapEvent);
        form.classList.remove('hidden');
        inputDistance.focus();
         }; 


    
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden') 

    }
    _newWorkout() {
        inputDistance.value= inputDuration.value = inputCadence.value = inputElevation.value='';
        console.log(mapEvent); 
        const {lat, lng} = mapEvent.latlng;   //which  generated after  the  clicking on  map
         
        // L.marker(coords)
        L.marker([lat,lng])
        .addTo(this.map)
       //  .bindPopup('A pretty CSS popup.<br> Easily customizable.')
         //.bindPopup('workout')
        .bindPopup(L.popup({
             maxWidth : 250,
             minWidth : 100,
             autoClose : false,
             closeOnClick : false, 
             className : 'running-popup',
 
         }))
         .setPopupContent('Workout')
         .openPopup();
        
      };
 
    }
    
  


const app = new App();
app._position();



/*if (navigator.geolocation)
   navigator.geolocation.getCurrentPosition(
  /* moved  to   loadmap
    function(position) {
    console.log(position) 
    const {latitude} = position.coords;
    const {longitude} =position.coords; 
    console.log(latitude, longitude);
    console.log(`https://www.google.co.in/maps/@${latitude}, ${longitude}`); //},  
    const coords = [latitude, longitude];
   
    //var map = L.map('map').setView([51.505, -0.09], 13);     copied  from  leaflets.com
    const map = L.map('map').setView(coords, 13); 
console.log(map);
    //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {    
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //handling clicks on  map 
    
    //L.marker([51.5, -0.09])
   // map.on('click', function(mapEvent) {
    map.on('click', function(mapE) {    
        mapEvent=mapE;
        //console.log(mapEvent);
        form.classList.remove('hidden');
        inputDistance.focus();
        /*const {lat, lng} = mapEvent.latlng;   //which  generated after  the  clicking on  map
        
       // L.marker(coords)
       L.marker([lat,lng])
       .addTo(map)
      //  .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        //.bindPopup('workout')
        .bindPopup(L.popup({
            maxWidth : 250,
            minWidth : 100,
            autoClose : false,
            closeOnClick : false, 
            className : 'running-popup',

        }))
        .setPopupContent('Workout')
        .openPopup();
      */  
    // map.on()    coming  on  leaflet  library
    /*map.on('click', function(mapEvent ) {
        console.log(mapEvent);
    */
   //   }); 
   //  }, 
 // */     moved  to  load  map 
 /*   function() {
    alert('could not get  your  position');
});
*/ // moved  to  get position 

// global  variable  available  in script.js  as  long  as  other.js  appear  before  script.js  in  index.html
//console.log(firstName);
/*  moved  top 
form.addEventListener('submit', function(e) {
   e.preventDefault(); 
  //display  marker  
  //move  from  top  
  //clear  input  fields 
  inputDistance.value= inputDuration.value = inputCadence.value = inputElevation.value='';
  console.log(mapEvent); 
   const {lat, lng} = mapEvent.latlng;   //which  generated after  the  clicking on  map
        
       // L.marker(coords)
       L.marker([lat,lng])
       .addTo(map)
      //  .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        //.bindPopup('workout')
        .bindPopup(L.popup({
            maxWidth : 250,
            minWidth : 100,
            autoClose : false,
            closeOnClick : false, 
            className : 'running-popup',

        }))
        .setPopupContent('Workout')
        .openPopup();
       
})

inputType.addEventListener('change', function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden') 
})

*/