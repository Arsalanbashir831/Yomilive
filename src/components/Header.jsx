import { View, Text, Image ,StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={style.container}>
    <Image style={style.imageStyle} source={require('../assets/logoYomo.jpg')} />
    </View>
  )
}
const style= StyleSheet.create({
    imageStyle :{
       height:50,
       width:180,
    }, container: {
        width:"100%",
        backgroundColor:"black",
        padding:15
    }
})

export default Header