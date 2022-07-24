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
import { TouchableRipple } from 'react-native-paper';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import {Screens} from '../../App';
import { VerticalLine } from '../uis/verticalLine'

export const ListsScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
            {Screens.map((item) => {
                return (
                    <TouchableRipple
                        key={item.name}
                        name = {item.name} 
                        rippleColor={'#FFF903'}
                        borderless={true}
                        style={{marginBottom: 15, padding: 10, borderRadius: 15}}
                        onPress = {() => navigation.navigate(item.name)}
                    >
                        <View style={styles.buttonContainer}>
                            <VerticalLine/>
                            <Text>{item.rusName}</Text>
                            <VerticalLine/>
                        </View>
                    </TouchableRipple>
                );
        })}
        </View>
        
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%', 
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    }
})