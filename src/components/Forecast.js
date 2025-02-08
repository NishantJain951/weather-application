import React from "react";
import { format, isToday } from "date-fns";
import "../styles/forecast.css";

const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Group forecast data by day
  const groupedForecast = data.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract the date part
    if (!acc[date]) {
      acc[date] = []; // Initialize an array for each day
    }
    acc[date].push(item); // Push the 3-hourly data into the array for that day
    return acc;
  }, {});

  // Convert the grouped data into an array of days
  const forecastData = Object.entries(groupedForecast).slice(0, 5);

  const formatDate = (date) => {
    if (isToday(new Date(date))) {
      return "Today";
    } else {
      return format(new Date(date), "d MMM (eee)");
    }
  };

  return (
    <div className="forecast">
      <h3 className="forecast-title">Next 5 days forecast</h3>
      <div className="forecast-list">
        {forecastData.map(([date, dayData], index) => {
          // Get min and max temperature for the day
          const temperatures = dayData.map((item) => item.main.temp);
          const minTemp = Math.min(...temperatures);
          const maxTemp = Math.max(...temperatures);

          return (
            <div key={index} className="forecast-day">
              <div className="forecast-day-summary">
                <div className="forecast-day-header">
                  <p className="forecast-day-date">{formatDate(date)}</p>
                  <div className="forecast-day-temps">
                    <p className="temp-min">
                      {Math.round(minTemp)}°C - {Math.round(maxTemp)}°C
                    </p>
                    {/* <p className="temp-min">{Math.round(maxTemp)}°C</p> */}
                  </div>
                </div>
                <p className="forecast-day-description">
                  {dayData[0].weather[0].description}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${dayData[0].weather[0].icon}.png`}
                  alt={dayData[0].weather[0].description}
                  className="forecast-icon"
                />
              </div>
              <div className="forecast-day-details">
                {dayData.map((item, idx) => (
                  <div key={idx} className="forecast-hourly-item">
                    <p className="forecast-hour">
                      {format(new Date(item.dt_txt), "h:mm a")}
                    </p>
                    <p className="forecast-temp">
                      {Math.round(item.main.temp)}°C
                    </p>
                    <p className="forecast-description">
                      {item.weather[0].description}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="forecast-hourly-icon"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;