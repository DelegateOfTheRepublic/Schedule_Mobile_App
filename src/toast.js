import Toast from 'react-native-toast-message';
import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

export const showToast = (type, mes1, mes2) => {
    Toast.show({
        type: type,
        text1: mes1,
        text2: mes2
      });
}

export const toastConfig = {
    success: internalState => (
        <View style={{ backgroundColor: 'lime', width: 220, borderRadius: 5 }}>
            <View style={{ flexDirection:'row', backgroundColor: 'purple', width: 215, alignSelf:'center', borderRadius: 5, padding: 5, paddingLeft: 5, paddingRight: 5 }}>
                <Image source={require('./icons/success.png')} style={{ width: 25, height: 25, alignSelf:'center', tintColor:'lime', borderRadius:8 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text>{internalState.text1}</Text>
                </View>
            </View>
        </View>
    ),
    info: internalState => (
        <View style={{ backgroundColor: 'lime', width: 220, borderRadius: 5 }}>
            <View style={{ flexDirection:'row', backgroundColor: 'purple', width: 215, alignSelf:'center', borderRadius: 5, padding: 5, paddingLeft: 5, paddingRight: 5 }}>
                <Image source={require('./icons/oops.png')} style={{ width: 25, height: 25, alignSelf:'center', tintColor:'lime', borderRadius:8 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text>{internalState.text1}</Text>
                    <Text>{internalState.text2}</Text>
                </View>
            </View>
        </View>
    ),
    error: internalState => (
        <View style={{ backgroundColor: 'lime', width: 220, borderRadius: 5 }}>
            <View style={{ flexDirection:'row', backgroundColor: 'purple', width: 215, alignSelf:'center', borderRadius: 5, padding: 5, paddingLeft: 5, paddingRight: 5 }}>
                <Image source={require('./icons/warning.png')} style={{ width: 25, height: 25, alignSelf:'center', tintColor:'lime', borderRadius:8 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text>{internalState.text1}</Text>
                    <Text>{internalState.text2}</Text>
                </View>
            </View>
        </View>
    ),
}