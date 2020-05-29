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
                        props.data.map(cidade =>{
                        return (
                            <Picker.Item key ={cidade.city} label={cidade.city} value={cidade.city} />
                        )
                        })
                    :
                    <Picker.Item  label="Selecione sua cidade" value='' />
                }
            </Picker>
    </View>
)

