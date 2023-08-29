import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "../style";
import { AuthContext } from "../../../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profil = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
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
          <Text style={HomeStyle.TextHeader}>Profil</Text>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Image
            style={HomeStyle.avatarProfil}
            source={require("../../../assets/avatar.png")}
          />
        </View>
        <View style={HomeStyle.viewProfil}>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row} onPress={()=>navigation.navigate("Modify") }>
              <Ionicons
                name="person-circle-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>
                Editer mes informations personnels
              </Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="notifications-circle-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Mes notifications</Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="settings-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Parametres</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="language-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Langues</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "50%", paddingTop: 20 }}>
          <TouchableOpacity onPress={logout} style={HomeStyle.row}>
            <Ionicons
              name="log-out-outline"
              size={38}
              style={HomeStyle.iconProfil}
            />
            <Text style={HomeStyle.text}>Deconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profil;
