//importing navigation libraries
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//importing screens
import Home from './pages/Home';
import FindMe from './pages/FindMe';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';

const request = require("request")
const url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=b397a6ae6b55b8a60056d40ab62b8972"
request(url, (error, response, body) => {
  const data = JSON.parse(body)
  console.log(data)
})

//creating navigator
const navigator = createStackNavigator(
  {
    Home: { screen: Home },
    FindMe: { screen: FindMe },
    AboutUs: { screen: AboutUs },
    ErrorPage: { screen: ErrorPage }
  });

export default createAppContainer(navigator);