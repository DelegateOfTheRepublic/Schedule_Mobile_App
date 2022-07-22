import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Button
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import {Screens} from '../../App';

export const ListsScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            {Screens.map((item) => {
                return (
                    <Button 
                        title={item.rusName} 
                        key={item.name} 
                        name = {item.name} 
                        onPress = {() => navigation.navigate(item.name)}
                    />
                );
        })}
        </View>
        
    )
}