import { useIsFocused, useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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

    const renderItem = ({ item }) => (
      <TouchableRipple borderless={true} rippleColor={'purple'} onPress={() => {setVisible(true); setCurrentClassroom(item)}}>
          <View style = {{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'green', padding: 10 }}>
              <Text style = {{ alignSelf: 'center' }}>{item.classroom}</Text>
              <View style={{ backgroundColor: item.Color, borderRadius: 13, width: 26, height: 26}}/>
          </View>
      </TouchableRipple> 
    );

    return (
        <View style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, height: '100%'}}>
            <FlatList data={classrooms} renderItem={renderItem} keyExtractor={item => item.IDCr} />

            <AddButton navigation={navigation} screen='AddClassroom'/>

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>

            <BottomMenu 
                title={'Выбранная аудитория'} 
                navigation={navigation} 
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