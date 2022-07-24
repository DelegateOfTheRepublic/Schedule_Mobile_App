import { TouchableRipple } from 'react-native-paper';
import React from 'react';
import {
  Text,
  View,
  Image,
  useColorScheme,
  Alert
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

/**
* @param {string} title - наименование заголовка
* @param {string} defaultTitle - стандартное наименование заголовка
* @param {any} navigation - объект StackNavigator
* @param {string} backScreen - наименование экроана, на который будет возвращать BackHeader
* @param {function} dataCheck - проверяет наличие данных, нужна для уведомления при выходе с экрана
*/

export const BackHeader = ({title, navigation, backScreen, dataCheck, setVisibleWarning}) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomColor: 'grey', borderBottomWidth: 1 }}>
            <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => dataCheck()? setVisibleWarning(true) : navigation.navigate(backScreen, {isSuccess: false})} style={{ width: 60, height: 60, borderRadius: 30, flexDirection:'row', justifyContent: 'center' }}>
                <Image source={require('../icons/go-back.png')} style={{ width: 25, height: 25, borderRadius: 10, tintColor:'lime', alignSelf: 'center' }} />
            </TouchableRipple>
            <Text>{title}</Text>
        </View>
    )
}