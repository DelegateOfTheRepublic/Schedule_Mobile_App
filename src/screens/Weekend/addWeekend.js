import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
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
  BackHandler,
  Alert,
  Pressable,
  Dimensions
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import SQLite from 'react-native-sqlite-storage'

import { Overlay } from "@rneui/themed";
import ColorPicker from 'react-native-wheel-color-picker'
import DatePicker from 'react-native-date-picker'
import { TouchableRipple, Button } from 'react-native-paper';
import { SubmitButton } from '../../uis/submitButton';
import { BackHeader } from '../../uis/backHeader';
import { ResetButton } from '../../uis/resetButton';
import { useRoute } from '@react-navigation/native';
import { toastConfig, showToast } from '../../toast'
import Toast from 'react-native-toast-message';
import { addItem, editItem, QuerieStrings } from '../../queries'
import { focusEffect } from '../../focusEffect'
import { WarningOverlay } from '../../uis/warningOverlay';

export const AddWeekendScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const route = useRoute()

    const rusMonthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    const rusDaysNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

    const weekend = route.params?.currentItem || null
    const weekendIsNotNull = weekend != null

    const getReadableDate = (date) => {
        const newDate = weekendIsNotNull? new Date(date) : date 
        return rusDaysNames[newDate.getDay()] + ", " + 
        newDate.getDate() + " " + 
        rusMonthNames[newDate.getMonth()] + " " + 
        newDate.getFullYear()
    }

    const [disabled, setDisabled] = useState(true)
    const [openStartDatePicker, setOpenSDP] = useState(false)
    const [openEndDatePicker, setOpenEDP] = useState(false)
    const [weekendName, setWeekend] = useState(weekendIsNotNull? weekend.Name : "")
    const [pickedStartDate, setStartDate] = useState(weekendIsNotNull? weekend.StartDate : '')
    const [pickedEndDate, setEndDate] = useState(weekendIsNotNull? weekend.EndDate : '')
    const [finalyStartDate, setFinStartDate] = useState(weekendIsNotNull? getReadableDate(weekend.StartDate) : '')
    const [finalyEndDate, setFinEndDate] = useState(weekendIsNotNull? getReadableDate(weekend.EndDate) : '')
    const [visibleWarning, setVisibleWarning] = useState(false)

    const toggleModalWarning = () => {
        setVisibleWarning(!visibleWarning)
    }

    focusEffect('Weekends', navigation)

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            <BackHeader
                title = {route.params? route.params?.title : 'Добавить выходной'}
                navigation = {navigation}
                backScreen = {'Weekends'}
                dataCheck={() => {
                    return weekendName != "" || finalyStartDate != '' || finalyEndDate != ''
                }}
                setVisibleWarning = {(visibleWarning) => setVisibleWarning(visibleWarning)}
            />

            <WarningOverlay
                visibleWarning={visibleWarning}
                toggleModalWarning={toggleModalWarning}
                baseScreen={'Weekends'}
                navigation={navigation}
            />

            <View>
                <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder='Название' onChangeText={(weekendName) => { setWeekend(weekendName); setDisabled(!(weekendName.length > 0)); }} value={weekendName}/>
                <Text style={{alignSelf: 'flex-end'}} >{weekendName.length}/256</Text>
            </View>
            
            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={require('../../icons/calendar.png')} style={{ width: 30, height: 30, tintColor: '#FFF903' }} />
                <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => setOpenSDP(true)}>
                    <Text style={{alignSelf: 'flex-start'}} >{finalyStartDate.length != 0 ? finalyStartDate : 'Установите дату начала'}</Text>
                </TouchableRipple>
            </View>

            <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image source={require('../../icons/calendar.png')} style={{ width: 30, height: 30, tintColor: '#FFF903' }} />
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

            <SubmitButton 
                navigation={navigation} 
                disabled={weekendIsNotNull? false : disabled} 
                screen = 'Weekends' 
                bridge={(setSuccess) => 
                    weekendIsNotNull? 
                    editItem(weekendName, QuerieStrings.EDIT.WEEKEND, [weekendName, pickedStartDate.toString(), pickedEndDate.toString(), weekend.IDW], setSuccess) 
                    : 
                    addItem(weekendName, QuerieStrings.ADD.WEEKEND, [weekendName, pickedStartDate.toString(), pickedEndDate.toString()], setSuccess)} 
                showToast={() => 
                    showToast(
                        'info',
                        'Что-то не так...', 
                        weekendName.trim() != '' ? weekendName + ' уже добавлен' : 'Вы ввели пустую строку'
                    )
                } 
                isAdd={!weekendIsNotNull}
            />

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
                    setStartDate(date)
                    setFinStartDate(getReadableDate(date))
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
                    setEndDate(date)
                    setFinEndDate(getReadableDate(date))
                }}
                onCancel={() => {
                    setOpenEDP(false)
                }}
            />

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>
        </View>
    )
}