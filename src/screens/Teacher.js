import { useRoute } from '@react-navigation/native';
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
  Image
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import { AddButton } from '../uis/addButton';

export const TeachersScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const route = useRoute();

    const teacherData = []
    for (const key in route.params){
        teacherData.push(
            <Text key={key}>{route.params[key]}</Text>  
        );
    }

    return (
        <View>
            <ScrollView style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%' }}>
            {route.params?
                <View style = {{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red', padding: 10 }}>
                    {teacherData}
                </View> 
                :
                null
            }
            </ScrollView>
            <AddButton navigation={navigation} screen='AddTeacher'/>
        </View>
    );
}