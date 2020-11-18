//importing navigation libraries
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//importing screens
import HOME from './pages/HOME';
import LOCATION from './pages/LOCATION';
import CREDITS from './pages/CREDITS';
import errorpage from './pages/errorpage';
import WEATHER from './pages/WEATHER.jsx';
import CONVERTER from './pages/CONVERTER';

//creating navigator
const navigator = createStackNavigator(
  {
    HOME: { screen: HOME },
    LOCATION: { screen: LOCATION },
    CREDITS: { screen: CREDITS },
    errorpage: { screen: errorpage },
    WEATHER: { screen: WEATHER }, 
    CONVERTER: { screen: CONVERTER }
  });

export default createAppContainer(navigator);