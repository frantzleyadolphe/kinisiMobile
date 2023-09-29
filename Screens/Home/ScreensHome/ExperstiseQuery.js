import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "./../style";
import Ionicons from "@expo/vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/AuthContext";
import { COLORS, MARGIN, FONT } from "../../../constants/index";
import { TextInput } from "@react-native-material/core";

const ExpertiseSchema = Yup.object().shape({
  number: Yup.string()
    .matches(/^[0-9]+$/, "Ce champ ne doit avoir que des chiffes !!")
    .min(10, "il doit avoir exactement 10 chiffres !!")
    .max(10, "il doit avoir exactement 10 chiffres !!")
    .required("Champ obligatoire !!"),
});

export default function ExperstiseQuery({ navigation }) {
  const { isLoading, login } = useContext(AuthContext);
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <Formik
        initialValues={{
          number: "",
        }}
        validationSchema={ExpertiseSchema}
        onSubmit={(values) => {
          login(values);
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
            <View style={HomeStyle.Page}>
              <View style={HomeStyle.Header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back-outline"
                    size={32}
                    style={HomeStyle.ButtonRetour}
                  />
                </TouchableOpacity>
                <Text style={HomeStyle.TextHeader}>Demande d'expertise</Text>
                <TouchableOpacity>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    style={HomeStyle.ButtonRetour}
                  />
                </TouchableOpacity>
              </View>
              {/* pati corps paj lan */}
              <Spinner visible={isLoading} color={COLORS.spinner} size={60} />
              <View>
                <Text style={HomeStyle.textTitleRenew}>
                  FAITES VOTRE DEMANDE D'EXPERTISE
                </Text>
              </View>
              <View style={{ paddingTop: 2 }}>
                <Text style={HomeStyle.subtitleForm}>
                  Veuillez entrer le numéro d'immatriculation de votre voiture
                  et choisissez le type d'expertise afin d'effectuer votre
                  demande d'expertise a l'OAVCT.
                </Text>
              </View>
              {/* pati input expertise number a */}
              <View style={{ width: "100%", paddingTop: 20 }}>
                <View>
                  <TextInput
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    value={values.number}
                    onBlur={() => setFieldTouched("number")}
                    onChangeText={handleChange("number")}
                    label="Entrer votre immatriculation"
                    variant="outlined"
                    inputStyle={{ backgroundColor: COLORS.white }}
                    color={COLORS.primary}
                  />
                  {touched.number && errors.number && (
                    <Text style={HomeStyle.errorText}>{errors.number}</Text>
                  )}
                </View>
                <View style={{  paddingTop: 10 }}>
                  <TextInput
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    value={values.number}
                    onBlur={() => setFieldTouched("number")}
                    onChangeText={handleChange("number")}
                    label="Type d'immatriculation"
                    variant="outlined"
                    inputStyle={{ backgroundColor: COLORS.white }}
                    color={COLORS.primary}
                  />
                  {touched.number && errors.number && (
                    <Text style={HomeStyle.errorText}>{errors.number}</Text>
                  )}
                </View>
              </View>
              {/* pati button an */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isValid}
                style={[
                  HomeStyle.btnForm,
                  { backgroundColor: isValid ? "#407BFF" : "#D9E5FF" },
                ]}
              >
                <Text style={{ color: COLORS.white, fontFamily: FONT.Black }}>
                  Suivant
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
