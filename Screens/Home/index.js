import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import HomeStyle from "./style";
import SliderImage from "../../components/SliderImage";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const { isLoading } = useContext(AuthContext);

  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <View style={HomeStyle.Page}>
        <View style={HomeStyle.SectionIcon}>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={40}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
            <Ionicons
              name="person-circle-outline"
              size={40}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
        <Spinner visible={isLoading} />
        <SliderImage />
        <View style={HomeStyle.Section}>
          <View style={HomeStyle.ViewButton}>
            <TouchableOpacity
              style={HomeStyle.button}
              onPress={() => navigation.navigate("RenewAssurance")}
            >
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../assets/Renouvellement.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>
                  Renouveler ma police d’assurance
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={HomeStyle.button}>
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../assets/Expertise.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>Demande d’expertise</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.ViewButton}>
            <TouchableOpacity style={HomeStyle.button} onPress={()=>navigation.navigate("AlertVehicle")}>
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../assets/Alert.png")}
                  style={HomeStyle.image2}
                />
                <Text style={HomeStyle.Text}>Alerte vol de Vehicule</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={HomeStyle.button}>
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../assets/Suivie.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>Suivie de mes requêtes</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.ViewButton}>
            <TouchableOpacity style={HomeStyle.button}>
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../assets/HelpCenter.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>Centre de support technique</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={HomeStyle.button}>
              <View style={HomeStyle.viewButton}>
                <Image
                  source={require("../../assets/FAQ.png")}
                  style={HomeStyle.image}
                />
                <Text style={HomeStyle.Text}>FAQ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
