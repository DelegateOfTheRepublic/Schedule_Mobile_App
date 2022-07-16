import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
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
  Alert,
  Pressable
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import { ResetButton } from '../uis/resetButton';

import { SubmitButton } from '../uis/submitButton';

export const AddTeacherScreen = ({ navigation }) => {
    const [disabled, setDisabled] = useState(true)
    const [teacherName, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
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

            <ResetButton onPress={() => { setName(''); setPhoneNumber(''); setEmail(''); setAdditionalInfo(''); setDisabled(true) }} />

            <SubmitButton navigation={navigation} disabled={disabled} screen='Teacher' params = {{ teacherName: teacherName, phoneNumber: phoneNumber, email: email, additionalInfo: additionalInfo }} />
        </View>
    )
}