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
import { ResetButton } from '../../uis/resetButton';
import { useRoute } from '@react-navigation/native';
import { toastConfig, showToast } from '../../toast'
import Toast from 'react-native-toast-message';
import {ScheduleDB as db} from '../../../App'

SQLite.DEBUG(true);

export const AddSubjectScreen = ({ navigation }) => {
    const grey = '#707070'
    const route = useRoute()
    const subject = route.params?.currentSubject || null
    const [text, onChangeText] = useState(subject != null? subject.Name : "");
    const [changedColor, setColor] = useState(grey)
    const [pickedColor, submitColor] = useState(subject != null? subject.Color : grey)
    const [disabled, setDisabled] = useState(true)

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            navigation.navigate('Subjects', {isSuccess: false});
            return true;
          };
     
          BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
     
          return () => {
            BackHandler.removeEventListener(
              'hardwareBackPress',
              onBackPress
            );
          };
        }, []),
    );

    const isDarkMode = useColorScheme() === 'dark';

    const addSubject = (callback) => {
        if (text.trim() != ''){
            db.transaction( (tx) => {
                tx.executeSql(
                    'INSERT OR IGNORE INTO Subjects(Name, Color) VALUES (?, ?)',
                    [text, pickedColor],
                    (tx, result) => {
                        if (result.rowsAffected > 0){
                            callback(true)
                        } else {
                            callback(false)
                        }
                    }
                )
            })
        } else {
            callback(false)
        }
    }

    const editSubject = (callback) => {
        if (text.trim() != ''){
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE Subjects SET Name = ?, Color = ? WHERE IDS = ?',
                    [text, pickedColor, subject.IDS],
                    (tx, result) => {
                        if (result.rowsAffected > 0){
                            callback(true)
                        } else {
                            callback(false)
                        }
                    }
                )
            })
        } else {
            callback(false)
        }
    }

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>

            <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => navigation.navigate('Subjects', {isSuccess: false})} style={{ width: 60, height: 60, borderRadius: 30, flexDirection:'row', justifyContent: 'center' }}>
                    <Image source={require('../../icons/go-back.png')} style={{ width: 25, height: 25, borderRadius: 10, tintColor:'lime', alignSelf: 'center' }} />
                </TouchableRipple>
                <Text>{route.params?.title? route.params.title : 'Добавить предмет'}</Text>
            </View>

            <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder="Предмет*" onChangeText={(text) => {onChangeText(text); setDisabled(!(text.length > 0));}} value={text} />
            <Text style={{alignSelf: 'flex-end'}}>{text.length}/256</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View
                    style={{ backgroundColor: pickedColor, alignSelf: 'center', borderRadius: 13, width: 26, height: 26}}
                />
                <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                    <RNButton title='Цвет' onPress={toggleOverlay} />
                </View>
            </View>
            
            <ResetButton onPress={() => {onChangeText(""); submitColor(grey); setDisabled(true);}} />

            <SubmitButton 
                navigation={navigation} 
                disabled={subject != null? false : disabled} 
                screen = 'Subjects' hz={subject != null? editSubject : addSubject} 
                showToast={() => 
                    showToast(
                        'info',
                        'Что-то не так...', 
                        text.trim() != '' ? text + ' уже добавлен' : 'Вы ввели пустую строку'
                    )
                } 
                isAdd={subject === null}
            />

            <Overlay overlayStyle = {{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, width: 330, height: 350 }} isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text style = {{ color: 'black', backgroundColor: 'lime', height: 50, textAlignVertical: 'center', paddingLeft: 25 }}>Выберите цвет</Text>
                <View style = {{ width: 220, height: 230, alignSelf: 'center', marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <ColorPicker
                        thumbSize={20}
                        sliderSize={20}
                        noSnap={true}
                        row={true}
                        swatches={false}
                        color={pickedColor}
                        onColorChange={(color) => setColor(color)}
                    />
                </View>
                <View style = {{ width: '95%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', position: 'absolute', bottom: 0, marginBottom: 10 }}>
                    <View style = {{ alignSelf: 'flex-start', borderRadius: 5 }}>
                        <TouchableRipple style = {{ borderRadius: 5, padding: 5, paddingLeft: 8, paddingRight: 8 }} borderless={true} rippleColor={'purple'} onPress={() => {toggleOverlay()}}>
                            <Text style = {{ color: isDarkMode ? Colors.darker : Colors.lighter }}>ОТМЕНА</Text>
                        </TouchableRipple>
                    </View>
                    <View style = {{ alignSelf: 'flex-start', borderRadius: 5 }}>
                        <TouchableRipple style = {{ borderRadius: 5, padding: 5, paddingLeft: 20, paddingRight: 20 }} borderless={true} rippleColor={'purple'} onPress={() => {submitColor(changedColor); toggleOverlay();}}>
                            <Text style = {{ color: isDarkMode ? Colors.darker : Colors.lighter }} >ОК</Text>
                        </TouchableRipple>
                    </View>
                </View>
            </Overlay>

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>
        </View>
    )
}