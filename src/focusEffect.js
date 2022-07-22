import { useFocusEffect } from '@react-navigation/native';
import {useCallback} from 'react';
import {
  BackHandler
} from 'react-native';

export const focusEffect = (screen, navigation) => { 
    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            navigation.navigate(screen, {isSuccess: false});
            return true;
          };
     
          BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
          );
     
          return () => {
            BackHandler.removeEventListener(
              'hardwareBackPress',
              onBackPress
            );
          };
        }, []),
    );
}