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

import {Screens} from '../../App';

export const ListsScreen = ({ navigation }) => {

    return (
        <View>
            {Screens.map((item) => {
                return (
                    <Button title={item.rusName} key={item.name} name = {item.name} onPress = {() => navigation.navigate(item.name)}/>
                );
        })}
        </View>
        
    )
}