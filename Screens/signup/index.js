import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT } from "../../constants";
import { Formik } from "formik";
import * as Yup from "yup";
import SignUpStyle from "./style";
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Redirect } from "expo-router";

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
      "Le mot de passe doit avoir 8 caractères et des symboles"
    ),
  password_confirmation: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password")], "Les mot de passe ne correspondent pas !")
    .required("COnfirmation de mot de passe obligatoire !"),
});
/*
   pati sa pemet mwen di men ki mesaj m vle jwen de plugin toast lan 
  */

const showToast = () => {
  Toast.show({
    type: "success",
    text1: "Inscription",
    text2: "Votre compte créé avec succès !! 👋",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastError = () => {
  Toast.show({
    type: "error",
    text1: "Attention!",
    text2: "Ce nif existe déjà !!",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastEmail = () => {
  Toast.show({
    type: "error",
    text1: "Attention !!",
    text2: "Cette adresse email existe déjà !!",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastEmailNif = () => {
  Toast.show({
    type: "error",
    text1: "Attention !!",
    text2: "Ce nif et l'email existe déjà !!",
    autoHide: true,
    visibilityTime: 4500,
  });
};


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
      style={{ borderLeftColor: "red", }}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          nif: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          axios
            .post(
              `https://2b05-200-113-251-74.ngrok-free.app/api/auth/register`,
              values
            )
            .then((response) => {
              let userInfo = response.data.user;
              /*
              m afiche messaj si nif lan ak email lan existe deja
              */
              if (userInfo) {
                showToast();
              }
            })
            .catch((error) => {
              /*
              m afiche messaj si nif lan ak email lan existe deja
              */
              let errorParsed = JSON.parse(error.response.data);
              if (errorParsed?.nif && errorParsed?.email) {
                showToastEmailNif();
              } else if (errorParsed?.nif) {
                showToastError();
              } else if (errorParsed?.email) {
                showToastEmail();
              }
            });
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
                style={{ width: 300, height: 300 }}
              />
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
                    <Text style={SignUpStyle.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View style={{ paddingTop: 10 }}>
                  <TextInput
                    style={SignUpStyle.input}
                    secureTextEntry
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
    </SafeAreaView>
  );
};

export default SignUp;
