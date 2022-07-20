import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Image
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';

export const SubmitButton = ({ navigation, disabled, screen, hz, showToast, isAdd }) => {
    const [isSuccess, setIsSuccess] = useState(true)

    const setSuccess = (res) => {
        if (res) {
            navigation.navigate(screen, {isSuccess: isSuccess, message: isAdd? 'Добавлено' : 'Изменено'})
        } else {
            setIsSuccess(false)
            showToast()
        }
    }

    return (
        <TouchableRipple borderless={true} rippleColor={'purple'} disabled={disabled} onPress={ () => { hz(setSuccess); }} style = {{ position: 'absolute', bottom: 10, right: 10, alignSelf: 'flex-start', borderRadius: 20 }}>
            <Image source={require('../icons/tick-mark.png')} style={{ width: 40, height: 40, borderRadius: 100, tintColor: '#05abf2', backgroundColor: 'white'}} />
        </TouchableRipple>
    )
}
