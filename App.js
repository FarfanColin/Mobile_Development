//importing navigation libraries
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//importing screens
import Home from './pages/Home';
import FindMe from './pages/FindMe';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import weather from './pages/weather.jsx';

//creating navigator
const navigator = createStackNavigator(
  {
    Home: { screen: Home },
    FindMe: { screen: FindMe },
    AboutUs: { screen: AboutUs },
    ErrorPage: { screen: ErrorPage },
    weather: { screen: weather }
  });

export default createAppContainer(navigator);