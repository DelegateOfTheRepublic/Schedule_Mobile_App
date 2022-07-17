import React, {useState} from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Image,
  Alert
} from 'react-native';
import { TouchableRipple, Button } from 'react-native-paper';


export const AddButton = ({ navigation, screen, onPress }) => {

    return (
        <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => {navigation.navigate(screen); onPress()}} style = {{ position: 'absolute', bottom: 10, right: 10, alignSelf: 'flex-start', borderRadius: 20 }}>
            <Image source={require('../icons/add.png')} style={{ width: 40, height: 40, tintColor: 'red', backgroundColor: 'blue'}}/>
        </TouchableRipple>
    )
}