import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native"
import React from 'react'

const Home = () => {
  return (
  <View >
  <Text style={style.textHeading}>Talk to Stranger</Text>
  <TouchableOpacity style={style.button}>
  
    <Text style={style.texture}>Start Video Chat</Text>
  </TouchableOpacity>
  </View>
  )
}

const style = StyleSheet.create({
   
    texture : {
        color:"white",
        textAlign:'center',
        fontWeight:'bold'
    },button:{
        backgroundColor:"#1e5799",
        padding:20,
        borderRadius:10
    },textHeading:{
        fontSize:30,
        color:"white",
        padding:20
    }
})

export default Home