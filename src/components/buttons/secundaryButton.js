import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default  props => (
    
    <TouchableOpacity  onPress={props.action}>
        <Text style={{fontSize:12, fontWeight:'bold',color:'#0000ff'}}>{props.text}</Text>
    </TouchableOpacity>  
)