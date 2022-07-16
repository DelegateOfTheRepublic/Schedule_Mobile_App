import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Button,
  Image,
  Alert
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import {AddButton} from '../uis/addButton'

export const SubjectsScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const route = useRoute()

    return (
        <View>
            <ScrollView style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%' }}>
                {route.params?
                 <View style = {{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red', padding: 10 }}>
                     <Text style = {{ alignSelf: 'flex-start' }}>{route.params.subject}</Text>
                     <View style={{ backgroundColor: route.params.color, borderRadius: 13, width: 26, height: 26}}
                />
                </View> 
                :
                 null}
            </ScrollView>
            <AddButton navigation={navigation} screen='AddSubject'/>
        </View>
    );
}