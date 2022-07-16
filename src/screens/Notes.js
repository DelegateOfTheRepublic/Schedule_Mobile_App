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

export const NotesScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const route = useRoute()

    return (
        <View>
            <ScrollView style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
                {
                    route.params? <Text>{route.params.note}</Text>
                    :
                    null
                }
            </ScrollView>
            <AddButton navigation={navigation} screen='AddNote' />
        </View>
    )
}