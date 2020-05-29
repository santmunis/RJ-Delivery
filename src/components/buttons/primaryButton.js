import React, { Component } from 'react'
import styles from './style';
import { TouchableOpacity, Text } from 'react-native'

export default  props => (
    
    <TouchableOpacity style={styles.primaryButton} onPress={props.action}>
        <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>{props.text}</Text>
    </TouchableOpacity>  
)
