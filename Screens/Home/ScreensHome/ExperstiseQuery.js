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
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL } from "../../../api/apiUrl";
import axios from "axios";

const ExpertiseSchema = Yup.object().shape({
  number: Yup.string()
    .matches(/^[0-9]+$/, "Ce champ ne doit avoir que des chiffes !!")
    .min(10, "il doit avoir exactement 10 chiffres !!")
    .max(10, "il doit avoir exactement 10 chiffres !!")
    .required("Champ obligatoire !!"),
  type: Yup.string()
    .required("Champ obligatoire !!"),
});

export default function ExperstiseQuery({ navigation }) {
  const [selected, setSelected] = useState("");
  const [data,setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(async() => 
    //Get Values from database
    await axios.get(`${BASE_URL}/api/user/type-expertise`)
      .then((response) => {
        // Store Values in Temporary Array
        let newArray = response.data.map((item) => {
          return {key: item.montant, value: item.type_expertise}
        })
        setIsLoading(false);
        //Set Data Variable
        setData(newArray)
      })
      .catch((e) => {
        console.log(e)
      })
  ,[])

  const { login } = useContext(AuthContext);
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <Formik
        initialValues={{
          number: "",
          type:""
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
                <View style={{ paddingTop: 10 }}>
                  <SelectList
                    setSelected={setSelected}
                    data={data}
                    save="value"
                    label="Type d'expertise"
                    searchPlaceholder="Type d'expertise"
                  />
                  {touched.type && errors.type && (
                    <Text style={HomeStyle.errorText}>{errors.type}</Text>
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
