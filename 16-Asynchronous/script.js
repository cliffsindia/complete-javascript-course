'use strict';

const  btn=document.querySelector('.btn-country');
const countriesContainer=document.querySelector('.countries');

const request=new XMLHttpRequest(); 
request.open('GET', 'https://restcountries/eu.rest/v2/name/portugal');
request.send();
//data=request.send();
console.log(request.responseText);

request.addEventListener('Load', function() {
  console.log(request.responseText); 

});

/*const renderCountry=function(data, className='') {
    const html=`
    <article class="country ${className}>
          <img class="country__img" src="#{data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population /100000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.computedStyleMap.opacity=1;
};*/
renderCountry('portual');
renderCountry('Indial');
