import React, { Component } from 'react'
import api from '../services/api'
import { View,StyleSheet,Dimensions,Image,ScrollView,TouchableOpacity} from 'react-native'
import { Item, Input, Card, CardItem, Text, Body } from 'native-base';
const { height } = Dimensions.get('window');
export default class Main extends Component {
   constructor(props) {
       super(props);
       this.state = {
        screenHeight: 0,
        stores:[],
        campoPesquisa:''
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

   onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
      
    componentDidMount(){
        this.loadStore()
    }
    
    loadStore = async () =>{   
        item = this.props.navigation.state.params.item  
        console.log(item)
        try{
          const response = await api.get(`/stores/${item.city}/${item.neighborhood}`);
          var res = response.data
          this.setState({stores:res})
        }catch(error){
          console.log(error)
        }
       }

       buscarPor = (cep) => {
            return (x) => x.cep.toLowerCase().includes(cep.toLowerCase()) || !cep
        }

    render(){
        const scrollEnabled = this.state.screenHeight > height;
        const {stores} = this.state
        console.log(stores)
        return(
        <>
           <View style={styles.container}>
            <ScrollView>
                <View>
                    <Item rounded>
                        <Input placeholder="    Pesquise alguma loja..." 
                            onChangeText={(text) => {
                               
                                this.setState({campoPesquisa:text})}}
                            value={this.state.campoPesquisa}/>
                    </Item>
                </View>
                <View>
                
                    {
                        stores.filter(this.buscarPor(this.state.campoPesquisa)).map(store =>{
                            let url = store.img_url.replace('public',"")
                            console.log(url)
                            return(
                                <Card>
                                    <CardItem>
                                    <Body>
                                        <View style={styles.conterCard}>
                                            <View style={{paddingRight:5}}>
                                                <Image
                                                    style={{width:110, height:100}}
                                                    source={{uri: `http://192.168.0.111:3333/${url}` }}
                                                />
                                            </View>
                                            <View>
                                                <Text style={styles.title}>{store.store_name}</Text>
                                                <Text style={styles.subTitle}>{store.street }-{store.neighborhood}</Text>
                                                <Text style={styles.subTitle}>{store.cep }</Text>
                                                <Text style={styles.subTitle}>{store.telefone}</Text>
                                                <Text style={styles.subTitle}>{store.social}</Text>
                                                <Text style={styles.subTitle}>{store.service_class}</Text>
                                            </View>
                                        </View>
                                    </Body>
                                    </CardItem>
                                </Card> 
                            )
                        })
                    } 
                    
                </View>
                </ScrollView>
           </View> 
        </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        padding:8
      },
      conterCard:{
        flexDirection: 'row', 
        alignItems:'center'
      },
      title:{
          fontSize:19,
          fontWeight:'bold',
          color:'black',
    },
    subTitle:{
        fontSize:10,
        fontWeight:'100',
        color:'#A8A8A8',  
    }
     
      



})