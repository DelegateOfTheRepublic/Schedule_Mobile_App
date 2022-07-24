import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  Text,
  useColorScheme,
  View,
  FlatList,
  StyleSheet
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import SQLite from 'react-native-sqlite-storage'

import {AddButton} from '../../uis/addButton'
import { TouchableRipple } from 'react-native-paper';

import { toastConfig, showToast } from '../../toast'
import {BottomMenu} from '../../menu'
import {ScheduleDB as db} from '../../../App'
import { getItems, deleteItem, QuerieStrings } from '../../queries'

SQLite.DEBUG(true);

/**
 * Экран, отображающий предметы
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const SubjectsScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([])
  const [currentSubject, setCurrentSubject] = useState(null)
  const [visible, setVisible] = useState(false)

  const isDarkMode = useColorScheme() === 'dark';
  const isFocused = useIsFocused();
  const isSuccess = useRoute().params?.isSuccess || false
  const route = useRoute()

  useEffect(() => {
    isFocused && getItems(QuerieStrings.GET_ALL.SUBJECTS, setSubjects)
    isSuccess && isFocused && showToast('success', route.params?.message)
  }, [isFocused, isSuccess])

  const close = () => {
    setVisible(false)
  }

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableRipple style={{borderRadius: 10, marginBottom: 10}} borderless={true} rippleColor={'#FFF903'} onPress={() => {setVisible(true); setCurrentSubject(item)}}>
        <View style = {styles.subject}>
            <Text style = {{ alignSelf: 'center' }}>{item.Name}</Text>
            <View style={{ backgroundColor: item.Color, borderRadius: 13, width: 26, height: 26}}/>
        </View>
      </TouchableRipple> 
    )
  }, [])

  const itemKeyExtractor = useCallback (item => item.IDS, [])


  return (
      <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
        <FlatList data={subjects} renderItem={renderItem} keyExtractor={itemKeyExtractor} />
        
        <AddButton navigation={navigation} screen='AddSubject'/>

        <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>

        <BottomMenu 
          title={'Выбранный предмет'} 
          navigation={navigation} 
          isOptionsSheet
          deleteSubject={() => { deleteItem(currentSubject,
                                            QuerieStrings.DELETE.SUBJECT,
                                            [currentSubject.IDS]),
                                  getItems(QuerieStrings.GET_ALL.SUBJECTS, setSubjects)}} 
          subject={currentSubject} 
          visible={visible} 
          onClose={close} 
          db={db}
          screen={'AddSubject'}
          editScreenTitle={'Редактировать предмет'}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
      height: '100%', 
      padding: 10
  },
  horizontalLine: {
      borderBottomColor: '#8471D8', 
      borderStyle: 'dashed', 
      borderBottomWidth: 1, 
      marginBottom: 5
  },
  subjectsContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: 15
  },
  subjectBackground: {
      backgroundColor: '#8471D8', 
      borderRadius: 10, 
      padding: 5
  },
  subject: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      backgroundColor: '#95276E', 
      borderRadius: 10, 
      padding: 5
  },
  noSubject: {
      backgroundColor: '#95276E', 
      borderRadius: 10, 
      paddingLeft: 5, 
      paddingRight: 5
  },
  teacher: {
      backgroundColor: '#A6A201', 
      borderRadius: 10, 
      paddingLeft: 5, 
      paddingRight: 5, 
      alignSelf: 'flex-start', 
      marginBottom: 5
  },
  addInfo: {
      backgroundColor: 'purple', 
      borderRadius: 10, 
      paddingLeft: 5, 
      flexDirection: 'row', 
      alignSelf: 'flex-end'
  },
  verticalLine: {
      borderWidth: 1, 
      backgroundColor: 'purple', 
      borderColor: 'purple', 
      height: '100%', 
      width: 5, 
      borderRadius: 5
  }
})