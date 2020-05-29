import React, { Component } from 'react'
import FormData from 'form-data'
import ImagePicker from 'react-native-image-picker';
import { AsyncStorage, Platform } from 'react-native';
import styles from './style';
import { View, 
         ImageBackground, 
         Dimensions, 
         ScrollView, 
         Button,
         TouchableOpacity,
         Image,
         Text,
      } from 'react-native'
import Select from '../components/inputs/selectGenerico'
import InputMask from '../components/inputs/textInputMask'
import Input from '../components/inputs/input'
import ButtonPrimary from '../components/buttons/primaryButton'

export default class CadastroLoja extends Component {
   constructor(props) {
       super(props);
       this.state = {
            loja:{
                store_name:'',
                cep:'',
                telefone:'',
                whatsapp:'',
                social:'',
                service_class:'',
                image:[],
            },
            erro:{
                store_name:'',
                cep:'',
                whatsapp:"",
                store_nameInput:false,
                cepInput:false,
                whatsappInput:false,
            },
            imgBase64: [],
            tok: "",
            avatarSource: '',
            
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
   
   componentDidMount = async () =>{
      await this.getToken()
    }

   onValueChange =  (value, campo) => {
      let {loja} = this.state
      loja[campo] = value
      this.setState({loja})
    }

  selectPhotoTapped() {
    const options = {
      quality: 0.75,
      maxWidth: 300,
      maxHeight: 300,
      imageFileType: 'png',
      storageOptions: {
      skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;
        // You can display the image using either:
        source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
        const image = {
          uri: response.uri,
          type: 'image/png',
          name: 'myImage' + '-' + Date.now() + '.jpg',
        }
        // Instantiate a FormData() object
        
        const temp = response;

        //Or:
        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }

        this.setState({
          avatarSource: source,
          imgBase64: response,
        });
      }
    });
  }

  getToken = async () =>{
    await AsyncStorage.getItem('token').then(
      ((token) =>{
        this.setState({tok:token})
      })
    )
 }
  validaFormulario = () =>{
    const { loja, erro } = this.state
    const regexCel = /^\([1-9]{2}\) 9[7-9]{1}[0-9]{3}\-[0-9]{4}$/
    if(loja.store_name === ""){
      erro.store_name = "Este campo não pode estar vázio"
      erro.store_nameInput = true
    }else{
      erro.store_name = ""
      erro.store_nameInput = false
    }
    
    if (!loja.cep) {
      erro.cep = "Este campo não pode estar vázio"
      erro.cepInput = true
    } else if (loja.cep.length < 9) {
        erro.cep = "Cep Invalido"
        erro.cepInput = true
    } else {
      erro.cep = ""
      erro.cepInput = false
    }

    if (!loja.whatsapp) {
      erro.whatsapp = "Este campo não pode estar vázio"
      erro.whatsappInput = true
  } else if (regexCel.exec(loja.whatsapp)) {
      erro.whatsapp = ''
      erro.whatsappInput = false
  } else {
      erro.whatsapp = "Número Invalido"
      erro.whatsappInput = true
  }
    
    
    this.setState({erro})

    return (erro.store_name  || erro.cep || erro.whatsapp === true) ? false : true
  }

  upload = async () =>{
    const trava = this.validaFormulario()
    const { imgBase64, loja, tok } = this.state
    var _id = tok.replace('"', "").replace('"', "")
    const data = new FormData()
    data.append("store_name", loja.store_name)
    data.append("cep", loja.cep)
    data.append("telefone", loja.telefone )
    data.append("whatsapp", loja.whatsapp )
    data.append("social", loja.social )
    data.append("service_class", loja.service_class )
    data.append('image', {
      uri: imgBase64.uri,
      type: imgBase64.type,
      name: imgBase64.fileName
    });
    (trava === true)
        ? fetch('http://192.168.0.111:3333/stores', {
            body: data,
            method: 'post',
            headers: {
              'Authorization': _id,
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            }).then(res => {
            console.log(res)
          }).catch((err)=>{console.log(err)})
      
        :null
  }
 
  render(){
      const {loja, erro} = this.state
      
      return(
      <>
          <View style={styles.container}>
            <ImageBackground 
              source={require('./../Assets/img/teste.png')} 
              style={styles.image}
            >
            <ScrollView>
              
                <View style={styles.Form}>
                  <Input 
                      onChangeText={(text) => this.onValueChange(text,'store_name')}
                      value={loja.store_name}
                      placeholder="Digite o nome do estabelecimento"
                      erro={erro.store_name}
                  />
                  {
                    (erro.store_name)?
                    <Text style={styles.formFeedback}>{erro.store_name}</Text>
                    :null
                  }
                  <InputMask 
                    onChangeText={(text) => this.onValueChange(text,'cep')}
                    value={loja.cep}
                    placeholder="Digite o cep"
                    type='zip-code'
                    erro={erro.cepInput}
                  />
                  {
                    (erro.cep)?
                    <Text style={styles.formFeedback}>{erro.cep}</Text>
                    :null
                  }
                  <InputMask 
                    onChangeText={(text) => this.onValueChange(text,'telefone')}
                    value={loja.cep}
                    placeholder="Digite um telefone para contato"
                    type='cel-phone'
                    options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}
                    value={loja.telefone}
                  />
                  <InputMask 
                    onChangeText={(text) => this.onValueChange(text,'whatsapp')}
                    value={loja.cep}
                    placeholder="Digite o whatsapp "
                    type='cel-phone'
                    options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}
                    value={loja.whatsapp}
                    erro={erro.whatsappInput}
                  />
                  {
                    (erro.whatsapp)?
                    <Text style={styles.formFeedback}>{erro.whatsapp}</Text>
                    :null
                  }
                  <Input 
                      onChangeText={(text) => this.onValueChange(text,'social')}
                      value={loja.social}
                      placeholder="Digite o link a url para rede social"
                  />
                  <Select 
                    data={['Água & Gás',
                           'Farmácia',
                           'Mercado',
                           'Hortifruti',
                           'Lanche',
                           'Materiais de contrução',
                           'Cosméticos/Beleza',
                           'Outros'
                          ]}
                        placeholder="Selecione a classe do serviço prestado"
                        selecteValue={loja.service_class}
                        onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, 'service_class')}
                  />
                  
                  <Button title="Selecione a logo" onPress={this.selectPhotoTapped.bind(this)} />
                  <ButtonPrimary text="Cadastrar" action={() => this.upload()} /> 
                </View>
              
            </ScrollView>
            </ImageBackground>
          </View> 
      </>

      );
    }
}

