import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT } from "../../constants";
import { Formik } from "formik";
import * as Yup from "yup";
import SignUpStyle from "./style";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "@expo/vector-icons/Ionicons";

/*
    pati sa m jere validation formulaire lan 
  */
const SignupSchema = Yup.object().shape({
  nif: Yup.string()
    .min(10, "il doit avoir exactement 10 chiffres !!")
    .max(10, "il doit avoir exactement 10 chiffres !!")
    .matches(/^[0-9]+$/, "Ce champ ne doit avoir que des chiffes !!")
    .required("Champ obligatoire !!"),
  email: Yup.string().email("Email invalide").required("Email obligatoire !"),
  password: Yup.string()
    .min(8)
    .required("Mot de passe obligatoire !!")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Le mot de passe doit avoir 8 caractères et au moins une lettre majuscule des symboles "
    ),
  password_confirmation: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password")], "Les mot de passe ne correspondent pas !")
    .required("COnfirmation de mot de passe obligatoire !"),
});

/*
    nan pati sa mwen modifye toast lan pou m k fel nn janm bezwen l lan 
  */
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

/*
    fonction registration
*/

const SignUp = ({ navigation }) => {
  const { isLoading, register } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  // const { isSecureEntry, setIsSecureEntry } = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding:" : "height"}
        style={{ flex: 1 }}
      >
        <Formik
          initialValues={{
            nif: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            register(values);
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
              <View style={SignUpStyle.pageColor}>
                <Image
                  source={require("./../../assets/signup.png")}
                  style={{ width: 300, height: 200 }}
                />
                <Spinner visible={isLoading} color={COLORS.spinner} size={60} />
                <Toast config={toastConfig} />
                {/* pati text la */}
                <View style={{ alignItems: "center", paddingTop: 10 }}>
                  <Text style={SignUpStyle.titre}>INSCRIPTION</Text>
                  <Text style={SignUpStyle.sousTitre}>
                    {" "}
                    Remplissez les champs ci-dessous pour créer un compte
                  </Text>
                </View>

                {/* pati formulaire la */}
                <View style={{ width: "100%", paddingTop: 15 }}>
                  <View>
                    <TextInput
                      placeholder="Entrer votre nif... Ex: 0030548791"
                      placeholderTextColor={COLORS.text}
                      selectionColor={COLORS.primary}
                      style={SignUpStyle.input}
                      keyboardType="numeric"
                      value={values.nif}
                      onChangeText={handleChange("nif")}
                      onBlur={() => setFieldTouched("nif")}
                    />
                    {touched.nif && errors.nif && (
                      <Text style={SignUpStyle.errorText}>{errors.nif}</Text>
                    )}
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <TextInput
                      style={SignUpStyle.input}
                      placeholder="Entrer votre email"
                      placeholderTextColor={COLORS.text}
                      selectionColor={COLORS.primary}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                      autoCapitalize="none"
                    />
                    {touched.email && errors.email && (
                      <Text style={SignUpStyle.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <TextInput
                      style={SignUpStyle.input}
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
                      <Text style={SignUpStyle.errorText}>
                        {errors.password}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={SignUpStyle.eyeBtn}
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
                        color={SignUpStyle.iconColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <TextInput
                      style={SignUpStyle.input}
                      secureTextEntry={visiblePassword}
                      placeholder="Confirmer votre mot de passe"
                      placeholderTextColor={COLORS.text}
                      selectionColor={COLORS.primary}
                      value={values.password_confirmation}
                      onChangeText={handleChange("password_confirmation")}
                      onBlur={() => setFieldTouched("password_confirmation")}
                      autoCapitalize="none"
                    />
                    {touched.password_confirmation &&
                      errors.password_confirmation && (
                        <Text style={SignUpStyle.errorText}>
                          {errors.password_confirmation}
                        </Text>
                      )}
                  </View>
                </View>

                {/* pati button an */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={[
                    SignUpStyle.btn,
                    { backgroundColor: isValid ? "#407BFF" : "#D9E5FF" },
                  ]}
                >
                  <Text style={{ color: COLORS.white, fontFamily: FONT.Black }}>
                    S'inscrire
                  </Text>
                </TouchableOpacity>
                {/* pati retour siw gn kont lan */}
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Text style={SignUpStyle.cpt}>J'ai déjà un compte</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
