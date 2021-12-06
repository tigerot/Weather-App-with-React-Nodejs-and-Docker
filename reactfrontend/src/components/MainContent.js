import React from 'react';
import Forecast from './Forecast';

import '../components/MainContent.css'; 

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.forecasts = [];
    this.state = { allForecasts: [] , modified: false };
    this.handleClick = this.handleClick.bind(this);
    this.renderForecast = this.renderForecast.bind(this);
  } 
  
  createForecast = (forecast) => {
    const city = forecast.city;     
    const time_now = forecast.time_now;
    let forecastDays = [];  
    
    for (let i = 0; i < forecast.consolidated_weather.length; i++) {
      const date_of_forecast = forecast.consolidated_weather[i].applicable_date;
      const max_temp = Math.round(forecast.consolidated_weather[i].max_temp);
      const min_temp = Math.round(forecast.consolidated_weather[i].min_temp);
      const now_temp = i === 0 ? Math.round(forecast.consolidated_weather[i].the_temp) : '';
      const weather_state_name = forecast.consolidated_weather[i].weather_state_name;
      const weather_state_abbr = forecast.consolidated_weather[i].weather_state_abbr;
     
      forecastDays.push({date_of_forecast, max_temp, min_temp, now_temp, weather_state_name, weather_state_abbr});
    }

    return {city, time_now, forecastDays};
  }
 
  createForecastComponent = (data) => {
    return (<Forecast key={Math.floor(Math.random() * 100)} city={data.city} time={data.time_now} forecastDays={data.forecastDays}/>) 
  } 
  
  renderForecast() {
    
    let components = [];
    for(let i = 0; i < this.state.allForecasts.length; i++) {
      let forecastProps = this.createForecast(this.state.allForecasts[i]); 
        
      components.push(this.createForecastComponent(forecastProps));      
    }

    return components;     
  }

  handleClick(event) {
    
    let el = document.querySelector("input[type='text']");
    if (el.value === '')
      return;

    let locName = el.value;    
    
    console.log(locName);
    
    const url = `http://localhost:5000/forecasts/${locName}/`;    
    fetch(url)
      .then(response => { return response.json(); })
        .then(data => {               
          const date = new Date();
          const time_now = date.getHours() + ':' + date.getMinutes();
          
          this.forecasts.push({ city: locName, time_now , consolidated_weather: data.consolidated_weather});
          
          if(this.forecasts.length > 3) {
            this.forecasts.shift();            
          }

          this.setState({allForecasts: this.forecasts});          
        })
          .catch(err => {
            console.log(err);
          });                         
  }    

  render() {
    console.log("this.state.allForecasts: ", this.state.allForecasts);
    const allComponents = this.renderForecast();
    return(      
      <div>
        <div>
          <input className="text_input" type="text" name="search" placeholder="Search for location"/> 
          <button className="button" type="button" name="button" value="getWeather" onClick={this.handleClick}>Get Weather</button>        
        </div>
        <div className="all-forecasts">          
          { (this.state.allForecasts === undefined || this.state.allForecasts.length < 1) && (<h3>No forecasts to show</h3>)}
          {(this.state.allForecasts && this.state.allForecasts.length >= 1) && (allComponents.map(item => {return item;} ))}          
        </div>                     
      </div>
    );
  }
}

export default MainContent;
