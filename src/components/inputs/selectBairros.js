import React, { Component } from 'react'
import styles from './style';
import { View, Picker } from 'react-native'

export default  props => (
    
    <View style={ styles.input} >
        <Picker
                selectedValue={props.selecteValue}
                mode='dropdown'
                style={{justifyContent:'center'}}
                onValueChange={props.onValueChange}
            >
                {
                    
                    props.data ?
                        props.data.map(bairro =>{
                        return (
                            <Picker.Item key ={bairro.neighborhood} label={bairro.neighborhood} value={bairro.neighborhood} />
                        )
                        })
                    :
                    <Picker.Item  label="Selecione seu bairro" value='' />
                }
            </Picker>
    </View>
)
