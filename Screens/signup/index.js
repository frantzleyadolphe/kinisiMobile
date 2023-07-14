import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, MARGIN, FONT } from "../../constants";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: MARGIN.horizontal,
            marginLeft: MARGIN.horizontal,
          }}
        >
          <Image
            source={require("./../../assets/signup.png")}
            style={{ width: 300, height: 300 }}
          />
          {/* pati text la */}
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Text
              style={{
                fontFamily: FONT.Black,
                fontSize: 20,
                color: COLORS.primary,
              }}
            >
              INSCRIPTION
            </Text>
            <Text
              style={{
                paddingTop: 5,
                fontFamily: FONT.SfProMedium,
                fontSize: 12,
                color: COLORS.text,
              }}
            >
              Remplissez les champs ci-dessous pour créer un compte
            </Text>
          </View>
          {/* pati input la */}
          <View style={{ width: "100%", paddingTop: 20 }}>
            <View>
              <TextInput
                //onFocus={() => setFocused(true)}
                //onBlur={() => setFocused(false)}
                placeholder="Entrer votre nif..."
                placeholderTextColor={COLORS.text}
                selectionColor={COLORS.primary}
                style={[
                  {
                    height: 48,
                    width: "100%",
                    backgroundColor: COLORS.secondary,
                    padding: MARGIN.horizontal,
                    borderRadius: 5,
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
            <View style={{ paddingTop: 15 }}>
              <TextInput
                style={[
                  {
                    height: 48,
                    width: "100%",
                    backgroundColor: COLORS.secondary,
                    padding: MARGIN.horizontal,
                    borderRadius: 5,
                    fontFamily: FONT.SfProRegular,
                  },
                  // focused && {
                  //   borderWidth: 2,
                  //   backgroundColor: COLORS.white,
                  //   borderColor: COLORS.primary,
                  //   fontFamily: FONT.SfProRegular,
                  // },
                ]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Entrer votre email"
                placeholderTextColor={COLORS.text}
                selectionColor={COLORS.primary}
              />
            </View>
            <View style={{ paddingTop: 15 }}>
              <TextInput
                style={[
                  {
                    height: 48,
                    width: "100%",
                    backgroundColor: COLORS.secondary,
                    padding: MARGIN.horizontal,
                    borderRadius: 5,
                    fontFamily: FONT.SfProRegular,
                  },
                  // focused && {
                  //   borderWidth: 2,
                  //   backgroundColor: COLORS.white,
                  //   borderColor: COLORS.primary,
                  //   fontFamily: FONT.SfProRegular,
                  // },
                ]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                secureTextEntry
                placeholder="Entrer votre mot de passe"
                placeholderTextColor={COLORS.text}
                selectionColor={COLORS.primary}
              />
            </View>
            <View style={{ paddingTop: 15 }}>
              <TextInput
                style={[
                  {
                    height: 48,
                    width: "100%",
                    backgroundColor: COLORS.secondary,
                    padding: MARGIN.horizontal,
                    borderRadius: 5,
                    fontFamily: FONT.SfProRegular,
                  },
                  // focused && {
                  //   borderWidth: 2,
                  //   backgroundColor: COLORS.white,
                  //   borderColor: COLORS.primary,
                  //   fontFamily: FONT.SfProRegular,
                  // },
                ]}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                secureTextEntry
                placeholder="Confirmer votre mot de passe"
                placeholderTextColor={COLORS.text}
                selectionColor={COLORS.primary}
              />
            </View>
          </View>

          {/* pati button an */}
          <TouchableOpacity
            //onPress={ }
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
              S'inscrire
            </Text>
          </TouchableOpacity>
          {/* pati forgotten lan */}

          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text
                style={{ fontFamily: FONT.SfProMedium, color: COLORS.primary }}
              >
                J'ai déjà un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
