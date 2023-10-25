import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "../style";

const QueryList = () => {
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <View style={HomeStyle.Page}>
        <View style={HomeStyle.Section}>
          <View style={HomeStyle.ViewButton}>
            <TouchableOpacity
              style={HomeStyle.button}
              //onPress={() => navigation.navigate("RenewAssurance")}
            >
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../../assets/Renouvellement.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>
                 Mes demandes de renouvellement
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={HomeStyle.button}
              //onPress={() => navigation.navigate("ExpertiseQuery")}
            >
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../../assets/Expertise.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>Mes demandes d’expertise</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.ViewButton}>
            <TouchableOpacity
              style={HomeStyle.button}
              //onPress={() => navigation.navigate("AlertVehicle")}
            >
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../../assets/Alert.png")}
                  style={HomeStyle.image2}
                />
                <Text style={HomeStyle.Text}>Mes alertes de vol</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QueryList;
