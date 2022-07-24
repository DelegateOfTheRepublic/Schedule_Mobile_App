import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

export const VerticalLine = () => {
    return (
        <View style={styles.verticalLine}/>
    )
}

const styles = StyleSheet.create({
    verticalLine: {
        borderWidth: 1, 
        backgroundColor: 'purple', 
        borderColor: 'purple', 
        height: '100%', 
        width: 5, 
        borderRadius: 5
    }
})