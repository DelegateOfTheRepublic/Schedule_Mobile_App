import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
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
  Alert,
  FlatList
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import SQLite from 'react-native-sqlite-storage'

import {AddButton} from '../../uis/addButton'
import { TouchableRipple } from 'react-native-paper';

SQLite.DEBUG(true);


export const SubjectsScreen = ({ navigation }) => {
    const [subjects, setSubjects] = useState([])
    var db = null

    useEffect(() => {
        db = SQLite.openDatabase({
            name: 'schedule_db',
            location: 'default',
            createFromLocation:'~www/data.db'
        })

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM `Subjects`', [], (tx, results) => {
              const rows = results.rows;
              let tmp = []
      
              for (let i = 0; i < rows.length; i++) {
                tmp.push({
                  ...rows.item(i),
                });
              }
    
              setSubjects(tmp);
            });
        });
    }, [])

    const isDarkMode = useColorScheme() === 'dark';
    const route = useRoute();

    const renderItem = ({ item }) => (
        <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => {}}>
            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'green', padding: 10 }}>
                <Text style = {{ alignSelf: 'flex-start' }}>{item.Name}</Text>
                <View style={{ backgroundColor: item.Color, borderRadius: 13, width: 26, height: 26}}/>
            </View>
        </TouchableRipple> 
      );

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%' }}>
            <FlatList data={subjects} renderItem={renderItem} keyExtractor={item => item.IDS} />
            
            <AddButton navigation={navigation} screen='AddSubject' onPress={() => db != null ? db.close() : null}/>
        </View>
    );
}