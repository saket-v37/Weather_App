// api id and api address
const api={
    key:"04edf30b1ca360b0dc583cd87ba6e58d",
    base:"https://api.openweathermap.org/data/2.5/",
}
let unit="celsius";

// fetching weather by geolocation
window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            fetch(`${api.base}weather?lat=${lat}&lon=${long}&appid=${api.key}`)
            .then(weather=> {
                return weather.json();
            }).then(displayResults);
        });
    }
    else{
        alert("Allow Geolocation To View Weather Report")
    }
});

// adding event when "enter" is pressed
const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
// passing the search box valu to getesults function
function setQuery(evt){
    if(evt.keyCode==13){
        getResults(searchbox.value);
    }
}
// fetching the data from the api
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather=> {
          return weather.json();
      }).then(displayResults);
}
// display weather
function displayResults(weather){
    // console.log(weather);
    let icon=document.querySelector('.location .weather-icon');
    icon.innerHTML=`<img src="icons/${weather.weather[0].icon}.png"/>`;

    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el=document.querySelector('.current .weather');
    weather_el.innerText=weather.weather[0].main;

    if(weather_el.textContent=="Clouds"){
        document.body.style.backgroundImage="url('image/cloud.jpg')";
    }
    else if(weather_el.textContent=="Clear"){
        document.body.style.backgroundImage="url('image/clear.jpg')";
    }
    else if(weather_el.textContent=="Haze"){
        document.body.style.backgroundImage="url('image/haze.jpg')";
    }
    else if(weather_el.textContent=="Rain"){
        document.body.style.backgroundImage="url('image/rain.jpg')";
    }
    else{
        document.body.style.backgroundImage="url('image/snow.jpg')";
    }

    let hilow=document.querySelector('.hi-low span');
    hilow.innerText=` ${Math.round(weather.main.temp_min)}°c/ ${Math.round(weather.main.temp_max)}°c`;

    let wind=document.querySelector('.wind span');
    wind.innerText=` ${(weather.wind.speed)}`;
// add function that convert celsius to fahrenheit
    function celsiusToFahrenheit(d){
        return(d *9/5)+32;
    }
    temp.addEventListener("click", function(){
        if(unit=="celsius"){
            let fahrenheit=celsiusToFahrenheit(weather.main.temp);
            fahrenheit=Math.floor(fahrenheit);

            temp.innerHTML=`${fahrenheit}<span>°f</span>`
            unit="fahrenheit";
        }
        else{
            temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
            unit="celsius";
        }
    });
}
// setting up the date
function dateBuilder(d){
    let months=["January","Fabruary","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear(); 
    return `${day}, ${date} ${month} ${year}`;

}
