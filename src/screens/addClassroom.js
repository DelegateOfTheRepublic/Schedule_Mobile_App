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

export const AddClassroomScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const [classroom, setClassroom] = useState('')
    const [disabled, setDasabled] = useState(true)

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            <View>
                <TextInput style={{ color: isDarkMode ? Colors.lighter : Colors.darker }} placeholder='Аудитория' onChangeText={(classroom) => { setClassroom(classroom); setDasabled(!(classroom.length > 0));}} value={classroom} />
                <Text style={{alignSelf: 'flex-end'}} >{classroom.length}/256</Text>
            </View>

            <ResetButton onPress={() => { setClassroom(''); setDasabled(true); }} />

            <SubmitButton navigation={navigation} disabled={disabled} screen='Classrooms' params={{ classroom: classroom }} />
        </View>
    )
}