import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpStyle from "../signup/style";
import { COLORS, FONT } from "../../constants";

export default function Success({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={SignUpStyle.pageColor}>
        <View style={{ paddingTop: "35%" }}>
          <Image
            source={require("../../assets/succes.jpg")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View style={{ paddingTop: "5%" }}>
          <Text style={SignUpStyle.titrePass}>
            Votre mot de passe a été modifié avec succès
          </Text>
        </View>
        <View style={{ paddingTop: "5%" }}>
        <TouchableOpacity onPress={() => navigation.replace("Login")} style={SignUpStyle.btn}>
          <Text style={{ color: COLORS.white, fontFamily: FONT.Black }}>
            Se conneter
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
