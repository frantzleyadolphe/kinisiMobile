import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "./../style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/AuthContext";
import { COLORS, MARGIN, FONT } from "../../../constants/index";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
        fontFamily:FONT.Black
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

const ExpertiseSchema = Yup.object().shape({
  plate_number: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Ce champ ne doit avoir que des caracères alphanumériques sans les caractères spéciaux(@,#$%^_-!?., etc) !!"
    )
    .min(7, "Numéro de plaque invalide")
    .max(7, "Numéro de plaque invalide")
    .required("Champ obligatoire !!"),
  stolen_date: Yup.string().required("Champs obligatoire !!"),
  description: Yup.string().required("Champs obligatoire !!"),
});

export default function AlertVehicule({ navigation }) {
  const { signalement } = useContext(AuthContext);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "DD-MM-YYYY"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12-12-2023");
  const { userInfo } = useContext(AuthContext);
  const idUser = userInfo.user.id;

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
          plate_number: "",
          user_id: idUser,
          stolen_date:"",
          description: "",
        }}
        validationSchema={ExpertiseSchema}
        onSubmit={(values) => {
          signalement(values);
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
              <Toast config={toastConfig} />
              {/* pati input expertise number a */}
              <View style={{ width: "100%", paddingTop: 20 }}>
                <View>
                  <TextInput
                    placeholder="Entrer le numéro d'immatriculation..."
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    value={values.plate_number}
                    onChangeText={handleChange("plate_number")}
                    onBlur={() => setFieldTouched("plate_number")}
                    style={HomeStyle.input}
                  />
                  {touched.plate_number && errors.plate_number && (
                    <Text style={HomeStyle.errorText}>
                      {errors.plate_number}
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
                        defaultFont:FONT.Black,
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
                    value={selectedStartDate}
                    onChangeText={handleChange("stolen_date")}
                    onBlur={() => setFieldTouched("stolen_date")}
                    style={HomeStyle.input}
                  />
                  {touched.stolen_date && errors.stolen_date && (
                    <Text style={HomeStyle.errorText}>{errors.stolen_date}</Text>
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
                    value={values.description}
                    onChangeText={handleChange("description")}
                    onBlur={() => setFieldTouched("description")}
                    style={HomeStyle.inputDesc}
                  />
                  {touched.description && errors.description && (
                    <Text style={HomeStyle.errorText}>{errors.description}</Text>
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
