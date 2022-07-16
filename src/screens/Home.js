import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
Colors,
DebugInstructions,
Header,
LearnMoreLinks,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export const HomeScreen = props => {

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1
    };

    return(
        <SafeAreaView style={[backgroundStyle, {paddingBottom: '0.5%'}]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={{backgroundColor: 'red'}}>
                <Text style = {{alignSelf: 'flex-start', backgroundColor: 'yellow', color: 'blue', fontSize: 24}}>Aasfdas</Text>
            </View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
            </ScrollView>
            {/*<View style = {{flexDirection: "row", justifyContent: "space-between", padding: 10, paddingLeft: '5%', paddingRight: '5%', alignSelf: "center", width: '90%', backgroundColor: 'gray', borderRadius: 15}}>
                <TouchableOpacity id='1' style={{backgroundColor: 'red'}} onPress = {(as) => {alert(as.id + ' Hello from the lists.png!');}}>
                    <Image source={require('../icons/lists.png')} style={{ width: 25, height: 25 }}/>
                </TouchableOpacity>
                <TouchableOpacity id='2' style={{backgroundColor: 'red'}} onPress = {(as) => {alert(as.id + ' Hello from the homework.png!');}}>
                    <Image source={require('../icons/homework.png')} style={{ width: 25, height: 25 }}/>
                </TouchableOpacity>
                <TouchableOpacity id='2' style={{backgroundColor: 'red'}} onPress = {(as) => {alert(as.id + ' Hello from the home.png!');}}>
                    <Image source={require('../icons/home.png')} style={{ width: 25, height: 25 }}/>
                </TouchableOpacity>
            </View>*/}
        </SafeAreaView>
    )
}

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