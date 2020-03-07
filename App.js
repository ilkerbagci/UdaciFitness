import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import  reducer from './reducers';
import TabNav from './components/TabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore( reducer)}>
        <View style={{ flex: 1}}>
          <TabNav />
        </View>
      </Provider>
    );
  }
}