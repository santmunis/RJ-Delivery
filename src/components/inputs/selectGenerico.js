import React, { Component } from 'react'
import styles from './style';
import { View, Picker } from 'react-native'

export default  props => (
    <View style={ styles.input} >
        <Picker
                selectedValue={props.selecteValue}
                mode='dropdown'
                style={{justifyContent:'center',color:'grey',fontWeight:'100'}}
                onValueChange={props.onValueChange}
            >
                <Picker.Item key ={props.placeholder} label={props.placeholder} value="" />
                {
                    props.data ?
                        props.data.map(data =>{
                        return (
                            <Picker.Item key ={data} label={data} value={data} />
                        )
                        })
                    :null
                }
            </Picker>
    </View>
)