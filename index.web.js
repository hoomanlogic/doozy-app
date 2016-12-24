// PACKAGES
import { AppRegistry } from 'react-native';
import App from 'doozy/app';

/******************************************
 * APP INITIALIZATION
 *****************************************/
AppRegistry.registerComponent('doozy', () => App);
AppRegistry.runApplication('doozy', { rootTag: document.getElementById('react-app') });
