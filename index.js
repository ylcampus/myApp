/** @format */

import {YellowBox, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Method',
  'WebView',
  'Accessing view manager configs'
]);

AppRegistry.registerComponent(appName, () => App);
