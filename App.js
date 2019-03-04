import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import { API_KEY } from './utils/WeatherAPIKey';

import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});







/*import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
 } from 'react-native';

import axios from 'axios';
import weather from "./components/Weather.js"

const API_KEY = "42a0fda9307c656987e32f21c5b57aab";
const default_zipcode = 90803;
const default_country_code = 'us';

export default class App extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      zipcode: default_zipcode,
      country_code: default_country_code,
      days: [],
    }
  }

  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather />}
      </View>
    );
  }
}
  /*
  _getForecast(zipcode,country_code)
  {
    const request_url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "," + country_code + "&APPID=" + API_KEY + "";
    return fetch(request_url)
    .then(function(response)
    {
      alert(response.status);
      return response.json();
    })
    .then(function(json)
    {
      return
      {
          console.log(JSON.stringify(json));
      }
    })
    .catch(function(error)
    {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });
  }


  render()
  {
    if(this.state.days.length <=0)
    {
      var json = this._getForecast(this.state.zipcode);

      alert(JSON.stringify(json));
    }
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
'''
Alexander Fielding
Weather API module
copyright @ Alexander Fielding
'''

import requests
from pprint import pprint

key = input('Enter key received from open weather map')
city = input('Enter the city to check weather conditions for')_

#api.openweathermap.org/data/2.5/weather?id=2172797
r = requests.get('http://api.openweathermap.org/data/2.5/weather?q='
 + city + ',uk&APPID=' + key + '')

pprint(r.json())

key = '42a0fda9307c656987e32f21c5b57aab'
city = 'London'
*/
