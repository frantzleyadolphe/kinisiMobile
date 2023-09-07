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
import Ionicons from "@expo/vector-icons/Ionicons";

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
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  return (
    <SafeAreaView style={LoginStyle.safeAreaViewStyle}>
      <Formik
        initialValues={{
          nif: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          login(values);
          resetForm();
        }}
      >
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
            <View style={LoginStyle.styleView}>
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
                <Text style={LoginStyle.textTitle}>CONNEXION</Text>
                <Text style={LoginStyle.textSubtitle}>
                  Remplissez les champs ci-dessous pour vous connecter
                </Text>
              </View>
              {/* pati input la */}
              <View style={LoginStyle.viewAllInput}>
                <View>
                  <TextInput
                    placeholder="Entrer votre nif..."
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    keyboardType="numeric"
                    value={values.nif}
                    onChangeText={handleChange("nif")}
                    onBlur={() => setFieldTouched("nif")}
                    style={LoginStyle.textInput}
                  />
                  {touched.nif && errors.nif && (
                    <Text style={LoginStyle.errorText}>{errors.nif}</Text>
                  )}
                </View>
                <View style={{ paddingTop: 10 }}>
                  <TextInput
                    style={LoginStyle.textInput}
                    secureTextEntry={visiblePassword}
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
                  <TouchableOpacity
                    style={LoginStyle.eyeBtn}
                    onPress={() => {
                      setVisiblePassword(!visiblePassword);
                      setShowPassword(!showPassword);
                    }}
                  >
                    <Ionicons
                      name={
                        showPassword === false
                          ? "eye-outline"
                          : "eye-off-outline"
                      }
                      disabled
                      size={25}
                      color={LoginStyle.iconColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={LoginStyle.forgotPasswordView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                >
                  <Text style={LoginStyle.forgotPasswordViewText}>
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
                <Text style={LoginStyle.textBtn}>Se connecter</Text>
              </TouchableOpacity>
              {/* pati forgotten lan */}

              <View style={LoginStyle.viewNew}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  <Text style={LoginStyle.viewNewText}>
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
