import React from 'react';
import {
    Image
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';

export const SubmitButton = ({ navigation, disabled, screen, params, isSuccess, onPress=null }) => {
    return (
        <TouchableRipple borderless={true} rippleColor={'purple'} disabled={disabled} onPress={() => { onPress != null ? onPress() : null; isSuccess? navigation.navigate(screen, params) : null }} style = {{ position: 'absolute', bottom: 10, right: 10, alignSelf: 'flex-start', borderRadius: 20 }}>
            <Image source={require('../icons/tick-mark.png')} style={{ width: 40, height: 40, borderRadius: 100, tintColor: '#05abf2', backgroundColor: 'white'}} />
        </TouchableRipple>
    )
}
