import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Main from './pages/main'
import Lista from './pages/lista-lojas'

import Cadastro from './pages/cadastroUser'
import CadastroLojas from './pages/cadastroLoja'

const RootStack = createStackNavigator({
    
      home:{
        screen: Main
       },
       lista: {
        screen: Lista
       },
       Cadastro: {
        screen: Cadastro
       },
       CadastroLoja: {
        screen: CadastroLojas
       }
    
    },
    {
      initialRouteName: 'home', 
    }
    
  );

const App = createAppContainer(RootStack);

export default App;