import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
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
import { VerticalLine } from '../../uis/verticalLine'

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

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableRipple style={{ borderRadius: 5 }} borderless={true} rippleColor={'#FFF903'} onPress={() => {setVisible(true); setCurrentTeacher(item)}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <VerticalLine/>
          <View style = {styles.teacher}>
              <Text style = {{ alignSelf: 'center' }}>{item.FirstName}</Text>
              {item.Phone && <Text style = {{ alignSelf: 'center' }}>{item.Phone}</Text>}
              {item.Email && <Text style = {{ alignSelf: 'center' }}>{item.Email}</Text>}
              {item.Info && <Text style = {{ alignSelf: 'center' }}>{item.Info}</Text>}
          </View>
          <VerticalLine/>
        </View>
    </TouchableRipple> 
    )
  }, [])

  const itemKeyExtractor = useCallback (item => item.IDT, [])

  return (
      <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
        <FlatList data={teachers} renderItem={renderItem} keyExtractor={itemKeyExtractor} />
        
        <AddButton navigation={navigation} screen='AddTeacher'/>

        <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>

        <BottomMenu 
          title={'Выбранный преподаватель'} 
          navigation={navigation} 
          isOptionsSheet
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

const styles = StyleSheet.create({
  mainContainer: {
      height: '100%', 
      padding: 10
  },
  teacher: {
    flexDirection: 'column',
    justifyContent: 'space-between', 
    backgroundColor: '#8471D8', 
    borderRadius: 15, 
    paddingLeft: 8, 
    paddingRight: 8, 
    padding: 2
  }
})