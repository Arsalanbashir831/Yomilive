import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import Home from './src/screens/Home'
import Header from './src/components/Header'
import VideoCall from './src/screens/VideoCall'

const App = () => {
  return (
    <>
    <Header/>
      <View style={style.container}>

      {/* <Home/> */}
      <VideoCall/>
      </View>

    </>
  
  )
}
const style=StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"black",
    height:"100%"
  }
})

export default App