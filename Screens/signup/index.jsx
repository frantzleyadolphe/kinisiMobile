import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT } from "../../constants";
import { ScrollView } from "react-native";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SignUpStyle from "./style";

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
  passwordConfirm: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password")], "Les mot de passe ne correspondent pas !")
    .required("COnfirmation de mot de passe obligatoire !"),
});

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          nif: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={SignupSchema}
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
                    onChangeText={handleChange("passwordConfirm")}
                    onBlur={() => setFieldTouched("passwordConfirm")}
                    autoCapitalize="none"
                  />
                  {touched.passwordConfirm && errors.passwordConfirm && (
                    <Text style={SignUpStyle.errorText}>
                      {errors.passwordConfirm}
                    </Text>
                  )}
                </View>
              </View>

              {/* pati button an */}
              <TouchableOpacity
                onPress={() => {}}
                disabled={!isValid}
                style={[
                  SignUpStyle.btn,
                  { backgroundColor: isValid ? "#D9E5FF" : "#407BFF" },
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
