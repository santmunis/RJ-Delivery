import React, { Component } from 'react'
import styles from './style'
import {View} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

export default  props => (
    
    <View style={[styles.input,props.erro&&{borderColor:"red",borderWidth:2}]}>
        <TextInputMask
            placeholder={props.placeholder}
            type={props.type}
            options={props.options}
            value={props.value}
            onChangeText={props.onChangeText}
        />
    </View>
)