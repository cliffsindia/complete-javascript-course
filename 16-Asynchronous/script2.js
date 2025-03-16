console.log('Test start');
setTimeout(() => console.log('0 sec  timer'), 0);
Promise.resolve('Resolved promise 1').then(res=> 
    console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
    for  (let i=0; i < 1000000; i++) {}
    console.log(res);
});

console.log('Test end');

const  lotteryPromise = new Promise(function(resolve, reject) {
    console.log('Lottery draw is happening');
    setTimeout(function() {
    if(Math.random() >= 0.5) {
        resolve('You  win' )  
    } else {
        reject(new Error ('You  lost  your  mmoney'));
    }
 }, 2000)
});

 lotteryPromise.then(res => console.log(res)).catch 
    (err => console.error(err));
    
//promisefying  setTimeout

const  wait =  function (seconds) {
    return  new Promise(function(resolve ) {
        setTimeout(resolve, seconds * 1000)
    });
};
wait(2).then(() => {
    console.log('I waited  for  2  seconds');
    return  wait(1);
}) 
.then(()=> console.log('I  waited  for  1  seconds'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new  Error('problem')).catch( x => 
    console.error(x));

navigator.geolocation.getCurrentPosition(
    position => console.log(position),
    err=> console.error(err)
);

const getposition = function() {
    return  new Promise(function(resolve, reject) {
       /* navigator.geolocation.getCurrentPosition(
            position => console.log(position),
            err=> console.error(err)
            */
            navigator.geolocation.getCurrentPosition(resolve,reject);
       // );
    });

};
getposition().then(pos => console.log(pos));

const whereAmI = function () {
    getposition().then(pos => {
        console.log(pos.coords);
        const {latitude : lat,longitude : lng} =pos.coords;
        return fetch(`https://geocode.xyz/${lat},${lng}? geoit=json`)
    })
    //fetch(`https://geocode.xyz/${lat},${lng}? geoit=json`)
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

btn.addEventListerner('click', whereAMI);   

whereAmI(52.568,13.381);