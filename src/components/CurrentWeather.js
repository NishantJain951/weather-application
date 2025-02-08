import "../styles/currentWeather.css";

const CurrentWeather = ({ data, city }) => {
  if (!data) return (
    <div className="current-weather-container">
      <div className="current-weather">
        <h2 className="city-name">No weather data available {city ? `for ${city}` : ''}</h2>
      </div>
    </div>
  );

  return (
    <div className="current-weather-container">
      <div className="current-weather">
        <h3 className="city-name">{data?.name || city}</h3>
        <p className="weather-description">{data.weather[0].description}</p>
        <div className="temperature">
          <p>{Math.round(data.main.temp)}°C</p>
        </div>
        <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;