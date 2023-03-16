// https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit={limit}&appid=${API_KEY}

const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const input = document.querySelector("input")
const weather = document.querySelector("#weather")
const locationn = document.querySelector("#location")
const dayDate = document.querySelector("#dayDate")
const userLocation = document.querySelector("#userLocation")
const userTemp = document.querySelector("#userTemp")

const successCallback = (position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let lat = position.coords.latitude;
    var lon = position.coords.longitude;
    getCoordinate(lat,lon);
    
  }; 
  const errorCallback = (error) => {
    userTemp.innerHTML = `<h5>Please Allow Location</h5><p>
    to get your location</p>
    <button onClick="navigat()">Allow Location</button>
    <img src="Assets/LoadingWeather.gif" alt="Img_not_Found">
     `
    console.log(error);
  };

  const getCoordinate= async(lat,lon) =>{
    console.log(lat +" aditya " +lon)
 var limit =1
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`
    const response =await  fetch(url);
    const data =await response.json()
    console.log(data)
    console.log(data[0].name +" "+ data[0].state ) 
    userLocation.innerHTML = `<p><b>${data[0].name}</b></p>`
    getMyWeather(data[0].name)
    // const urll = `https://api.openweathermap.org/data/2.5/weather?q=${data[0].name}&appid=${API_KEY}&units=metric`
    // const responsee = await fetch(url);
    // const dataa = await response.json()
    
}

const getMyWeather= async(city) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()  
    console.log(data)
    userTemp.innerHTML = `<p>Your Weather ${data.main.temp} ℃</p>
    <img src="Assets/LoadingWeather.gif" alt="Img_not_Found">`
    
}
 function navigat(){ 
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
navigat()

const timing = () =>{
var date = new Date()
// console.log(date)
dayDate.innerHTML = `<p>${date.toUTCString()}</p>`
}

setInterval(() => {
    timing()
}, 1000);







    // const API = `https://api.openweathermap.org/data/2.5/weather?
    // q=${city}&appid=${API_KEY}&units=metric`
    // const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        locationn.innerHTML = `<div></div>`
        return;
    }
    weather.innerHTML = `
        <div class="imgage">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h3>${data.weather[0].description} </h3>
          <!--  <h4> ${data.weather[0].main} </h4> -->
        </div>
    `
    locationn.innerHTML = `<div class="Country">Location ${data.sys.country}</div>`
    console.log(data);
}


const myFunction = (  
    function(event) {
        if(search.value==""){
            event.preventDefault();
        }
        else{
            getWeather(search.value)
        event.preventDefault();
        }
       
    }
)
// const myFunction = (

//     function(event) {
//         getWeather(search.value)
//     }
// )

form.addEventListener(
    "submit",
    
    function(event) {
        if(search.value==""){
            alert("Please Enter City name: ");
            event.preventDefault();
        }
        else{
            getWeather(search.value)
        event.preventDefault();
        }
       
    }
)