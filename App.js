import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  FlatList
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { BottomTabs } from './src/tab/BottomTabs';
import { SubjectsScreen } from './src/screens/Subject/Subject';
import { AddSubjectScreen } from './src/screens/Subject/addSubject';
import { TeachersScreen } from './src/screens/Teacher/Teacher';
import { AddTeacherScreen } from './src/screens/Teacher/addTeacher';
import { ClassroomsScreen } from './src/screens/Classroom/Classrooms';
import { AddClassroomScreen } from './src/screens/Classroom/addClassroom';
import { NotesScreen } from './src/screens/Note/Notes';
import { AddNoteScreen } from './src/screens/Note/addNote';
import { WeekendsScreen } from './src/screens/Weekend/Weekends';
import { AddWeekendScreen } from './src/screens/Weekend/addWeekend';

const Stack = createNativeStackNavigator();

const list = [
  {
    name: 'Subjects',
    rusName: 'Предметы',
    screen: SubjectsScreen
  },
  {
    name: 'Teacher',
    rusName: 'Преподователи',
    screen: TeachersScreen
  },
  {
    name: 'Classrooms',
    rusName: 'Аудитории',
    screen: ClassroomsScreen
  },
  {
    name: 'Notes',
    rusName: 'Заметки',
    screen: NotesScreen
  },
  {
    name: 'Weekends',
    rusName: 'Выходные',
    screen: WeekendsScreen
  }
]

const App  = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Schedule' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='BottomTabs' component={BottomTabs}/>
        {list.map((item) => {
          return (
            <Stack.Screen key={item.name} name = {item.name} component = {item.screen} options = {{ headerTitle: item.rusName, headerShown: true }}/>
          );
        })}
        <Stack.Screen name='AddSubject' component={AddSubjectScreen}/>
        <Stack.Screen name='AddTeacher' component={AddTeacherScreen}/>
        <Stack.Screen name='AddClassroom' component={AddClassroomScreen}/>
        <Stack.Screen name='AddNote' component={AddNoteScreen}/>
        <Stack.Screen name='AddWeekend' component={AddWeekendScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'blue'
  },
  highlight: {
    fontWeight: '700',
    color: 'blue'
  },
});

export default App;
export const Screens = list;