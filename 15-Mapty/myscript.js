'use strict';


class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;


  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }


  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}


//prettier-ignore
// const  months =['January','February','March','April','May','June','July','August', 'Septemner','October', 'November', 'December' ];

///////////////////////////////////////
// APPLICATION ARCHITECTURE

const  form =document.querySelector('.form');
const containerWorkouts=document.querySelector('.workouts');
const inputType=document.querySelector('.form__input--type');
const inputDistance=document.querySelector('.form__input--distance');
const inputDuration=document.querySelector('.form__input--duration');
const inputCadence=document.querySelector('.form__input--cadence');
const inputElevation=document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel =13;
  #mapEvent;
  #workouts=[]; 

  constructor () {
    //get  data  from  lcoal  storage
    this._getLocalStorage();
   //  get  users  position
   // this.workouts=[]    
    this._getPosition();    
    //attach  event  handler   
    form.addEventListener('submit', this._newWorkout.bind(this));
    //e.preventDefault(); 
    inputType.addEventListener('change', this._toggleElevationField);  
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
     }  

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
         // console.log(`https://www.google.co.in/maps/@${latitude}, ${longitude}`); //},  
         const coords = [latitude, longitude];
         // console.log(this)
         // this.#map = L.map('map').setView(coords,13); 
         this.#map = L.map('map').setView(coords,this.#mapZoomLevel); 
         //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {    
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(this.#map);
         //handling clicks on  map 
         //this.map.on('click', function(mapE) {    
         this.#map.on('click', this._showForm.bind(this));   
            /*  moved  below 
              mapEvent=mapE;
             //console.log(mapEvent);
             form.classList.remove('hidden');
             inputDistance.focus();
              }); */
            this.#workouts.forEach(work=> {
              this._renderWorkoutMarker(work);
            }); 

            }
    _showForm(mapE) {
      this.mapEvent=mapE;
      //console.log(mapEvent);
      form.classList.remove('hidden');
      inputDistance.focus();
      }; 
    _hideForm() {
      //empty inputs
      inputDistance.valuinputDuration.value=inputCadence.value=inputElevation.value=''; 
      //this  is  extra  code
      form,style.display='none';
      form.classList.add('hidden');
      setTimeout(()=>(form.style.display='grid'), 1000);
    }

     
    _toggleElevationField() {
     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
     inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); 

    }   

    
    _newWorkout(e) {
     const validInputs =(...inputs) =>
       inputs.every(imp => Number.isFinite(inp));
     const allPositive=(...inputs)=> inputs.every(inp=> inp> 0);
     e.preventDefault();
    //get  data  from  form
    const  type=inputType.value;
    const  distance=inputDistance.value;
    const  duration= inputDuration.value;
    const {lat, lng} = this.mapEvent.lasting; 
    let workout;
  
    // if Workout  running  create  running 
    if (type === 'running') {
      const cadence = + inputCadence.value;
      //check  if  data  is  valid
      if (
        //!Number.isFinite(distance) &&
        // !Number.isFinite(duration) &&
        // !Number.isFinite(cadence)   
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers');
        //const workout =new Running(this.#mapEvent.latlng)  
        //const workout =new Running([lat,lng], distance, duration, cadence); 
        workout =new Running([lat,lng], distance, duration, cadence);
        this.#workouts.push(workout); 
    }  

      // if  workout  cycling, create cycling object
   if (type === 'cycling') {
     const elevation =+inputElevation.value;

     if (!validInputs(distance, duration, elevation)||
       !allPositive(distance, duration)  
     )    
       return alert('Inputs have to be positive numbers');
     workout =new Cycling([lat,lng], distance, duration, elevation);

    };

    //and  new  object  to  workout array
    this.workouts.push(workout);
    console.log(workout);
    //render workout  on map as  marker

    this._renderWorkoutMarker(workout);
    //render workout on  list
    this._renderWorkout(workout);

    //hide form + clear input  fields
    this._hideForm();

    //set  lcoal storage to  all  workouts
    this._setLocalStorage();
  }
  // L.marker(coords)
  rednderWorkoutMarker(workout) {
    L.marker([lat,lng])
     .addTo(this.#map)
     //  .bindPopup('A pretty CSS popup.<br> Easily customizable.')
     //.bindPopup('workout')
     .bindPopup(L.popup({
       maxWidth : 250,
       minWidth : 100,
       autoClose : false,
       closeOnClick : false, 
       //className : 'running-popup',
       className : `${workout.type}-popup`,
  
      }))
      // .setPopupContent('Workout')
      //.openPopup();
      //.setPopupContent(workout.distance)
      .setPopupContent(`${workout.type=== 'running' ?   '🏃‍♂️' : '🚴‍♀️'}${workout.description}`)
      .openPopup();
  
     };
    _renderWorkout(workout) {
      let html =`
            <li class="workout workout--${workout.name}" data-id="${workout.id}">
              <h2 class="workout__title">${workout.description}</h2>
              <div class="workout__details">
                 <span class="workout__icon">${workout.name==='running' ?   '🏃‍♂️' : '🚴‍♀️'}  </span>
                 <span class="workout__value">${workout.distance}</span>
                 <span class="workout__unit">km</span>
              </div>
              <div class="workout__details">
                 <span class="workout__icon">⏱</span>
                 <span class="workout__value">${workout.duration}</span>
                 <span class="workout__unit">min</span>
              </div>`;
            if (workout.type==='running') 
              html +=`
               <div class="workout__details">
                 <span class="workout__icon">🏃‍♂️</span>
                 <span class="workout__value">${workout.pace.toFixed(1)}</span>
                 <span class="workout__unit">km</span>
               </div>
               <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">min</span>
               </div>
            </li>
              `;
            if (workout.type==='cycling') 
              html +=`
                <div class="workout__details">
                  <span class="workout__icon">🏃‍♂️</span>
                  <span class="workout__value">${workout.speed.toFixed(1)}</span>
                  <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">⏱</span>
                  <span class="workout__value">${workout.elevationGain}</span>
                  <span class="workout__unit">min</span>
                </div>
                </li>
                `; 
            form.insertAdjacentElement('afterend', html);  
            }

     _moveToPopup(e) {
         //bugfix
        if (!this.#map) return;  
   
        const  workoutEl = e.target.closest('.workout');
          console.log(workoutEl);
        
        if(!workoutEl) return;
        const workout =this. #workouts.find(
            work=>work.id === workoutEl.dataset.id
        );
        console.log(workout);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
           animate: true, 
           pan: {
           duration: 1,
           },
         });
            //using  public  interface
           //workout.click();
         }
          
     _setLocalStorage() {
       localStorage.setItem('workouts'.JSON.stringify(this.#workouts));
       }
     _getLocalStorage() {
       const data= localStorage.getItem('workout')
       console.log(data);
     
       if (!data) return;
         this.#workouts= data;
         this.#workouts.forEach(work => {
           this._renderWorkout(work);
           //this._renderWorkoutMarker(work);
        });
        }
        reset() {
           localStorage.removeItem('workouts');
           location.reload();
        }
     
        }
      const  app=new App();
