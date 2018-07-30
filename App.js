import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants, Permissions, Notifications } from 'expo';
import reducer from './reducers';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import SingleDeck from './components/SingleDeck';
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';
import { blue, white } from './utils/colors';

const NOTIFICATION_KEY = 'Flashcards:notifications'

class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <MainNavigation />
            </Provider>
        );
    }
}

const MyStatusBar = ({ backgroundColor }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} />
        </View>
    )
}

const Tabs = createMaterialTopTabNavigator({
    Decks: {
        screen: DeckList
    },
    "New Deck": {
        screen: NewDeck
    }
}, {
        tabBarOptions: {
            style: {
                backgroundColor: blue
            }
        }
    });

const MainNavigation = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: MyStatusBar
        }
    },
    Deck: {
        screen: SingleDeck
    },
    AddCard: {
        screen: AddCard
    },
    Quiz: {
        screen: QuizView
    }
}, {
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue,
            }
        }
    }
);

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Do your quiz!',
        body: 'Don\'t forget to do today\'s quiz!',
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(16)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

export default App;
