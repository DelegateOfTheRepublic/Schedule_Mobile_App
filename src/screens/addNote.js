import { createNativeStackNavigator } from '@react-navigation/native-stack';
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


import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import { ResetButton } from '../uis/resetButton';

import { SubmitButton } from '../uis/submitButton';

export const AddNoteScreen = ({ navigation }) => {
    const data = [
        { label: 'Item 1', id: '1' },
        { label: 'Item 2', id: '2' },
        { label: 'Item 3', id: '3' },
        { label: 'Item 4', id: '4' },
        { label: 'Item 5', id: '5' },
        { label: 'Item 6', id: '6' },
        { label: 'Item 7', id: '7' },
        { label: 'Item 8', id: '8' },
        { label: 'Itemm 9', id: '9' },
    ];

    const [subject, setSubject] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';
    const rusMonthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

    const [note, setNote] = useState('')
    const [disabled, setDasabled] = useState(true)

    const [openStartTimePicker, setOpenSTP] = useState(false)
    const [openEndTimePicker, setOpenETP] = useState(false)
    const [pickedStartTime, setStartTime] = useState(new Date());
    const [pickedEndTime, setEndTime] = useState(new Date())
    const [finalyEndTime, setFinEndTime] = useState('')
    const [finalyStartTime, setFinStartTime] = useState('');

    const [openDatePicker, setOpenDP] = useState(false)
    const [pickedDate, setDate] = useState('')
    const [finalyDate, setFinDate] = useState('')

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
            <ScrollView>
                <View>
                    <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder='Заметка' onChangeText={(note) => { setNote(note); setDasabled(!(note.length > 0)); }} value={note}/>
                    <Text style={{alignSelf: 'flex-end'}} >{note.length}/1024</Text>
                </View>
                <View>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={220}
                        labelField="label"
                        valueField="id"
                        placeholder={!isFocus ? 'Предмет' : '...'}
                        searchPlaceholder="Поиск..."
                        value={subject != null ? subject.id : subject}
                        dropdownPosition='bottom'
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSubject(item);
                            setIsFocus(false);
                        }}
                    />
                    <Text style={{alignSelf: 'flex-end'}} >{subject != null ? subject.label.length : 0}/256</Text>
                </View>
                <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image source={require('../icons/fast-time.png')} style={{ width: 30, height: 30, borderRadius: 15 }}/>
                    <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenSTP(true)}>
                        <Text style={{alignSelf: 'flex-start'}}>{finalyStartTime.length != 0 ? finalyStartTime : 'Начало'}</Text>
                    </TouchableRipple>
                    <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenETP(true)}>
                        <Text style={{alignSelf: 'flex-start'}}>{finalyEndTime.length != 0 ? finalyEndTime : 'Конец'}</Text>
                    </TouchableRipple>
                </View>
                <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Image source={require('../icons/calendar.png')} style = {{ width: 30, height: 30 }} />
                    <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenDP(true)}>
                        <Text style={{alignSelf: 'flex-start'}} >{finalyDate.length != 0 ? finalyDate : 'Установите дату'}</Text>
                    </TouchableRipple>
                </View>
            </ScrollView>

            <ResetButton onPress={() => { setNote(''); 
                                          setDate(new Date().toLocaleDateString()); 
                                          setFinDate(''); 
                                          setFinStartTime(''); 
                                          setFinEndTime(''); 
                                          setStartTime(new Date()); 
                                          setEndTime(new Date()); 
                                          setDasabled(true); 
                                          setSubject(null) 
                                        }} />

            <SubmitButton navigation={navigation} disabled={disabled} screen='Notes' params={{ note: note }} />

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
                    setDate(date.toLocaleDateString())
                    setFinDate(
                        date.getDate() + " " + rusMonthNames[date.getMonth()] + " " + date.getFullYear()
                    )
                }}
                onCancel={() => {
                    setOpenDP(false)
                }}
            />
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