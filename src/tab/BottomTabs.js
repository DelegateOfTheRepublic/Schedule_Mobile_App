import React from 'react';
import {
    Text,
    View,
    Image
  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeworkScreen } from '../screens/Homework';
import { ListsScreen} from '../screens/Lists'
import { HomeScreen } from '../screens/Home';

export const BottomTabs = (props) => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { height: 60, paddingTop: 12 }, tabBarShowLabel: false, headerShown: false }} initialRouteName = 'Home'>
            <Tab.Screen 
                name='Lists' 
                component={ListsScreen}
                options = {{
                    tabBarItemStyle: { flex: 1, flexDirection: 'column', height: 35 },
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{ width: '100%', alignItems: 'center'}}>
                                <Image source={require('../icons/lists.png')} style={{ tintColor: focused ? 'purple' : 'black', width: 25, height: 25 }}/>
                                {focused ? 
                                    <Text style={{ fontSize:10.5, color:'purple'}}>Списки</Text>:
                                    null
                                }
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen 
                name='Home' 
                component={HomeScreen}
                options = {{
                    tabBarItemStyle: { flex: 1, flexDirection: 'column', height: 35 },
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{ width: '100%', alignItems: 'center'}}>
                                <Image source={require('../icons/home.png')} style={{ tintColor: focused ? 'purple' : 'black', width: 25, height: 25 }}/>
                                {focused ? 
                                    <Text style={{ fontSize:10.5, color:'purple'}}>Главная</Text>:
                                    null
                                }
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen 
                name='Homework' 
                component={HomeworkScreen}
                options = {{
                    tabBarItemStyle: { flex: 1, flexDirection: 'column', height: 35 },
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{ width: '100%', alignItems: 'center'}}>
                                <Image source={require('../icons/homework.png')} style={{ tintColor: focused ? 'purple' : 'black', width: 25, height: 25 }}/>
                                {focused ? 
                                    <Text style={{ fontSize:10.5, color:'purple'}}>Д/з</Text>:
                                    null
                                }
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}