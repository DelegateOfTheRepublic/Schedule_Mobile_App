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
import { TouchableRipple, Button } from 'react-native-paper';
import { SubmitButton } from '../../uis/submitButton';
import { BackHeader } from '../../uis/backHeader';
import { ResetButton } from '../../uis/resetButton';
import { useRoute } from '@react-navigation/native';
import { toastConfig, showToast } from '../../toast'
import Toast from 'react-native-toast-message';
import { addItem, editItem, QuerieStrings } from '../../queries'
import { focusEffect } from '../../focusEffect'

SQLite.DEBUG(true);

/**
 * Экран добавления/удаления предмета
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const AddTeacherScreen = ({ navigation }) => {
    const [disabled, setDisabled] = useState(true)
    const route = useRoute()
    const teacher = route.params?.currentItem || null
    const [teacherName, setName] = useState(teacher != null? teacher.FirstName : "")
    const [phoneNumber, setPhoneNumber] = useState(teacher != null? teacher.Phone : "")
    const [email, setEmail] = useState(teacher != null? teacher.Email : "")
    const [additionalInfo, setAdditionalInfo] = useState(teacher != null? teacher.Info : "")

    const [visible, setVisible] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

    focusEffect('Teachers', navigation)

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>

            <BackHeader
                title = {route.params? route.params?.title : 'Добавить преподавателя'}
                navigation = {navigation}
                backScreen = {'Teachers'}
            />

            <ScrollView>
                <View>
                    <TextInput textContentType='name' keyboardAppearance={ !isDarkMode ? 'dark' : 'light' } autoCapitalize='words' style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder={'Преподаватель*'} onChangeText={(teacherName) => { setName(teacherName); setDisabled(!(teacherName.length > 0));}} value={teacherName}/>
                    <Text style={{alignSelf: 'flex-end'}}>{teacherName.length}/256</Text>
                </View>
                <View>
                    <TextInput keyboardType='phone-pad' style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder={'Номер телефона'} onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} value={phoneNumber}/>
                    <Text style={{alignSelf: 'flex-end'}}>{phoneNumber.length}/32</Text>
                </View>
                <View>
                    <TextInput keyboardType='email-address' style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder={'E-mail'} onChangeText={(email) => setEmail(email)} value={email}/>
                    <Text style={{alignSelf: 'flex-end'}}>{email.length}/512</Text>
                </View>
                <View>
                    <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder={'Дополнительная информация'} onChangeText={(additionalInfo) => setAdditionalInfo(additionalInfo)} value={additionalInfo}/>
                    <Text style={{alignSelf: 'flex-end'}}>{additionalInfo.length}/1024</Text>
                </View>
            </ScrollView>

            <ResetButton 
                onPress={() => { setName(''); 
                                 setPhoneNumber(''); 
                                 setEmail(''); 
                                 setAdditionalInfo(''); 
                                 setDisabled(true) }} 
            />

            <SubmitButton 
                navigation={navigation} 
                disabled={teacher != null? false : disabled} 
                screen = 'Teachers' 
                bridge={(setSuccess) => 
                    teacher != null? 
                    editItem(teacherName, QuerieStrings.EDIT.TEACHER, [teacherName, phoneNumber, email, additionalInfo, teacher.IDT], setSuccess) 
                    : 
                    addItem(teacherName, QuerieStrings.ADD.TEACHER, [teacherName, phoneNumber, email, additionalInfo], setSuccess)} 
                showToast={() => 
                    showToast(
                        'info',
                        'Что-то не так...', 
                        teacherName.trim() != '' ? teacherName + ' уже добавлен' : 'Вы ввели пустую строку'
                    )
                } 
                isAdd={teacher === null} 
            />

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>
        </View>
    )
}