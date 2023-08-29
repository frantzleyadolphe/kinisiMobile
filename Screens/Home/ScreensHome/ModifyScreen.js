import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "../style";

const ModifyScreen = ({navigation}) => {
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
          <Text style={HomeStyle.TextHeader}>Modifier infos</Text>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default ModifyScreen;
