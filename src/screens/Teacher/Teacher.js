import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
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
  FlatList
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import SQLite from 'react-native-sqlite-storage'
import Toast from 'react-native-toast-message';
import { TouchableRipple } from 'react-native-paper';
import { AddButton } from '../../uis/addButton';
import { toastConfig, showToast } from '../../toast'
import {BottomMenu} from '../../menu'
import {ScheduleDB as db} from '../../../App'
import { getItems, deleteItem, QuerieStrings } from '../../queries'

SQLite.DEBUG(true);

/**
 * Экран, отображающий преподавателей
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const TeachersScreen = ({ navigation }) => {
    const [teachers, setTeachers] = useState([])
    const [currentTeacher, setCurrentTeacher] = useState(null)
    const [visible, setVisible] = useState(false)
  
    const isDarkMode = useColorScheme() === 'dark';
    const isFocused = useIsFocused();
    const isSuccess = useRoute().params?.isSuccess || false
    const route = useRoute()
  
    useEffect(() => {
      isFocused && getItems(QuerieStrings.GET_ALL.TEACHERS, setTeachers)
      isSuccess && isFocused && showToast('success', route.params?.message)
    }, [isFocused, isSuccess])
  
    const close = () => {
      setVisible(false)
    }
  
    const renderItem = ({ item }) => (
        <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => {setVisible(true); setCurrentTeacher(item)}}>
            <View style = {{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'green', padding: 10 }}>
                <Text style = {{ alignSelf: 'center' }}>{item.FirstName}</Text>
                {item.Phone && <Text style = {{ alignSelf: 'center' }}>{item.Phone}</Text>}
                {item.Email && <Text style = {{ alignSelf: 'center' }}>{item.Email}</Text>}
                {item.Info && <Text style = {{ alignSelf: 'center' }}>{item.Info}</Text>}
            </View>
        </TouchableRipple> 
      );
  
    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%' }}>
          <FlatList data={teachers} renderItem={renderItem} keyExtractor={item => item.IDT} />
          
          <AddButton navigation={navigation} screen='AddTeacher'/>
  
          <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>
  
          <BottomMenu 
            title={'Выбранный преподаватель'} 
            navigation={navigation} 
            deleteSubject={() => { deleteItem(currentTeacher,
                                              QuerieStrings.DELETE.TEACHER,
                                              [currentTeacher.IDT]),
                                    getItems(QuerieStrings.GET_ALL.TEACHERS, setTeachers)}} 
            subject={currentTeacher} 
            visible={visible} 
            onClose={close} 
            db={db}
            screen={'AddTeacher'}
            editScreenTitle={'Редактировать преподавателя'}
          />
        </View>
    );
}