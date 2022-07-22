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

/**
 * Экран добавления/удаления предмета
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const AddClassroomScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const route = useRoute()
    const [disabled, setDasabled] = useState(true)
    const classroom = route.params?.currentItem || null
    const [classroomName, setClassroom] = useState(classroom != null? classroom.classroom : "");

    const [visible, setVisible] = useState(false);

    focusEffect('Classrooms', navigation)

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>

            <BackHeader
                title = {route.params? route.params?.title : 'Добавить аудиторию'}
                navigation = {navigation}
                backScreen = {'Classrooms'}
            />

            <View>
                <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder='Аудитория' onChangeText={(classroomName) => { setClassroom(classroomName); setDasabled(!(classroomName.length > 0));}} value={classroomName} />
                <Text style={{alignSelf: 'flex-end'}} >{classroomName.length}/256</Text>
            </View>

            <ResetButton onPress={() => { setClassroom(''); setDasabled(true); }} />

            <SubmitButton 
                navigation={navigation} 
                disabled={classroom != null? false : disabled} 
                screen = 'Classrooms' 
                bridge={(setSuccess) => 
                    classroom != null? 
                    editItem(classroomName, QuerieStrings.EDIT.CLASSROOM, [classroomName, classroom.IDCr], setSuccess) 
                    : 
                    addItem(classroomName, QuerieStrings.ADD.CLASSROOM, [classroomName], setSuccess)} 
                showToast={() => 
                    showToast(
                        'info',
                        'Что-то не так...', 
                        classroomName.trim() != '' ? classroomName + ' уже добавлен' : 'Вы ввели пустую строку'
                    )
                } 
                isAdd={classroom === null}
            />

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>
        </View>
    )
}