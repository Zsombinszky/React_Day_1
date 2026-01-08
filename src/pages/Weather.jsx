import { useEffect, useState } from "react";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  /* useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `${API_URL}?q=London&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); */

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Weather</h1>
      {/* INPUT */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />

        <button
          disabled={loading}
          onClick={fetchWeather}
          className={`px-4 py-2 bg-blue-600 text-white rounded transition-colors${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {loading && <p>Loading weather data...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {weather && (
        <div className="bg-white rounded-xl shadow p-4 max-w-sm">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-slate-600">{weather.weather[0].description}</p>
          <p className="text-2xl font-bold mt-2">{weather.main.temp} °C</p>
        </div>
      )}
    </>
  );
};

export default Weather;
