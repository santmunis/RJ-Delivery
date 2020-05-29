import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      content: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height:450,
        
      },
      contentForm:{
        height:250,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems:'center',
      },
      Form:{
        height:630,
        flexDirection: "column",
        justifyContent: "space-between",
        padding:10,
        paddingTop:20,
        alignItems:'center',
      },
      formFeedback:{
        alignSelf:"flex-start",
        marginLeft:12,
        marginTop:-16,
        color:"red",
        fontWeight:"bold"
      }

})

export default styles;