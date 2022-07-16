import React from 'react';
import {
  Text
} from 'react-native';

import { TouchableRipple } from 'react-native-paper';

export const ResetButton = ({ onPress }) => {
    return (
        <TouchableRipple borderless={true} rippleColor={'purple'} style={{ backgroundColor: '#05abf2', padding: 6, borderRadius: 8, position: 'absolute', bottom: 10, left: 5, alignSelf: 'flex-start'}} onPress={onPress}>
            <Text>Сброс</Text>
        </TouchableRipple>
    )
}