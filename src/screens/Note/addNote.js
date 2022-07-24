import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  useColorScheme,
  View,
  Button as RNButton,
  Image,
  TextInput,
  Alert,
  Pressable
} from 'react-native';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableRipple } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import SQLite from 'react-native-sqlite-storage'

import { Overlay } from "@rneui/themed";
import { SubmitButton } from '../../uis/submitButton';
import { ResetButton } from '../../uis/resetButton';
import { BackHeader } from '../../uis/backHeader'
import { useRoute } from '@react-navigation/native';
import { toastConfig, showToast } from '../../toast'
import Toast from 'react-native-toast-message';
import { getItems, getItem, addItem, editItem, QuerieStrings } from '../../queries'
import { focusEffect } from '../../focusEffect'
import { WarningOverlay } from '../../uis/warningOverlay';

SQLite.DEBUG(true);

/**
 * Экран добавления/удаления предмета
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const AddNoteScreen = ({ navigation }) => {
  const route = useRoute()
  const [data, setData] = useState([])
  const note = route.params?.currentItem || null
  const [subject, setSubject] = useState(null);
  
  useEffect(() => {
    getItems(QuerieStrings.GET_ALL.SUBJECTS, setData)
    {(note != null) && getItem(QuerieStrings.GET.SUBJECT, [note.Subject], setSubject).then((data) => {setSubject(data)})}
  }, [])

  const [isFocus, setIsFocus] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const rusMonthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

  const [textNote, setTextNote] = useState(note != null ? note.Note : '')
  const [disabled, setDasabled] = useState(true)
  const [visibleWarning, setVisibleWarning] = useState(false)

  const [openStartTimePicker, setOpenSTP] = useState(false)
  const [openEndTimePicker, setOpenETP] = useState(false)
  const [pickedStartTime, setStartTime] = useState(new Date());
  const [pickedEndTime, setEndTime] = useState(new Date())
  const [finalyEndTime, setFinEndTime] = useState(note != null ? note.EndTime : '')
  const [finalyStartTime, setFinStartTime] = useState(note != null ? note.StartTime : '');

  const [openDatePicker, setOpenDP] = useState(false)
  const [pickedDate, setDate] = useState('')
  const [finalyDate, setFinDate] = useState(note != null ? note.Date : '')

  focusEffect('Notes', navigation)

  const toggleModalWarning = () => {
    setVisibleWarning(!visibleWarning)
  }

  const onChangeFullTimeInterval = (selectedDate) => {
    const currentDate = selectedDate;

    var formattedStartTime = currentDate.toLocaleTimeString().split(':');
    formattedStartTime.splice(2,1);
    formattedStartTime = formattedStartTime.join(':');
    setFinStartTime(formattedStartTime);
    setStartTime(currentDate);

    var formattedEndTime = new Date(currentDate.getTime())
    formattedEndTime.setMinutes(formattedEndTime.getMinutes() + 90)
    setEndTime(formattedEndTime)
    formattedEndTime = formattedEndTime.toLocaleTimeString().split(':');
    formattedEndTime.splice(2,1);
    formattedEndTime = formattedEndTime.join(':')
    setFinEndTime(formattedEndTime)
  };

  const onChangeEndTime = (selectedDate) => {
      const currentDate = selectedDate;

      var formattedEndTime = currentDate.toLocaleTimeString().split(':')
      formattedEndTime.splice(2,1);
      formattedEndTime = formattedEndTime.join(':')
      setFinEndTime(formattedEndTime)
      setEndTime(currentDate)
  };

    return (
      <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>

      <BackHeader
        title = {route.params? route.params?.title : 'Добавить заметку'}
        navigation = {navigation}
        backScreen = {'Notes'}
        dataCheck={() => {
          return textNote != "" || subject || finalyStartTime != "" || finalyEndTime != "" || pickedDate != ""
        }}
        setVisibleWarning = {(visibleWarning) => setVisibleWarning(visibleWarning)}
      />

      <WarningOverlay
          visibleWarning={visibleWarning}
          toggleModalWarning={toggleModalWarning}
          baseScreen={'Notes'}
          navigation={navigation}
      />

      <ScrollView>
          <View>
              <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder='Заметка' onChangeText={(textNote) => { setTextNote(textNote); setDasabled(!(textNote.length > 0)); }} value={textNote}/>
              <Text style={{alignSelf: 'flex-end'}} >{textNote.length}/1024</Text>
          </View>
          <View>
              <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'lime'}]}
                  containerStyle={{backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}}
                  activeColor={isDarkMode ? Colors.darker.toString() : Colors.lighter.toString()}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={220}
                  labelField="Name"
                  valueField="IDS"
                  placeholder={!isFocus ? 'Предмет' : '...'}
                  searchPlaceholder="Поиск..."
                  value={subject != null ? subject.IDS : subject}
                  dropdownPosition='bottom'
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={subject => {
                      setSubject(subject);
                      setIsFocus(false);
                  }}
              />
              <Text style={{alignSelf: 'flex-end'}} >{subject != null ? subject.Name.length : 0}/256</Text>
          </View>
          <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Image source={require('../../icons/fast-time.png')} style={{ width: 30, height: 30, borderRadius: 15, tintColor: '#FFF903' }}/>
              <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenSTP(true)}>
                  <Text style={{alignSelf: 'flex-start'}}>{finalyStartTime.length != 0 ? finalyStartTime : 'Начало'}</Text>
              </TouchableRipple>
              <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenETP(true)}>
                  <Text style={{alignSelf: 'flex-start'}}>{finalyEndTime.length != 0 ? finalyEndTime : 'Конец'}</Text>
              </TouchableRipple>
          </View>
          <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
              <Image source={require('../../icons/calendar.png')} style = {{ width: 30, height: 30, tintColor: '#FFF903' }} />
              <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenDP(true)}>
                  <Text style={{alignSelf: 'flex-start'}} >{finalyDate.length != 0 ? finalyDate : 'Установите дату'}</Text>
              </TouchableRipple>
          </View>
      </ScrollView>

      <ResetButton onPress={() => { 
          setTextNote(''); 
          setDate(new Date()); 
          setFinDate(''); 
          setFinStartTime(''); 
          setFinEndTime(''); 
          setStartTime(new Date()); 
          setEndTime(new Date()); 
          setDasabled(true); 
          setSubject(null) 
        }} 
      />

      <SubmitButton 
          navigation={navigation} 
          disabled={note != null? false : disabled} 
          screen = 'Notes' 
          bridge={(setSuccess) => 
            note != null? 
            editItem(textNote, QuerieStrings.EDIT.NOTE, [textNote, subject?.Name, finalyStartTime, finalyEndTime, finalyDate, note.IDN], setSuccess) 
            : 
            addItem(textNote, QuerieStrings.ADD.NOTE, [textNote, subject?.Name, finalyStartTime, finalyEndTime, finalyDate], setSuccess)} 
          showToast={() => 
              showToast(
                  'info',
                  'Что-то не так...', 
                  textNote.trim() != '' ? textNote + ' уже добавлен' : 'Вы ввели пустую строку'
              )
          } 
          isAdd={note === null}
      />

      <DatePicker
          modal={true}
          open={openStartTimePicker}
          date={pickedStartTime}
          mode='time'
          cancelText='Отмена'
          confirmText='Ок'
          title={null}
          onConfirm={(date) => {
          setOpenSTP(false);
          onChangeFullTimeInterval(date)
          }}
          onCancel={() => {
          setOpenSTP(false)
          }}
          is24hourSource={true}
      />

      <DatePicker
          modal={true}
          open={openEndTimePicker}
          date={pickedEndTime}
          mode='time'
          cancelText='Отмена'
          confirmText='Ок'
          title={null}
          onConfirm={(date) => {
          setOpenETP(false);
          onChangeEndTime(date)
          }}
          onCancel={() => {
          setOpenETP(false)
          }}
          is24hourSource={true}
      />

      <DatePicker
          modal={true}
          open={openDatePicker}
          date={pickedDate.length != 0 ? new Date(pickedDate) : new Date()}
          mode='date'
          cancelText='Отмена'
          confirmText='Ок'
          title={null}
          onConfirm={(date) => {
              setOpenDP(false)
              setDate(date)
              setFinDate(
                  date.getDate() + " " + rusMonthNames[date.getMonth()] + " " + date.getFullYear()
              )
          }}
          onCancel={() => {
              setOpenDP(false)
          }}
      />

      <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });