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

import {AddButton} from '../../uis/addButton'
import { TouchableRipple } from 'react-native-paper';

import { toastConfig, showToast } from '../../toast'
import {BottomMenu} from '../../menu'
import {ScheduleDB as db} from '../../../App'
import { getItems, deleteItem, QuerieStrings } from '../../queries'
import { VerticalLine } from '../../uis/verticalLine';

/**
 * Экран, отображающий выходные
 * 
 * @param {any} navigation - объект, передаваемый экранам, находящимся в StackNavigator
 */

export const WeekendsScreen = ({ navigation }) => {
    const [weekends, setWeekends] = useState([])
    const [currentWeekend, setCurrentWeekend] = useState(null)
    const [visible, setVisible] = useState(false)

    const isDarkMode = useColorScheme() === 'dark';
    const isFocused = useIsFocused();
    const isSuccess = useRoute().params?.isSuccess || false
    const route = useRoute()

    const rusMonthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    const rusDaysNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

    const getReadableDate = (date) => {
        const newDate = new Date(date)
        return (rusDaysNames[newDate.getDay()] + ", " + 
        newDate.getDate() + " " + 
        rusMonthNames[newDate.getMonth()] + " " + 
        newDate.getFullYear()).split(',')[1]
    }

    useEffect(() => {
        isFocused && getItems(QuerieStrings.GET_ALL.WEEKENDS, setWeekends)
        isSuccess && isFocused && showToast('success', route.params?.message)
    }, [isFocused, isSuccess])

    const close = () => {
        setVisible(false)
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableRipple style={{marginBottom: 20, borderRadius: 5}} borderless={true} rippleColor={'#FFF903'} onPress={() => {setVisible(true); setCurrentWeekend(item)}}>
                <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <VerticalLine/>
                    <View style = {styles.subjectBackground}>
                        <Text style = {{ alignSelf: 'center' }}>{item.Name}</Text>
                        <View style = {{ flexDirection: 'row', alignSelf: 'center' }}>
                            <Text>С{getReadableDate(item.StartDate)} </Text>
                            <Text>по{getReadableDate(item.EndDate)}</Text>
                        </View>
                    </View>
                    <VerticalLine/>
                </View>
            </TouchableRipple> 
        )
    }, [])

    const itemKeyExtractor = useCallback (item => item.IDW, [])

    return (
        <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
            <FlatList data={weekends} renderItem={renderItem} keyExtractor={itemKeyExtractor} />

            <AddButton navigation={navigation} screen='AddWeekend'/>

            <Toast position='bottom' visibilityTime={2000} config={toastConfig}/>

            <BottomMenu 
                title={'Выбранный выходной'} 
                navigation={navigation} 
                isOptionsSheet
                deleteSubject={() => { deleteItem(currentWeekend,
                                                    QuerieStrings.DELETE.WEEKEND,
                                                    [currentWeekend.IDW]),
                                        getItems(QuerieStrings.GET_ALL.WEEKENDS, setWeekends)}} 
                subject={currentWeekend} 
                visible={visible} 
                onClose={close} 
                db={db}
                screen={'AddWeekend'}
                editScreenTitle={'Редактировать выходной'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%', 
        padding: 10
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
    }
})