//importing navigation libraries
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

//importing screens
import home from './pages/home';
import findme from './pages/findme';
import developer from './pages/developer';
import errorpage from './pages/errorpage';
import weather from './pages/weather.jsx';
import converter from './pages/converter';

//creating navigator
const navigator = createStackNavigator(
  {
    home: { screen: home },
    findme: { screen: findme },
    developer: { screen: developer },
    errorpage: { screen: errorpage },
    weather: { screen: weather }, 
    converter: { screen: converter }
  });

export default createAppContainer(navigator);