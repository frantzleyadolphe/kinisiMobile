import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

export default function VerifOtp({navigation}) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text>tounen sou page d akey</Text>
          </TouchableOpacity>
    </View>
  )
}