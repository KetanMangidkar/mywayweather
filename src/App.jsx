import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;
  border: black solid 1px;
  border-radius: 2px;
  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: Montserrat;
    font-weight: bold;
  }
  & button {
    background-color: black;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: bold;
  }
`;
const ChooseCityLabel = styled.span`
  color: black;
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
`;

export const WeatherIcons = {
  "01d": "/react-weather-app/icons/sunny.svg",
  "01n": "/react-weather-app/icons/night.svg",
  "02d": "/react-weather-app/icons/day.svg",
  "02n": "/react-weather-app/icons/cloudy-night.svg",
  "03d": "/react-weather-app/icons/cloudy.svg",
  "03n": "/react-weather-app/icons/cloudy.svg",
  "04d": "/react-weather-app/icons/perfect-day.svg",
  "04n": "/react-weather-app/icons/cloudy-night.svg",
  "09d": "/react-weather-app/icons/rain.svg",
  "09n": "/react-weather-app/icons/rain-night.svg",
  "10d": "/react-weather-app/icons/rain.svg",
  "10n": "/react-weather-app/icons/rain-night.svg",
  "11d": "/react-weather-app/icons/storm.svg",
  "11n": "/react-weather-app/icons/storm.svg",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;

function App() {
  const [city, updateCity] = useState();
  const [cityData, setCityData] = useState();
  const arr = [];
  if (cityData) {
    arr.push(cityData);
  }

  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `http://localhost:8080/weather/?q=${city}`
    );
    console.log(response.data.results.channel);
    setCityData(response.data.results.channel);
  };
  return (
    <Container>
      <AppLabel>Weather App</AppLabel>

      <>
        <ChooseCityLabel>Find Weather of your city</ChooseCityLabel>
        <SearchBox onSubmit={fetchWeather}>
          <input
            onChange={(e) => updateCity(e.target.value)}
            placeholder="City"
          />
          <button type={"submit"}>Search</button>
        </SearchBox>
      </>

      {arr &&
        arr.map((e) => (
          <div key={e.location.city}>
            <div>
              <h1>
                {e.location.city},{e.location.country},{e.location.region}
              </h1>
              <h1>{e.atmosphere.humidity} C</h1>
              <p>Sunrise:-{e.astronomy.sunrise}</p>
              <p>Sunset:-{e.astronomy.sunset}</p>
            </div>
            <div style={{ display: "flex", border: "1px solid black" }}>
              <div>
                <p>
                  {e.item.forecast[1].date},{e.item.forecast[1].day}
                </p>
                <p>HIGH:-{e.item.forecast[1].high}</p>
                <p>LOW:-{e.item.forecast[1].low}</p>
                <p>
                  <b>{e.item.forecast[1].text}</b>
                </p>
              </div>
              <div>
                <p>
                  {e.item.forecast[2].date},{e.item.forecast[2].day}
                </p>
                <p>HIGH:-{e.item.forecast[2].high}</p>
                <p>LOW:-{e.item.forecast[2].low}</p>
                <p>
                  <b>{e.item.forecast[2].text}</b>
                </p>
              </div>
              <div>
                <p>
                  {e.item.forecast[3].date},{e.item.forecast[3].day}
                </p>
                <p>HIGH:-{e.item.forecast[3].high}</p>
                <p>LOW:-{e.item.forecast[3].low}</p>
                <p>
                  <b>{e.item.forecast[3].text}</b>
                </p>
              </div>
            </div>

            <div>
              <table>
                <th>
                  {e.location.city},{e.location.country},{e.location.region}
                </th>

                <tr>
                  <td>wind:</td>
                  <td>{e.wind.speed}</td>
                </tr>
                <tr>
                  <td>Humidity:</td>
                  <td>{e.atmosphere.humidity}</td>
                </tr>
                <tr>
                  <td>Pressure:</td>
                  <td>{e.atmosphere.pressure}</td>
                </tr>
              </table>
            </div>
          </div>
        ))}
    </Container>
  );
}

export default App;
