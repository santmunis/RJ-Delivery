import React, { Component } from 'react'
import { AsyncStorage } from 'react-native';

import { View, Text, StyleSheet, ImageBackground, TextInput,Dimensions, TouchableOpacity, Image } from 'react-native'
import api from '../services/api'
export default class Main extends Component {
   constructor(props) {
       super(props);
       this.state = {
            user:{
                name: '',
                email:'',
                cpf:'',
            }
       };
     }

     static navigationOptions = ({ navigation, screenProps }) => ({
      title: '',
      headerStyle: {
        backgroundColor: '#F7931E',
      },
      tintColor: 'transparent',
      headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}>
                            <View style={{flexDirection:"row",justifyContent:"center"}}>
                            <Image source={require('../Assets/img/back2.png')} 
                                style={{marginTop: 10, marginLeft:10,width:25, height:25}} />
                                <Text style={{marginTop: 10, marginLeft:10}} >Voltar</Text>
                            </View>
                            </TouchableOpacity>
});

   onValueChange =  (value, campo) => {
     const {user} = this.state
     user[campo] = value
   } 
    nextPage = nextPage => this.props.navigation.navigate(nextPage);
   cadastraUser = async () => {
     const {user} = this.state
    try{
      await api.post('/users', user).then(
        (response) =>{
            this.setItemLocal(response)
            
        }
      )    
    }catch(error){
      console.log(error)
    }
  }
  setItemLocal = async (response) =>{
      console.log(response)
      if(response){
        AsyncStorage.setItem('token', JSON.stringify(response.data.id));
        console.log("ID:"+response.data.id)
        this.props.navigation.navigate('CadastroLoja', "Main")
      }
  }
    render(){
        const {user} = this.state

        
        const nextPage = nextPage => this.props.navigation.navigate('lista', { nextPage });
        return(
        <>
           <View style={styles.container}>
              <ImageBackground 
                source={require('./../Assets/img/teste.png')} 
                style={styles.image}
              >
                <View style={styles.content}>
                      <View>
                        <View style={styles.viewText}>
                          <Text style={styles.textInfo}>
                              Vamos começar o seu Cadastro! Primeiro nos diga o seu nome completo.
                          </Text>
                        </View>
                      </View>
                    <View style={styles.contentForm}>
                      <View style={ styles.select}>
                          <TextInput
                              placeholder="Digite seu nome"
                              onChangeText={(text) => {
                                  user['name'] = text
                                  this.setState({user})}}
                              value={this.state.user.nome}
                          />
                      </View>
                      <View style={styles.viewText}>
                        <Text style={styles.textInfo}>
                            Agora digite um email para contato. Não se preocupe você só será contato caso ocorra algum problema
                        </Text>
                      </View>
                      <View style={ styles.select}>
                        <TextInput
                            placeholder="Digite seu email"
                            onChangeText={(text) => {
                                user['email'] = text
                                this.setState({user})}}
                            value={this.state.user.email}
                        />
                      </View>
                      <View style={styles.viewText}>
                        <Text style={styles.textInfo}>
                            Agora precisamos confirmar a sua intenditade, informe o numero do seu cpf. Não se procupe seus dados não seram compartilhados 
                        </Text>
                      </View>
                      <View style={ styles.select}>
                        <TextInput
                            placeholder="Digite seu CPF"
                            onChangeText={(text) => {
                                user['cpf'] = text
                                this.setState({user})}}
                            value={this.state.user.cpf}
                        />
                      </View>
                     
                      <TouchableOpacity
                        style={styles.buttonBusca}
                        onPress={() => this.cadastraUser()}
                      >
                          <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>Cadastrar</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              </ImageBackground>
           </View> 
        </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      content: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width:"100%",
        height:"100%",
        
      },
      select:{
        height:60,
        width:320,
        padding:6,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        textAlign:'center',
        marginBottom:10,
      },
      buttonBusca:{
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#c12823",
        padding: 10,
        width:320,
        height:50,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius:4,
      },
      contentForm:{
        flex:1,
        flexDirection: "column",
        alignItems:'center',
      },
      textInfo:{
          textAlign:'justify',
          color:'white',
          fontWeight:'bold',
          marginBottom:4,
      },
      viewText:{
        paddingHorizontal:8,
      }
})