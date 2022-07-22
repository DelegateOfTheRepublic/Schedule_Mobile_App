import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {
  Text,
  useColorScheme,
  View,
  FlatList,
  ScrollView
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import SQLite from 'react-native-sqlite-storage'

import {AddButton} from '../../uis/addButton'
import { TouchableRipple } from 'react-native-paper';

import { toastConfig, showToast } from '../../toast'
import {BottomMenu} from '../../menu'
import {ScheduleDB as db} from '../../../App'
import { getItems, deleteItem, QuerieStrings } from '../../queries'

export const NotesScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([])
    const [currentNote, setCurrentNote] = useState(null)
    const [visible, setVisible] = useState(false)

    const isDarkMode = useColorScheme() === 'dark';
    const isFocused = useIsFocused();
    const isSuccess = useRoute().params?.isSuccess || false
    const route = useRoute()

    useEffect(() => {
        isFocused && getItems(QuerieStrings.GET_ALL.NOTES, setNotes)
        isSuccess && isFocused && showToast('success', route.params?.message)
    }, [isFocused, isSuccess])

    const close = () => {
        setVisible(false)
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => {setVisible(true); setCurrentNote(item)}}>
                <View style = {{ justifyContent: 'space-between', backgroundColor: 'green', padding: 10 }}>
                    <Text style = {{ alignSelf: 'center' }}>{item.Note}</Text>
                    <Text style = {{ alignSelf: 'center' }}>{item.Subject}</Text>
                    <Text style = {{ alignSelf: 'center' }}>{item.StartTime}</Text>
                    <Text style = {{ alignSelf: 'center' }}>{item.EndTime}</Text>
                    <Text style = {{ alignSelf: 'center' }}>{item.Date}</Text>
                </View>
            </TouchableRipple> 
        )
    }, [])

    const itemKeyExtractor = useCallback (item => item.IDN, [])

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            <FlatList data={notes} renderItem={renderItem} keyExtractor={itemKeyExtractor} />

            <AddButton navigation={navigation} screen='AddNote'/>

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>

            <BottomMenu 
                title={'Выбранная заметка'} 
                navigation={navigation} 
                deleteSubject={() => { deleteItem(currentNote,
                                                    QuerieStrings.DELETE.NOTE,
                                                    [currentNote.IDN]),
                                        getItems(QuerieStrings.GET_ALL.NOTES, setNotes)}} 
                subject={currentNote} 
                visible={visible} 
                onClose={close} 
                db={db}
                screen={'AddNote'}
                editScreenTitle={'Редактировать заметку'}
            />
        </View>
    )
}