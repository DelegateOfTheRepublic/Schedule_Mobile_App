
import React, {useCallback, useEffect, useState} from 'react';
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

import { VerticalLine } from '../uis/verticalLine'

export const HomeScreen = props => {

    const isDarkMode = useColorScheme() === 'dark';

    var currentWeekNumber = require('current-week-number');
    const isOddWeek = currentWeekNumber() % 2 != 0

    const getWeekMarker = (showTitle = false) => {
        return (
            <View style={{flexDirection: 'row', backgroundColor: '#8471D8', borderRadius: 10, alignSelf: 'flex-start', paddingLeft: 5}}>
                {showTitle && <Text>{isOddWeek? 'Сейчас верхняя неделя' : 'Сейчас нижняя неделя'}</Text>}
                <View style={{ backgroundColor: isOddWeek? 'blue' : 'lime', borderRadius: 11, width: 20, height: 20, marginLeft: showTitle? 15 : 0}}/>
            </View>
        )
    }

    const renderItem = useCallback(({ item }) => {
        let key = Object.keys(item)[0]
        let subjects = item[key]
        return (
            <View style={styles.horizontalLine}>
                <Text style={{ marginBottom: 5 }} >{key}</Text>
                <View>
                    {subjects.map((subject) => {
                        let weekSubject = 
                            subject.withDivision? 
                                isOddWeek?
                                    subject.top : subject.bottom
                            : subject.top
                        
                        return (
                                weekSubject != '' ?
                                    <View style={styles.subjectsContainer}>
                                        <VerticalLine/>
                                        <View style={styles.subjectBackground}>
                                            <Text style = {styles.subject}>{ weekSubject.subject }</Text>
                                            <Text style = {styles.teacher}>{ weekSubject.teacher }</Text>
                                            <View style={[styles.addInfo, {paddingRight: subject.withDivision? 0 : 5}]}>
                                                <Text style={{ marginRight: 10 }}>{ weekSubject.classroom }</Text>
                                                <Text style={{ marginRight: subject.withDivision? 10 : 0 }}>{ weekSubject.subjectType }</Text>
                                                { subject.withDivision && getWeekMarker()}
                                            </View>
                                        </View>
                                        <VerticalLine/>
                                    </View>
                                :   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <VerticalLine/>
                                        <Text style = {styles.noSubject}>Пары нет</Text>
                                        <VerticalLine/>
                                    </View>
                        )
                    })}
                </View>
            </View>
        )
    }, [])

    const itemKeyExtractor = useCallback((item) => Object.keys(item)[0], [])

    const data = [
        {
            'Пн': [
                {
                    withDivision: true,
                    top: {
                        subject: 'Разработка программных приложений',
                        subjectType: 'Лекция',
                        teacher: 'проф. Болотнов А.М.',
                        classroom: 521
                    },
                    bottom: {
                        subject: 'Математическое программирование',
                        subjectType: 'Практика',
                        teacher: 'доц. Ефимов А.М.',
                        classroom: 511
                    }
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Разработка программных приложений',
                        subjectType: 'Практика',
                        teacher: 'проф. Болотнов А.М.',
                        classroom: 521
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Теория вероятностей и математическая статистика',
                        subjectType: 'Лекция',
                        teacher: 'доц. Хисаметдинова Г.К.',
                        classroom: 530
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Проектирование информационных систем',
                        subjectType: 'Лекция',
                        teacher: 'доц. Путинцева А.А.',
                        classroom: 521
                    },
                    bottom: ''
                }
            ]
        },
        {
            'Вт': [
                {
                    withDivision: false,
                    top: '',
                    bottom: ''
                },
                {
                    withDivision: true,
                    top: {
                        subject: 'Разработка программных приложений',
                        subjectType: 'Лекция',
                        teacher: 'проф. Болотнов А.М.',
                        classroom: 521
                    },
                    bottom: {
                        subject: 'Математическое программирование',
                        subjectType: 'Практика',
                        teacher: 'доц. Ефимов А.М.',
                        classroom: 511
                    }
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Теория систем и системный анализ',
                        subjectType: 'Лекция',
                        teacher: 'доц. Абдюшева С.Р.',
                        classroom: 511
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Физическая культура и спорт',
                        subjectType: 'Практика',
                        teacher: '-',
                        classroom: "Спорт комплекс БашГУ"
                    },
                    bottom: ''
                }
            ]
        },
        {
            'Ср': [
                {
                    withDivision: false,
                    top: {
                        subject: 'Математическое программирование',
                        subjectType: 'Практика',
                        teacher: 'доц. Ефимов А.М.',
                        classroom: 509
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Проектирование информационных систем',
                        subjectType: 'Практика',
                        teacher: 'доц. Путинцева А.А.',
                        classroom: 509
                    },
                    bottom: ''
                },
                {
                    withDivision: true,
                    top: {
                        subject: 'Проектный практикум',
                        subjectType: 'Практика',
                        teacher: 'доц. Ткачев В.И.',
                        classroom: 509
                    },
                    bottom: {
                        subject: 'Теория систем и системный анализ',
                        subjectType: 'Практика',
                        teacher: 'доц. Абдюшева С.Р.',
                        classroom: 511
                    }
                },
                {
                    withDivision: false,
                    top: '',
                    bottom: ''
                }
            ]
        },
        {
            'Чт': [
                {
                    withDivision: false,
                    top: {
                        subject: 'Численные методы решения ЭС',
                        subjectType: 'Лекция',
                        teacher: 'доц. Ткачев В.И.',
                        classroom: 517
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Базы данных',
                        subjectType: 'Лекция',
                        teacher: 'доц. Бердникова М.Л.',
                        classroom: 517
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Базы данных',
                        subjectType: 'Практика',
                        teacher: 'доц. Бердникова М.Л.',
                        classroom: 509
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: '',
                    bottom: ''
                }
            ]
        },
        {
            'Пт': [
                {
                    withDivision: false,
                    top: {
                        subject: 'Численные методы решения ЭС',
                        subjectType: 'Практика',
                        teacher: 'доц. Ткачев В.И.',
                        classroom: '520а'
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Теория систем и системный анализ',
                        subjectType: 'Практика',
                        teacher: 'доц. Абдюшева С.Р.',
                        classroom: 511
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Кроссплатформенные приложения',
                        subjectType: 'Практика',
                        teacher: 'ст. преп. Салимов Р.К.',
                        classroom: 426
                    },
                    bottom: ''
                },
                {
                    withDivision: false,
                    top: {
                        subject: 'Кроссплатформенные приложения',
                        subjectType: 'Практика',
                        teacher: 'ст. преп. Салимов Р.К.',
                        classroom: 426
                    },
                    bottom: ''
                }
            ]
        }
    ]

    return(
        <View style={[styles.mainContainer, {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}]}>
            {getWeekMarker(true)}
            <FlatList data={data} renderItem={renderItem} keyExtractor={itemKeyExtractor} />
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
        backgroundColor: '#95276E', 
        borderRadius: 10, 
        paddingLeft: 5, 
        paddingRight: 5, 
        marginBottom: 5
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