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

import {Screens} from '../../App';

export const ListsScreen = ({ navigation }) => {
    const db = useRoute().params.db

    return (
        <View>
            {Screens.map((item) => {
                return (
                    <Button 
                        title={item.rusName} 
                        key={item.name} 
                        name = {item.name} 
                        onPress = {() => navigation.navigate(item.name, {db})}
                    />
                );
        })}
        </View>
        
    )
}