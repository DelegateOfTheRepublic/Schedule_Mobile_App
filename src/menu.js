import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableRipple } from 'react-native-paper';
import React, {useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  useColorScheme
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


export const BottomMenu = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const currentItem = props?.subject
  const navigation = props?.navigation
  const refRBSheet = useRef();
  const screenTitle = props?.title
  const screen = props?.screen
  const title = props?.editScreenTitle
  const visible = props?.visible
  const isOptionsSheet = props?.isOptionsSheet

  useEffect(() => {
      visible && refRBSheet.current.open()
  }, [visible])

  return (
      <RBSheet
          ref={refRBSheet}
          height={props?.height? props.height : 150}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={() => props?.onClose()}
          customStyles={{
              container: {
                  paddingTop: 5
              }
          }}
      >
      <View style={{ flexDirection:'row', justifyContent:'space-around', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>{screenTitle}</Text>
        <View>
          <Image source={require('./icons/right-arrow.png')} style={{ width: 25, height: 25 ,tintColor: 'blue' }} />
        </View>
        <View style = {{ width: '50%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'green', padding: 5 }}>
            <Text style = {{ alignSelf: 'center' }}>{currentItem?.Name || currentItem?.FirstName || currentItem?.classroom || currentItem?.Note || currentItem?.Subject}</Text>
            {currentItem?.Color? 
              <View style={{ backgroundColor: currentItem?.Color, borderRadius: 13, width: 26, height: 26}}/>
              :
              null
            }
        </View>
      </View>

      {isOptionsSheet &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableRipple style = {{ alignSelf: 'flex-start', padding: 10 }} borderless={true} rippleColor={'purple'} onPress={() => { refRBSheet.current.close(); navigation.navigate(screen, {title, currentItem: currentItem}) }}>
            <Text style = {{ color: 'black' }}>Изменить</Text>
          </TouchableRipple> 

          <TouchableRipple style = {{ alignSelf: 'flex-start', padding: 10 }} borderless={true} rippleColor={'purple'} onPress={() => { refRBSheet.current.close();  props?.deleteSubject(); }}>
            <Text style = {{ color: 'black' }}>Удалить</Text>
          </TouchableRipple> 
        </View>
      }

      {!isOptionsSheet &&
        <FlatList data={currentItem?.Notes} renderItem={props?.renderItem}/>
      }
    </RBSheet>
  )
}