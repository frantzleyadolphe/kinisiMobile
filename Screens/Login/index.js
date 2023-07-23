import { View, Text, Image, Alert, Button } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginStyle from "./style";
import { COLORS, MARGIN, FONT } from "../../constants";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

{
  /* pati sa pemet mwen verifier chak champ nn formulaire a */
}

const LoginSchema = Yup.object().shape({
  nif: Yup.string()
    .matches(/^[0-9]+$/, "Ce champ ne doit avoir que des chiffes !!")
    .min(10, "il doit avoir exactement 10 chiffres !!")
    .max(10, "il doit avoir exactement 10 chiffres !!")
    .required("Champ obligatoire !!"),
  password: Yup.string()
    .min(8)
    .required("Mot de passe obligatoire !!")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Le mot de passe doit avoir 8 caractères et des symboles et sans lettres capitales"
    ),
});

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "200",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};

/* debut code */

const Login = ({ navigation }) => {
  const { isLoading, login } = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          nif: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {login(values);}}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          setFieldTouched,
          handleSubmit,
        }) => (
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
              <Spinner visible={isLoading} color={COLORS.spinner} size={60} />
              <Toast config={toastConfig} />
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
                    placeholder="Entrer votre nif..."
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    keyboardType="numeric"
                    value={values.nif}
                    onChangeText={handleChange("nif")}
                    onBlur={() => setFieldTouched("nif")}
                    style={[
                      {
                        height: 48,
                        width: "100%",
                        backgroundColor: COLORS.secondary,
                        padding: MARGIN.horizontal,
                        borderRadius: 10,
                        fontFamily: FONT.SfProRegular,
                      },
                    ]}
                  />
                  {touched.nif && errors.nif && (
                    <Text style={LoginStyle.errorText}>{errors.nif}</Text>
                  )}
                </View>
                <View style={{ paddingTop: 10 }}>
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
                    ]}
                    secureTextEntry
                    placeholder="Entrer votre mot de passe"
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={() => setFieldTouched("password")}
                    autoCapitalize="none"
                  />
                  {touched.password && errors.password && (
                    <Text style={LoginStyle.errorText}>{errors.password}</Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  marginVertical: MARGIN.vertical,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.SfProMedium,
                      color: COLORS.primary,
                    }}
                  >
                    Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </View>
              {/* pati button an */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[
                  LoginStyle.btn,
                  { backgroundColor: isValid ? "#407BFF" : "#D9E5FF" },
                ]}
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
                    style={{
                      fontFamily: FONT.SfProMedium,
                      color: COLORS.primary,
                    }}
                  >
                    Nouveau sur KINISI ? Créer un compte
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
