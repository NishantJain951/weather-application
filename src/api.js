import axios from "axios";

const API_KEY = "0302f769294dd3a715a9261f84540f35"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeather = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      console.log("Current Weather Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };
  
  export const fetchForecast = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      console.log("Forecast Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };
  