import React, { useState } from "react";
import axios from "axios";



export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
 // Use your actual API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-300">
      <h1 className="text-3xl font-bold text-white mb-4">Weather App</h1>
      <input
        type="text"
        className="p-2 rounded-md shadow-md"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="mt-4 px-4 py-2 bg-white rounded-md text-blue-500 font-bold hover:bg-gray-200"
      >
        Get Weather
      </button>
      {weather && (
        <div className="mt-6 text-white">
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
}
