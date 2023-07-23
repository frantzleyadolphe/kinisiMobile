import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LoginStyle from "../Login/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, MARGIN, FONT } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

const ForgotPassword = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: MARGIN.horizontal,
            marginLeft: MARGIN.horizontal,
          }}
        >
          <View style={LoginStyle.view}>
            <Image
              source={require("./../../assets/forgotPassword.png")}
              style={LoginStyle.image}
            />
          </View>
          {/* pati text la */}
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Text
              style={{
                fontFamily: FONT.Black,
                fontSize: 20,
                color: COLORS.primary,
              }}
            >
              MOT DE PASSE OUBLIE
            </Text>
            <Text
              style={{
                paddingTop: 5,
                fontFamily: FONT.SfProMedium,
                fontSize: 12,
                color: COLORS.text,
                opacity: 0.6,
              }}
            >
              Pour reinitialiser votre mot de passe, veuillez entrer votre email
              et vous recevrez un lien de reinitialisation.
            </Text>
          </View>
          {/* {pati input la } */}
          <View style={{ width: "100%", paddingTop: 20 }}>
            <View>
              <TextInput
                //onPressIn={() => setshouldShow(!shoulShow)}
                placeholder="Entrer votre email"
                placeholderTextColor={COLORS.text}
                selectionColor={COLORS.primary}
                style={[
                  {
                    height: 48,
                    width: "100%",
                    backgroundColor: COLORS.secondary,
                    padding: MARGIN.horizontal,
                    borderRadius: 10,
                    fontFamily: FONT.SfProRegular,
                  },
                  // focused && {
                  //   borderWidth: 2,
                  //   backgroundColor: COLORS.white,
                  //   borderColor: COLORS.primary,
                  //   fontFamily: FONT.SfProRegular,
                  // },
                ]}
              />
            </View>
            <View
              style={{ alignSelf: "flex-end", marginVertical: MARGIN.vertical }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.SfProMedium,
                    color: COLORS.primary,
                    fontSize: 12,
                  }}
                >
                  Je me souviens du mot de passe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* pati button an */}
          <TouchableOpacity
            onPress={()=> navigation.navigate('Home') }
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 5,
              //marginVertical: MARGIN.vertical,
              width: 276,
              height: 51,
              padding: MARGIN.vertical,
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.white, fontFamily: FONT.Black }}>
              Reinitialiser
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
