import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "./../style";
import Ionicons from "@expo/vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/AuthContext";
import { COLORS, MARGIN, FONT } from "../../../constants/index";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

const ExpertiseSchema = Yup.object().shape({
  immatriculation: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Ce champ ne doit avoir que des caracères alphanumériques sans les caractères spéciaux(@,#$%^_-!?., etc) !!"
    )
    .min(7, "il doit avoir exactement 7 caractères !!")
    .max(7, "il doit avoir exactement 7 caractères !!")
    .required("Champ obligatoire !!"),
  date_vol: Yup.string().required("Date vol de vehicule obligatoire !!"),
});

export default function AlertVehicule({ navigation }) {
  const { isLoading, login } = useContext(AuthContext);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "DD/MM/YYYY"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

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
                <View style={HomeStyle.btnRr}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={32}
                      style={HomeStyle.ButtonRetour}
                    />
                  </TouchableOpacity>
                </View>
                <View style={HomeStyle.viewTitle}>
                  <Text style={HomeStyle.TextHeader}>Alerte vol </Text>
                </View>
              </View>
              {/* pati corps paj lan */}
              <Spinner visible={isLoading} color={COLORS.spinner} size={60} />
              <View>
                <Text style={HomeStyle.textTitleRenew}>
                  AJOUTEZ LES INFORMATIONS DU VEHICULE VOLÉ
                </Text>
              </View>
              <View style={{ paddingTop: 2 }}>
                <Text style={HomeStyle.subtitleForm}>
                  Veuillez entrer le numéro d'immatriculation, la date exacte du
                  vol et une description du vehicule contenant ces informations
                  là, exemple (couleur du vehicule, nombre de porte,vitre
                  teintée ou pas)
                </Text>
              </View>
              {/* pati input expertise number a */}
              <View style={{ width: "100%", paddingTop: 20 }}>
                <View>
                  <TextInput
                    placeholder="Entrer le numéro d'immatriculation..."
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    value={values.immatriculation}
                    onChangeText={handleChange("immatriculation")}
                    onBlur={() => setFieldTouched("immatriculation")}
                    style={HomeStyle.input}
                  />
                  {touched.immatriculation && errors.immatriculation && (
                    <Text style={HomeStyle.errorText}>
                      {errors.immatriculation}
                    </Text>
                  )}
                </View>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
              >
                <View style={HomeStyle.centeredView}>
                  <View style={HomeStyle.modalView}>
                    <DatePicker
                      mode="calendar"
                      selected={startedDate}
                      onDateChanged={handleChangeStartDate}
                      onSelectedChange={(date) => setSelectedStartDate(date)}
                      options={{
                        backgroundColor: COLORS.primary,
                        textHeaderColor: COLORS.white,
                        textDefaultColor: "#FFFFFF",
                        selectedTextColor:COLORS.Black,
                        mainColor: COLORS.white,
                        textSecondaryColor: "#FFFFFF",
                        borderColor: "rgba(122, 146, 165, 0.1)",
                      }}
                    />

                    <TouchableOpacity onPress={handleOnPressStartDate}>
                      <Text style={{ color: "white" }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View style={{ width: "100%", paddingTop: 20 }}>
                <View>
                  <TextInput
                    placeholder="Entrer la date du vol..."
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    keyboardType="numeric"
                    value={selectedStartDate}
                    onChangeText={handleChange("date_vol")}
                    onBlur={() => setFieldTouched("date_vol")}
                    style={HomeStyle.input}
                  />
                  {touched.date_vol && errors.date_vol && (
                    <Text style={HomeStyle.errorText}>{errors.date_vol}</Text>
                  )}
                  <TouchableOpacity
                    style={HomeStyle.eyeBtn}
                    onPress={() => {
                      handleOnPressStartDate();
                    }}
                  >
                    <Ionicons
                      name="calendar"
                      disabled
                      size={25}
                      color={HomeStyle.iconColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: "100%", paddingTop: 20 }}>
                <View>
                  <TextInput
                    placeholder="Donnez une description du vol..."
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    //keyboardType="numeric"
                    value={values.number}
                    onChangeText={handleChange("number")}
                    onBlur={() => setFieldTouched("number")}
                    style={HomeStyle.inputDesc}
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
