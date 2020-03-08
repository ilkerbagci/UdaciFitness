import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { white, purple } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = {
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        },
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        },
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: 'Live',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
        }
    }
}

const navigationOptions = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
}

const TabNav = Platform.OS === 'ios' ? createBottomTabNavigator(Tabs, navigationOptions) : createMaterialTopTabNavigator(Tabs, navigationOptions)

const TabsContainer = createAppContainer(TabNav)

const MainNavigator = createStackNavigator({
    Home: {
        screen: TabsContainer,
        navigationOptions: {
            header: null,
        },
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
        }),
    }
})

const MainNavigatorContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
                    <MainNavigatorContainer />
                </View>
            </Provider>
        )
    }
}