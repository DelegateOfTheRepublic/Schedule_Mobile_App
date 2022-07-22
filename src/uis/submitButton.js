import React, { useState } from 'react';
import {
    Image
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';

/**
 * UI элемент - кнопка для подтверждения добавления/изменения объекта
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 * @param {boolean} disabled - отвечает за возможность взаимодействовать с кнопкой
 * @param {string} screen - наименование экрана, на которой будет произведена переадресация
 * @param {function} bridge - позволяет 'связать' кнопку с экраном добавления/изменения
 * @param {function} showToast - отображает уведомления
 * @param {boolean} isAdd - указывает на то, какую функцию должен выполнять экран добавления/изменения
 */

export const SubmitButton = ({ navigation, disabled, screen, bridge, showToast, isAdd }) => {
    const [isSuccess, setIsSuccess] = useState(true)

    const setSuccess = (res) => {
        if (res) {
            navigation.navigate(screen, {isSuccess, message: isAdd? 'Добавлено' : 'Изменено'})
        } else {
            showToast()
        }
    }

    return (
        <TouchableRipple borderless={true} rippleColor={'purple'} disabled={disabled} onPress={ () => { bridge(setSuccess); }} style = {{ position: 'absolute', bottom: 10, right: 10, alignSelf: 'flex-start', borderRadius: 20 }}>
            <Image source={require('../icons/tick-mark.png')} style={{ width: 40, height: 40, borderRadius: 100, tintColor: '#05abf2', backgroundColor: 'white'}} />
        </TouchableRipple>
    )
}
