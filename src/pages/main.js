import React, { Component } from 'react'
import { AsyncStorage, BackHandler } from 'react-native';
import SelectCidade from '../components/inputs/selectCidades'
import SelectBairro from '../components/inputs/selectBairros'
import Button from '../components/buttons/primaryButton'
import ButtonSecundary from '../components/buttons/secundaryButton'
import styles from './style';
import { View, ImageBackground, Image, ScrollView } from 'react-native'
import api from '../services/api'
export default class Main extends Component {
   constructor(props) {
       super(props);
       this.state = {
         selectValue: undefined,
         selectValueBairro: undefined,
         cidades: [],
         bairros: [],
         lockBairros:false,
         itens:{
            city:'',
            neighborhood:'',
         },
         tok:'',
         loading:false
       };
     }

   static navigationOptions = {
        headerShown: false,
        headerStyle:{
          backgroundColor:'#F7931E'
        }
   }

   componentDidMount = () => {
     this.loadCity();
    // AsyncStorage.removeItem('token');
   } 

   getToken = async () =>{
      await AsyncStorage.getItem('token').then(
        ((token) =>{
          this.setState({tok:token})
        })
      )
   }

   getRoute = async () =>{
     await this.getToken()
     const {tok} = this.state
     console.log(tok)
     if(tok === "" || tok === null){
      this.props.navigation.navigate("Cadastro", { tok });
     }else{
      this.props.navigation.navigate("CadastroLoja")
     }
   }

   loadCity = async () =>{
     let {cidades} = this.state
    try{
      const response = await api.get('/');
      cidades = response.data
      this.setState({cidades})
    }catch(error){
      console.log(error)
    }
  }

  loadBairros = async (value) =>{
    let {bairros,itens} = this.state
    try{
      const response = await api.get(`${value}/neighborhoods`);
      console.log(response.data)
      bairros = response.data
      this.setState({bairros})
      itens.neighborhood = bairros[0].neighborhood
      this.setState({lockBairros:true})
    }catch(error){
      console.log(error.status)
    }
  }

   onValueChange = async (tipo,value) => {
     let {itens} = this.state
      switch(tipo){
        case 'cidade':
          itens.city = value
          this.setState({
            selectValue: value,
            itens
           });
          this.loadBairros(value)
          break;
        case 'bairro':
          itens.neighborhood = value
          this.setState({
            selectValueBairro: value,
            itens
           });
           break;
        default:
          break;
      }
   } 
    
     render(){
        const {selectValue,selectValueBairro,cidades,bairros, itens} = this.state
        console.log(selectValue)
        const nextPage = (nextPage, item) => this.props.navigation.push(nextPage, { item });
        return(
        <>
           <View style={styles.container}>
              <ImageBackground 
                source={require('./../Assets/img/teste.png')} 
                style={styles.image}
              >
              
                <View style={styles.content}>
                <ScrollView style={{flex:1}}>
                    <Image
                        style={{width:300, height:170}}
                        source={require('./../Assets/img/logo.png')}
                      />
                    <View style={styles.contentForm}>
                        <SelectCidade 
                          selecteValue={selectValue}
                          data={cidades}
                          onValueChange={(itemValue, itemIndex) => this.onValueChange('cidade',itemValue)} 
                        />
                        <SelectBairro 
                            selecteValue={selectValueBairro}
                            data={bairros}
                            onValueChange={(itemValue, itemIndex) => this.onValueChange('bairro',itemValue)} 
                        />
                        <Button text="Buscar" action={() => nextPage('lista', itens)}/>
                        <ButtonSecundary text="Cadastre um estabelicimento" action={ () => this.getRoute() }/>
                  </View>
                  </ScrollView>
                </View> 
              
              </ImageBackground>
           </View> 
        </>

        );
    }
}

