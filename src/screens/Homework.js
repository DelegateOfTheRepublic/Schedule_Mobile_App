import { useFocusEffect } from '@react-navigation/native';
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

export const HomeworkScreen = props => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            <Text>
                This is HomeworkScreen!
            </Text>
        </View>
    )
}