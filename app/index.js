import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Provider } from 'react-redux';

import './reducers';

import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
import store from './config/store';

EStyleSheet.build({
  $primaryBlue : '#4F6D7A',
  $primaryOrange : '#D57A66',
  $primaryGreen : '#00BD9D',
  $primaryPurple : '#9E798F',

  $white:     '#FFF',
  $border:    '#E2E2E2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkGray: '#343434',
  $darkText: '#343434',

  // $outline: 1,
})

// console.disableYellowBox = true;

export default () => (
  <Provider store={store}>
    <AlertProvider>
      <Navigator onNavigationStateChange={null} />
    </AlertProvider>
  </Provider>
);