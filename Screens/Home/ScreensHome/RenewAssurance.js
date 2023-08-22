import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "./../style";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RenewAssurance({ navigation }) {
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <View style={HomeStyle.Page}>
        <View style={HomeStyle.Header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
          <Text style={HomeStyle.TextHeader}>Numero expertise</Text>
          <TouchableOpacity>
            <Ionicons
              name="person-circle-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
        {/* pati corps paj lan */}
      </View>
    </SafeAreaView>
  );
}
