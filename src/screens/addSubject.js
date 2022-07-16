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

import { Overlay } from "@rneui/themed";
import ColorPicker from 'react-native-wheel-color-picker'
import { TouchableRipple, Button } from 'react-native-paper';
import { SubmitButton } from '../uis/submitButton';
import { ResetButton } from '../uis/resetButton';

export const AddSubjectScreen = ({ navigation }) => {
    const grey = '#707070'
    const [text, onChangeText] = React.useState("");
    const [changedColor, setColor] = useState(grey)
    const [pickedColor, submitColor] = useState(grey)
    const [disabled, setDisabled] = useState(true)

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
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
            
            <ResetButton onPress={() => {onChangeText(""); submitColor(grey); setDisabled(true)}} />

            <SubmitButton navigation={navigation} disabled={disabled} params = {[{ screen: 'Subjects', color: pickedColor, subject: text }]}/>

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
        </View>
    )
}