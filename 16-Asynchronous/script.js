/*const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
  };
  
  getCountryData('portugal');
  getCountryData('usa');
  getCountryData('germany');
*/
 const getCountryAndNeighbour = function (country) {
    //ajax call  country
    const request = new XMLHttpRequest();
   // request.open('GET', `https://restcountries.com/rest/v2/name/${country}`);
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
    // render  country
        renderCountry(data);
    //  get  neighbour country
        const [neighbour]=data.borders;
    
        if (!neighbour) return;

        //ajax  call  country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET',  `https://restcountries.com/v2/alpha/${neighbour}`);

        request2.addEventListener('load', function () {
           const data2 = JSON.parse(this.responseText);
           console.log(this.responseText);
           console.log(data2);   
           renderCountry(data2);
    });
    });
};

getCountryAndNeighbour('portugal')

const getCountryAndNeighbour1 = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour1('portugal');
getCountryAndNeighbour1('usa');



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
    countriesContainer.style.opacity=1;
});
*/


const renderCountry=function(data, className='') {
  const html=`    
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}"/>
  <div class="country__data">
  <h3 class="country__name">${data.name}</h3> 
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>N</span>${(data.population/100000).toFixed(1)}people</p>
  <p class="country__row"><span>?</span>${data.languages[0].name}</p>
  <p  class="country__row"><span>$</span>${data.currencies[0].name}</p>
 </div>
 </article> `;
 countriesContainer.insertAdjacentHTML('beforeend',html);
 countriesContainer.style.opacity=1;
};
 
//*.
//renderCountry('portual');
//renderCountry('Indial');
getCountryData('portugal');
getCountryData('usa');
getCountryAndNeighbour1('portugal');
getCountryAndNeighbour1('usa');


setTimeout(() => {
  console.log('1  second passed');
},1000);

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

