import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import TabNav from './components/TabNavigator'
import Constants from 'expo-constants'
import { purple } from './utils/colors'

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                    <TabNav />
                </View>
            </Provider>
        )
    }
}