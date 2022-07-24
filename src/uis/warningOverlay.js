import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
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
  BackHandler,
  Alert,
  Pressable,
  Dimensions
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

import SQLite from 'react-native-sqlite-storage'

import { ModalPortal,  Modal,  ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { Overlay } from "@rneui/themed";
import ColorPicker from 'react-native-wheel-color-picker'
import { TouchableRipple, Button } from 'react-native-paper';
import { SubmitButton } from '../../uis/submitButton';
import { ResetButton } from '../../uis/resetButton';
import { BackHeader } from '../../uis/backHeader';
import { useRoute } from '@react-navigation/native';
import { toastConfig, showToast } from '../../toast'
import Toast from 'react-native-toast-message';
import { addItem, editItem, QuerieStrings } from '../../queries'
import { focusEffect } from '../../focusEffect'

/**
 * 
 * @param {boolean} visibleWarning - показывает, отображать overlay или нет
 * @param {state} toggleModalWarning - устанавливает значение visibleWarning
 * @param {string} baseScreen - на него будет совершен переход 
 */

export const WarningOverlay = ({ visibleWarning, toggleModalWarning, baseScreen, navigation }) => {
    return (
        <Overlay isVisible={visibleWarning} onBackdropPress={toggleModalWarning}>
            <Text style={{color: 'black'}}>Выйти без сохранения?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableRipple borderless={true} rippleColor='purple' onPress={toggleModalWarning} style={{ padding: 5 }}>
                    <Text style={{color: 'black'}}>Отмена</Text>
                </TouchableRipple>

                <TouchableRipple borderless={true} rippleColor='purple' onPress={() => navigation.navigate(baseScreen, {isSuccess: false})} style={{ padding: 5 }}>
                    <Text style={{color: 'black'}}>Выход</Text>
                </TouchableRipple>
            </View>
        </Overlay>
    )
}