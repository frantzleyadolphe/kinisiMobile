import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const IndicatorLoading = () => {
  return (
    <View style={{flex:1, justifyContent:'center', backgroundColor:'white'}}>
      <ActivityIndicator size="large" color={COLORS.spinner}/>
    </View>
  )
}

export default IndicatorLoading