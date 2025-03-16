const request=fetch('https://restcountries.com/v2/name/portugal');
 // request.send();')
console.log(request);
/*
const  getCountryData = function (country) {
   fetch(`https:/restcountries.eu/rest/v2/name/${country}`).then
    (function (
        response
    ) {
        console.log(response);
        return response.json();
    })
     .then(function (data) {
        console.log(data);
        renderCountry(data[0]);
     });
};
getCountryData('portugal');
*/
const getCountryData = function (country) {
    fetch(`https:/restcountries.eu/rest/v2/name/${country}`)
    .then(response =>response.json())
    .then(data => renderCountry(data[0]));
};   
  getCountryData('portugal');

const whereAmI = function (lat,lng) {
    fetch(`https://geocode.xyz/${lat},${lng}? geoit=json`)
      .then(res => {
        console.log(res);
        if (!res.ok) throw new Error('problem with geocoding ${res.status}');
        return res.json();
      })   
      .then(data=>  {
        console.log(data);
        console.log(`you are in ${data.city}, ${data.country}`);
        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`); 
    
      })
       .then(res => {
         if (!res.ok)
            throw new Error(`Country not  found (${resonse.status})`);
         return response.json();   
        })
       .then(data => renderCountry(data[0]))
      .catch(err => console.error(`${err.message}`));  
  };

whereAmI(52.568,13.381);
whereAmI(19.037,72.873);
whereAmI(-33.933,18.474);