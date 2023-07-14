import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginStyle from "./style";
import { COLORS, MARGIN, FONT } from "../../constants";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";

const Login = ({ navigation }) => {
  //const [shoulShow, setshouldShow] = useState(true);
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
                source={require("./../../assets/login.png")}
                style={LoginStyle.image}
              />
          </View>
          {/* pati text la */}
          <View style={{ alignItems: "center", paddingTop: 30 }}>
            <Text
              style={{
                fontFamily: FONT.Black,
                fontSize: 20,
                color: COLORS.primary,
              }}
            >
              CONNEXION
            </Text>
            <Text
              style={{
                paddingTop: 5,
                fontFamily: FONT.SfProMedium,
                fontSize: 12,
                color: COLORS.text,
              }}
            >
              Remplissez les champs ci-dessous pour vous connecter
            </Text>
          </View>
          {/* pati input la */}
          <View style={{ width: "100%", paddingTop: 30 }}>
            <View>
              <TextInput
                // onPressIn={() => setshouldShow(!shoulShow)}
                placeholder="Entrer votre nif..."
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
            <View style={{ paddingTop: 20 }}>
              <TextInput
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
                //onFocus={() => setFocused(true)}
                // onBlur={() => setFocused(false)}
                secureTextEntry
                placeholder="Entrer votre mot de passe"
                placeholderTextColor={COLORS.text}
                selectionColor={COLORS.primary}
              />
            </View>
          </View>
          <View
            style={{ alignSelf: "flex-end", marginVertical: MARGIN.vertical }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text
                style={{ fontFamily: FONT.SfProMedium, color: COLORS.primary }}
              >
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>
          {/* pati button an */}
          <TouchableOpacity
            onPress={()=> navigation.navigate('Home') }
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 5,
              marginVertical: MARGIN.vertical,
              width: 276,
              height: 51,
              padding: MARGIN.vertical,
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.white, fontFamily: FONT.Black }}>
              Se connecter
            </Text>
          </TouchableOpacity>
          {/* pati forgotten lan */}

          <View
            style={{ alignSelf: "center", marginVertical: MARGIN.vertical }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{ fontFamily: FONT.SfProMedium, color: COLORS.primary }}
              >
                Nouveau sur KINISI ? Créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
