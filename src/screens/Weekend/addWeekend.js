import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
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

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import { TouchableRipple } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { ResetButton } from '../../uis/resetButton';

import { SubmitButton } from '../../uis/submitButton';

export const AddWeekendScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const rusMonthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    const rusDaysNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    const [disabled, setDisabled] = useState(true)
    const [openStartDatePicker, setOpenSDP] = useState(false)
    const [openEndDatePicker, setOpenEDP] = useState(false)
    const [weekendName, setWeekend] = useState('')
    const [pickedStartDate, setStartDate] = useState('')
    const [pickedEndDate, setEndDate] = useState('')
    const [finalyStartDate, setFinStartDate] = useState('')
    const [finalyEndDate, setFinEndDate] = useState('')

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            <View>
                <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder='Название' onChangeText={(weekendName) => { setWeekend(weekendName); setDisabled(!(weekendName.length > 0)); }} value={weekendName}/>
                <Text style={{alignSelf: 'flex-end'}} >{weekendName.length}/256</Text>
            </View>
            
            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={require('../../icons/calendar.png')} style={{ width: 30, height: 30 }} />
                <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenSDP(true)}>
                    <Text style={{alignSelf: 'flex-start'}} >{finalyStartDate.length != 0 ? finalyStartDate : 'Установите дату начала'}</Text>
                </TouchableRipple>
            </View>

            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={require('../../icons/calendar.png')} style={{ width: 30, height: 30 }} />
                <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenEDP(true)}>
                    <Text style={{alignSelf: 'flex-start'}} >{finalyEndDate.length != 0 ? finalyEndDate : 'Установите дату конца'}</Text>
                </TouchableRipple>
            </View>

            <ResetButton onPress={() => {
                setDisabled(true);
                setWeekend('');
                setStartDate('')
                setEndDate('')
                setFinStartDate('')
                setFinEndDate('')
            }}/>

            <SubmitButton navigation={navigation} disabled={disabled} screen = 'Weekends' params = {{ weekend: weekendName }}/>

            <DatePicker
                modal={true}
                open={openStartDatePicker}
                date={pickedStartDate.length != 0 ? new Date(pickedStartDate) : new Date()}
                mode='date'
                cancelText='Отмена'
                confirmText='Ок'
                title={null}
                onConfirm={(date) => {
                    setOpenSDP(false)
                    setStartDate(date.toLocaleDateString())
                    setFinStartDate(
                        rusDaysNames[date.getDay()] + ", " + 
                        date.getDate() + " " + 
                        rusMonthNames[date.getMonth()] + " " + 
                        date.getFullYear()
                    )
                }}
                onCancel={() => {
                    setOpenSDP(false)
                }}
            />

            <DatePicker
                modal={true}
                open={openEndDatePicker}
                date={pickedEndDate.length != 0 ? new Date(pickedEndDate) : new Date()}
                mode='date'
                cancelText='Отмена'
                confirmText='Ок'
                title={null}
                onConfirm={(date) => {
                    setOpenEDP(false)
                    setEndDate(date.toLocaleDateString())
                    setFinEndDate(
                        rusDaysNames[date.getDay()] + ", " + 
                        date.getDate() + " " + 
                        rusMonthNames[date.getMonth()] + " " + 
                        date.getFullYear()
                    )
                }}
                onCancel={() => {
                    setOpenEDP(false)
                }}
            />
        </View>
    )
}