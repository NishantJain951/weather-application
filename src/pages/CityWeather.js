import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchCurrentWeather, fetchForecast } from "../api";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import CitySearch from "../components/CitySearch";

const CityWeather = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.current && location?.state?.forecastData) {
      setCurrentWeather(location?.state?.current);
      setForecast(location?.state?.forecastData);
    } else {
      fetchData();
    }
    // eslint-disable-next-line
  }, [location, city]);

  const fetchData = async () => {
    const localCity = localStorage.getItem("city");
    const newCity = city
      ? city
      : localCity && localCity !== ""
      ? localCity
      : "Delhi";
    localStorage.setItem("city", newCity);
    const current = await fetchCurrentWeather(newCity);
    const forecastData = await fetchForecast(newCity);
    if (
      [200, "200", "success"].includes(current?.cod) &&
      [200, "200", "success"].includes(forecastData?.cod)
    ) {
      const data = { current, forecastData };
      localStorage.setItem("city", newCity);
      setCurrentWeather(current);
      setForecast(forecastData);
      navigate(`/weather/${newCity}`, { state: data });
      return;
    }
  };

  const handleSearch = (city) => {
    fetchSearchData(city);
  };

  //Fetch when searched
  const fetchSearchData = async (city) => {
    const current = await fetchCurrentWeather(city);
    const forecastData = await fetchForecast(city);
    if (
      [200, "200", "success"].includes(current?.cod) &&
      [200, "200", "success"].includes(forecastData?.cod)
    ) {
      const data = { current, forecastData };
      localStorage.setItem("city", city);
      navigate(`/weather/${city}`, { state: data });
      return;
    }
    alert("Please enter a valid city!");
  };

  return (
    <>
      {location.pathname.includes("weather") ? (
        <div className="header-class-row" align="center">
          <h1 className="weather-header">Weather Report</h1>
          <div>
          <CitySearch
            onSearch={handleSearch}
            value={decodeURIComponent(location.pathname.split("/")[2])}
          />
          </div>
          
        </div>
      ) : (
        <></>
      )}
      <div>
        <CurrentWeather data={currentWeather} city={city} />
        <Forecast data={forecast} />
      </div>
    </>
  );
};

export default CityWeather;
