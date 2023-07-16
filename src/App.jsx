import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

const url = "https://api.openweathermap.org/data/2.5/weather?q=";

const App = () => {
  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState("");
  const apiKey = "f631ea87daddf959f8d7a12c30009e4c";

  const fetWeather = async (name = "Bishkek") => {
    const response = await fetch(url + `${name}&appid=` + apiKey);
    const data = await response.json();
    console.log(data);
    setCityData(data);
  };

  useEffect(() => {
    fetWeather();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetWeather(cityName);
    setCityName("");
  };
   const search= () =>{
    fetWeather(cityName)
    setCityName('')
  }

  if (cityData === null) {
    return <h3 style={{ color: "#fff" }}>Loading...</h3>;
  }
  if (cityData?.cod == 404) {
    console.log("error catch");
    return (
      <div className="found">
        <div className="content-found">
          <div className="title-found">
            <h1>
              4<span>0</span>4
            </h1>
            <p>THE PAGE YOU REQUESTED COULD NOT FOUND</p>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Search..."
            />
            <FiSearch type="submit" onClick={()=> search()} className="search-found" />
          </div>
        </div>
      </div>
    );
  }

  const bgImage = (status) => {
    switch (status) {
      case "Clouds":
        return "https://www.almanac.com/sites/default/files/styles/or/public/images/classifying-clouds.jpg?itok=MOBKj7rV";
      case "Rain":
        return "https://images.squarespace-cdn.com/content/v1/5ec22264ee63a0104877932b/1665705011751-6UG5LLL6E9WAHQR00N3T/Raindrops-in-Pool-1280.jpg?format=1500w";
      case "Clear":
        return "https://www.gannett-cdn.com/-mm-/a0a28bd666af6d80b33247a358069ae6b7ce0cc4/c=0-108-2121-1306/local/-/media/2016/08/17/PAGroup/YorkDailyRecord/636070138268132665-ThinkstockPhotos-491701259.jpg";
      case "Snow":
        return "https://img.freepik.com/premium-photo/beautiful-winter-forest-scene-deep-snow-blue-sky-sunny-weather-frost_379823-3747.jpg?w=2000";
        case "Mist":
          return "https://www.mist.com/wp-content/uploads/blog-beyer-1.jpg"
          case "Fog":
            return "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/fog--mist/car-driving-around-a-bend-in-fog.jpg"
            case "Thunderstorm":
              return "https://images.newscientist.com/wp-content/uploads/2019/03/20115708/gettyimages-673747736.jpg"
              case "Drizzle":
                return "https://media.socastsrm.com/wordpress/wp-content/blogs.dir/900/files/2020/11/rain-stock.jpg"
                case "smoke":
                  return "https://cms.iqair.com/sites/default/files/blog/2021-08/CaldorFire_Desktop_B.jpg"
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${bgImage(cityData.weather[0].main)})`,
    transition: "all 1000ms ease" }}
    >
      <div className="conteiner">
        <h3 className="brand">the weather</h3>
        <div>
          <h1 className="temp">
            {Math.round(cityData.main.temp - 273.15)}&#176;
          </h1>
          <div className="city_time">
            <h1 className="name">{cityData.name}</h1>
          </div>
          <div className="weather">
            <img
              src={` http://openweathermap.org/img/wn/${cityData.weather[0].icon}@4x.png`}
              alt="icon"
              className="icon"
              width={"50"}
              height={"50"}
            />
            <span className="condition">{cityData.weather[0].main}</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <form id="locationInput" onSubmit={onSubmit}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="search"
            placeholder="Search Location..."
          />
          <button type="submit" className="submit">
            search
          </button>
        </form>
        <ul className="details1">
          <li>
            <span onClick={()=> onSubmit()}>Canada</span>
          </li>
          <li>
            <span onClick={()=> onSubmit()}>New Yourk</span>
          </li>
          <li>
            <span onClick={()=> onSubmit()}>Tokyo</span>
          </li>
        </ul>

        <ul className="details">
          <li>
            <span>Cloudy</span>
            <span className="cloud">{cityData.clouds.all}%</span>
          </li>
          <li>
            <span>Humidity</span>
            <span className="humidity">{cityData.main.humidity}%</span>
          </li>
          <li>
            <span>Wind</span>
            <span className="wind">{cityData.wind.speed}km/h</span>
          </li>
        </ul>
      </div>
      <div className="presentation"></div>
    </div>
  );
};

export default App;