/*

    _newWorkout(e) {
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
            //className : 'running-popup',
            className : `${type}.popup`,
  
        }))
        .setPopupContent('Workout')
        .openPopup();
       
     };
     inputDistance.value=inputDura



  //render  workout  on  map  as  marker
const {lat, lng} = this.mapEvent.lasting;
 this.rednderWorkoutMarker(workout)
//const {lat, lng} = mapEvent.latlng;   //which  generated after  the  clicking on  map
inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value ='';
this._hidForm() {
    inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value ='';
    form.style.display='none';
    form.classList.add('hidden');
    setTimeout(()= form.style.display='grind' , 1000)
)

}        
tion.value=inputCadence.value=inputElevation.value ='';

 }



let  map, mapEvent; 

class workout {
    date=new Date();
    id =  (new Date() + '').slice(-10); 
    cosntructor(coords,  distance, duration) {
        
        this.coords=coords;
        this.distance=distance;  //  in  km
        this.duration=duration;  //  in min
    }
   _setDescription() {
    const  months =['January','February','March','April','May','June','July','August', 'Septemner','October', 'November', 'December' ];
    this.description = `${this.type[0].toUppercase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
   }

}

class Running extends workout{

    type='running';
    constructor (coords, distance,duration, cadence ) {
        super(coords, distance, duration);
        this.cadence=cadence;
    }
    calcPace() {
        // min.km
        this.pace=this.duration /this.distance;
        return this.pace
    }

 }

 class Cycling extends workout{
    typ='cycling';
    constructor (coords, distance,duration, elevationGain ) {
        super(coords, distance, duration);
        this.elevationGain=elevationGain;
       // this.type='cycling';
        this.calcSpeed();
        this._setDescription();
    }

 calcSpeed() {
    //km/h
    this.speed= this.distance/this.duration / 60 
    return this.speed;
 }
}


//const run1=new Running([39,-12], 5.2,24,178);
//const cycling1=new Running([39,-12], 27,95,523);
//console.log(run1, cycling1);


_moveToPopup(e) {
    const  workoutEl = e.target.closest('.workout');
    console.log(workoutEl);

    if(!workoutEl) return;
    const workout =this. #workouts.find(
        work=>work.id === workoutEl.dataset.id
    );
    console.log(workout);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
        animate: true, 
        pan: {
            duration: 1,
        }
    });
    workout.click();
})
//cosnt app = new App(); 

(method) App._setLocalStorage():void 
//.setLocalStorage() {
  //localStorage.setItem('workouts'.JSON.stringify(this.#workouts));

}
}

        


    


}

}

   

  

.setLocalStorage() {
  localStorage.setItem('workouts'.JSON.stringify(this.#workouts));

}
_getLocalStorage() {
 const data= localStorage.getItem('workout')
 console.log(data);

 if (!data) return;
 this.#workouts= data;
 this.#workouts.forEach(work => {
    this._renderWorkout(work);
    this._renderWorkoutMarker(work);
  }
reset() {
  localStorage.removeItem('workouts');
  location.reload();
}


}
      
cosnt app = new App(); 

   */