import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import Toast from 'react-native-toast-message';
import {
  Text,
  useColorScheme,
  View,
  FlatList,
  StyleSheet
} from 'react-native';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import ActionSheetManager, { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';
import SQLite from 'react-native-sqlite-storage'

import {AddButton} from '../../uis/addButton'
import { TouchableRipple } from 'react-native-paper';

import { toastConfig, showToast } from '../../toast'
import {BottomMenu} from '../../menu'
import { VerticalLine } from '../../uis/verticalLine'
import {ScheduleDB as db} from '../../../App'
import { getItems, deleteItem, QuerieStrings, getItemsCount } from '../../queries'

export const NotesScreen = ({ navigation }) => {
    const [subjectCountNotes, setSubjectCountNotes] = useState([])
    const [currentNote, setCurrentNote] = useState(null)
    const [currentSubjectCountNotes, setCurSCN] = useState(null) //setCurrentSubjectCountNotes
    const [visibleNotesSheet, setVisibleNS] = useState(false)
    const [visibleOptionsSheet, setVisibleOS] = useState(false)

    const isDarkMode = useColorScheme() === 'dark';
    const isFocused = useIsFocused();
    const isSuccess = useRoute().params?.isSuccess || false
    const route = useRoute()

    useEffect(() => {
        isSuccess && isFocused && showToast('success', route.params?.message)
        isFocused && getItemsCount(QuerieStrings.GET_COUNT.SUBJECTS_IN_NOTE, setSubjectCountNotes)
    }, [isFocused, isSuccess])

    const close = () => {
        setVisibleNS(false)
        setVisibleOS(false)
    }
    
    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableRipple style={{ borderRadius: 5, marginBottom: 10 }} borderless={true} rippleColor={'#FFF903'} onPress={() => {setVisibleNS(true); setCurSCN(item)}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <VerticalLine/>
                    <View style = {styles.subject}>
                        <Text style = {{ alignSelf: 'center' }}>
                            {item.Subject}
                        </Text>
                        <Text style = {{ alignSelf: 'center' }}>
                            {item.count}
                        </Text>
                    </View>
                    <VerticalLine/>
                </View>
            </TouchableRipple> 
        )
    }, [])

    const itemKeyExtractor = useCallback (item => item.Subject, [])

    const renderNote = useCallback(({ item, index }) => {
        return (
            <TouchableRipple style={{ marginTop: 10 }} key={`${item.Subject}${index}`} borderless={true} rippleColor={'#FFF903'} onPress={() => {setVisibleOS(true); setCurrentNote(item)}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <VerticalLine/>
                    <View style = {styles.teacher}>
                        <Text style = {{ alignSelf: 'center', color: 'black' }}>{item.Note}</Text>
                        <Text style = {{ alignSelf: 'center', color: 'black' }}>{item.Subject}</Text>
                        <Text style = {{ alignSelf: 'center', color: 'black' }}>{item.StartTime}</Text>
                        <Text style = {{ alignSelf: 'center', color: 'black' }}>{item.EndTime}</Text>
                        <Text style = {{ alignSelf: 'center', color: 'black' }}>{item.Date}</Text>
                    </View>
                    <VerticalLine/>
                </View>
            </TouchableRipple>
        )
    }, [])

    const updateCurSCN = () => { //updateCurrentSubjectCountNotes
        getItemsCount(QuerieStrings.GET_COUNT.SUBJECTS_IN_NOTE, setSubjectCountNotes).then((data) => {
            for (let i in data){
                let item = data[i]
                if (item.Subject === currentSubjectCountNotes.Subject) {
                    setCurSCN(item) //setCurrentSubjectCountNotes
                    break
                }
            }
        })
    }

    return (
        <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
            <FlatList data={subjectCountNotes} renderItem={renderItem} keyExtractor={itemKeyExtractor} />

            <AddButton navigation={navigation} screen='AddNote'/>

            <Toast position='top' visibilityTime={2000} config={toastConfig}/>

            <BottomMenu 
                title={'Выбранный предмет'}
                height={500} 
                isOptionsSheet={false}
                renderItem={renderNote}
                navigation={navigation} 
                subject={currentSubjectCountNotes} 
                visible={visibleNotesSheet} 
                onClose={close} 
                db={db}
                screen={'AddNote'}
                editScreenTitle={'Редактировать заметку'}
            />

            <BottomMenu 
                title={'Выбранная заметка'} 
                height={150}
                isOptionsSheet={true}
                navigation={navigation} 
                deleteSubject={() => {  deleteItem(currentNote,
                                        QuerieStrings.DELETE.NOTE,
                                        [currentNote.IDN]),
                                        updateCurSCN() //updateCurrentSubjectCountNotes
                                        }} 
                subject={currentNote} 
                visible={visibleOptionsSheet} 
                onClose={close} 
                db={db}
                screen={'AddNote'}
                editScreenTitle={'Редактировать заметку'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%', 
        padding: 10
    },
    subject: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: '#95276E', 
        borderRadius: 10, 
        padding: 5,
        width: 150
    },
    teacher: {
        flexDirection: 'column',
        justifyContent: 'space-between', 
        backgroundColor: '#8471D8', 
        borderRadius: 15, 
        paddingLeft: 8, 
        paddingRight: 8, 
        padding: 2
      }
  })