import React, { Component } from 'react'
import styles from './style'
import {View,  TextInput,} from 'react-native'


export default  props => (
    
    <View style={[styles.input,props.erro&&{borderColor:"red",borderWidth:2}]}>
        <TextInput
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
        />
    </View>
)