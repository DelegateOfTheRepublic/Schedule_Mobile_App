import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
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
import SQLite from 'react-native-sqlite-storage'

import {AddButton} from '../../uis/addButton'
import { TouchableRipple } from 'react-native-paper';

import { toastConfig, showToast } from '../../toast'
import {BottomMenu} from '../../menu'
import {ScheduleDB as db} from '../../../App'
import { getItems, deleteItem, QuerieStrings } from '../../queries'

SQLite.DEBUG(true);

/**
 * Экран, отображающий аудитории
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const ClassroomsScreen = ({ navigation }) => {
    const [classrooms, setClassrooms] = useState([])
    const [currentClassroom, setCurrentClassroom] = useState(null)
    const [visible, setVisible] = useState(false)

    const isDarkMode = useColorScheme() === 'dark';
    const isFocused = useIsFocused();
    const isSuccess = useRoute().params?.isSuccess || false
    const route = useRoute()

    useEffect(() => {
        isFocused && getItems(QuerieStrings.GET_ALL.CLASSROOMS, setClassrooms)
        isSuccess && isFocused && showToast('success', route.params?.message)
    }, [isFocused, isSuccess])

    const close = () => {
        setVisible(false)
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableRipple style={{borderRadius: 10}} borderless={true} rippleColor={'#FFF903'} onPress={() => {setVisible(true); setCurrentClassroom(item)}}>
                <View style = {styles.subject}>
                    <Text style = {{ alignSelf: 'center' }}>{item.classroom}</Text>
                </View>
            </TouchableRipple> 
        )
    }, [])

    const itemKeyExtractor = useCallback (item => item.IDCr, [])

    return (
        <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
            <FlatList data={classrooms} renderItem={renderItem} keyExtractor={itemKeyExtractor} />

            <AddButton navigation={navigation} screen='AddClassroom'/>

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>

            <BottomMenu 
                title={'Выбранная аудитория'} 
                navigation={navigation} 
                isOptionsSheet
                deleteSubject={() => { deleteItem(currentClassroom,
                                                    QuerieStrings.DELETE.CLASSROOM,
                                                    [currentClassroom.IDCr]),
                                        getItems(QuerieStrings.GET_ALL.CLASSROOMS, setClassrooms)}} 
                subject={currentClassroom} 
                visible={visible} 
                onClose={close} 
                db={db}
                screen={'AddClassroom'}
                editScreenTitle={'Редактировать аудиторию'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%', 
        padding: 10
    },
    horizontalLine: {
        borderBottomColor: '#8471D8', 
        borderStyle: 'dashed', 
        borderBottomWidth: 1, 
        marginBottom: 5
    },
    subjectsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 15
    },
    subjectBackground: {
        backgroundColor: '#8471D8', 
        borderRadius: 10, 
        padding: 5
    },
    subject: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: '#95276E', 
        borderRadius: 10, 
        padding: 5
    },
    noSubject: {
        backgroundColor: '#95276E', 
        borderRadius: 10, 
        paddingLeft: 5, 
        paddingRight: 5
    },
    teacher: {
        backgroundColor: '#A6A201', 
        borderRadius: 10, 
        paddingLeft: 5, 
        paddingRight: 5, 
        alignSelf: 'flex-start', 
        marginBottom: 5
    },
    addInfo: {
        backgroundColor: 'purple', 
        borderRadius: 10, 
        paddingLeft: 5, 
        flexDirection: 'row', 
        alignSelf: 'flex-end'
    },
    verticalLine: {
        borderWidth: 1, 
        backgroundColor: 'purple', 
        borderColor: 'purple', 
        height: '100%', 
        width: 5, 
        borderRadius: 5
    }
  })