import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpStyle from "../../signup/style";
import { COLORS, FONT } from "../../../constants/index";

const SuccessEx = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={SignUpStyle.pageColor}>
        <View style={{ paddingTop: "35%" }}>
          <Image
            source={require("../../../assets/succes.jpg")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View style={{ paddingTop: "5%" }}>
          <Text style={SignUpStyle.titrePass}>
          Votre demande d'expertise a été effectuer et payer par moncash avec success
          </Text>
        </View>
        <View style={{ paddingTop: "5%" }}>
        <TouchableOpacity onPress={() => navigation.replace("Home")} style={SignUpStyle.btn}>
          <Text style={{ color: COLORS.white, fontFamily: FONT.Black }}>
            Retourner à l'accueil
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SuccessEx