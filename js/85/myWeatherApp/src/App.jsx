import { Component } from "react";
import "./App.css";
import WeatherWidget from "./WeatherWidget";

export default class App extends Component {
  state = {
    weather: [],
    locations: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  };

  async componentDidMount() {
    try {
      const response = await fetch("./weatherObject");

      const result = await response.json();

      this.setState({ weather: result });

      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <h1 className="header">
          Pcs Weather – Get all your weather needs here
        </h1>

        <div className="appContainer">
          {this.state.weather.length === 0 ? (
            <div className="loadingDiv">
              Hang tight, we're still loading all the goodies for you!
            </div>
          ) : (
            this.state.locations.map((l) => (
              <WeatherWidget key={l} name={l} weather={this.state.weather} />
            ))
          )}
        </div>
        <div className="sidebar">
          <h3>Locations</h3>
          <ul className="locationList">
            {this.state.locations?.map((loc, i) => (
              <li key={i}>{loc}</li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
