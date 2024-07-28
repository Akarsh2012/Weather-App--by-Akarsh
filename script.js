const url = 'https://weather-api138.p.rapidapi.com/weather';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '7d32be6fddmsh896b8f4e4816e55p1a0386jsn14c17001dddf',
    'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
  }
};

// Get the HTML elements
let max_temp, min_temp, humidity, feel_like, wind_speed, wind_degrees, sunrise, sunset, cityname, default_name, temp, humidity2, desc;

window.onload = function () {
  max_temp = document.getElementById('max_temp');
  temp = document.getElementById('temp');
  min_temp = document.getElementById('min_temp');
  humidity = document.getElementById('humidity');
  humidity2 = document.getElementById('humidity2');
  feel_like = document.getElementById('feel_like');
  wind_speed = document.getElementById('wind_speed');
  wind_degrees = document.getElementById('wind_degrees');
  sunrise = document.getElementById('sunrise');
  sunset = document.getElementById('sunset');
  cityname = document.getElementById('cityname');
  desc = document.getElementById('desc');

  default_name = "Delhi";
  getWeather(default_name);
};

const getWeather = async (city) => {
  cityname.innerHTML = city;
  const response = await fetch(`${url}?city_name=${city}`, options);
  const result = await response.json();
  console.log(result);

  // Access properties from the result object
  temp.innerHTML = (result.main.temp - 273).toFixed(1);
  max_temp.innerHTML = (result.main.temp_max - 273).toFixed(1);
  min_temp.innerHTML = (result.main.temp_min - 273).toFixed(1);
  humidity.innerHTML = result.main.humidity;
  humidity2.innerHTML = result.main.humidity;
  // cloud_pct.innerHTML = result.clouds.all;
  feel_like.innerHTML = (result.main.feels_like - 273).toFixed(1);
  wind_speed.innerHTML = result.wind.speed;
  wind_degrees.innerHTML = result.wind.deg;
  const descript=result.weather[0].description;
  desc.innerHTML =  descript.charAt(0).toUpperCase() + descript.slice(1);;


  const formattedTime1 = getinampm(result.sys.sunrise);
  sunrise.innerHTML = formattedTime1;

  const formattedTime2 = getinampm(result.sys.sunset);
  sunset.innerHTML = formattedTime2;

  function getinampm(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
  }
};

document.getElementById('submit').addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  getWeather(city);
  // document.getElementById('city').value = '';
});

const array = ["Australia", "London", "Switzerland", "Nepal"];

const getwet = async (element) => {
  const respons = await fetch(`${url}?city_name=${element}`, options);
  const res = await respons.json();
  console.log(res);

  let h = (res.main.temp - 273).toFixed(1);
  let d = (res.main.temp_max - 273).toFixed(1);
  let e = (res.main.temp_min - 273).toFixed(1);
  let c = res.main.humidity;

  let a = res.clouds.all;
  let b = (res.main.feels_like - 273).toFixed(1);
  let j = res.wind.speed;
  let i = res.wind.deg;

  const f = getinampms(res.sys.sunrise);
  const g = getinampms(res.sys.sunset);

  function getinampms(unixTimestamp) {
    const dates = new Date(unixTimestamp * 1000);
    const hourss = dates.getHours().toString().padStart(2, '0');
    const minutess = dates.getMinutes().toString().padStart(2, '0');
    const times = `${hourss}:${minutess}`;
    return times;
  }
  const ans = [a, b, c, d, e, f, g, h, i, j];
  return ans;
}

const updateWeatherData = async () => {
  for (let i = 0; i < array.length; i++) {
    const list = await getwet(array[i]);
    const nums = document.getElementsByClassName(array[i]);
    for (let j = 0; j < nums.length; j++) {
      nums[j].innerHTML = list[j];
    }
  }
}

updateWeatherData();

