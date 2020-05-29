import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    primaryButton:{
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
      }
})

export default styles;