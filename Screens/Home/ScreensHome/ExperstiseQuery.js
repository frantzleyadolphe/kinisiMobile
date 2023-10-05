import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Animated,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "./../style";
import Spinner from "react-native-loading-spinner-overlay";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, FONT } from "../../../constants/index";
import { TextInput } from "@react-native-material/core";
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL } from "../../../api/apiUrl";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";


const ExpertiseSchema = Yup.object().shape({
  number: Yup.string()
    .matches(
      /^[A-Za-z]{2}-[0-9]{5}$/,
      "Ce champ ne doit avoir que deux lettres et cinq chiffres avec un (-) tiret apres les deux lettres alphabets"
    )
    .min(8, "il doit avoir exactement 8 caracteres !!")
    .max(8, "il doit avoir exactement 8 caracteres !!")
    .required("Champ obligatoire !!"),
});

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={HomeStyle.modalBackGround}>
        <Animated.View
          style={[
            HomeStyle.modalContainerPayment,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function ExperstiseQuery({ navigation }) {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const {userInfo}=useContext(AuthContext);
  const nifUser=userInfo.user.nif;
  

  /* function sa permet mwen fetch data yo from api an poum voye l sou mobile lan nn pati select lan  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/type-expertise`);
        const newArray = response.data.map((item) => ({
          key: item.montant,
          value: item.type_expertise,
        }));
        setData(newArray);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleValidation = () => {
    if (selected === null || selected === "") {
      // Aucune option sélectionnée, afficher un message d'erreur ou prendre une autre action
      alert(
        "Veuillez sélectionner une option pour préciser le type d'expertise voulu (à domicile ou à l oavct)"
      );
    } else {
      setVisibleModal(true);
    }
  };


  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <Formik
        initialValues={{
          number: "", 
        }}
        validationSchema={ExpertiseSchema}
        onSubmit={() => {
          const typeExpertise=selected;
          setIsLoading(true);
          setVisibleModal(false);
          //const plaque=number.number;
          //console.log(typeExpertise);
          axios.post(`${BASE_URL}/api/user/payment-expertise`,{
            //nif:nifUser,
            //type:typeExpertise,
            //immatriculation:plaque,
            montant:typeExpertise
            
          } ).then((response) => {
            setIsLoading(false);
            navigation.replace("SuccessEx");
          })
          
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
              <Spinner visible={isLoading} color={COLORS.spinner} size={80} />
              <ModalPoup visible={visibleModal}>
                <View style={{ alignItems: "center" }}>
                  <View style={HomeStyle.header}>
                    <TouchableOpacity onPress={() => setVisibleModal(false)}>
                      <Image
                        source={require("../../../assets/x.png")}
                        style={{ height: 30, width: 30 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../../assets/paymentAlert.png")}
                      style={{ height: 100, width: 100, marginVertical: 5 }}
                    />
                    <Text style={HomeStyle.textModalExpertise}>
                      Veuillez sélectionner la methode de paiement (MONCASH) qui vous
                      convient afin de payer votre demande d'expertise
                    </Text>
                    <View style={{ alignSelf: "center" }}>
                      <TouchableOpacity style={HomeStyle.modalBtnPayment} onPress={handleSubmit}>
                        <Image source={require("../../../assets/moncash.png")}
                        style={{ height: 30, width: 30, marginRight: 10 }}
                        />
                        <Text style={HomeStyle.textBtn}>Moncash</Text>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                </View>
              </ModalPoup>
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
                    label="Type d'expertise"
                    searchPlaceholder="Type d'expertise"
                  />
                  {/* {touched.type && errors.type && (
                    <Text style={HomeStyle.errorText}>{errors.type}</Text>
                  )} */}
                </View>
              </View>
              {/* pati button an */}
              <TouchableOpacity
                onPress={handleValidation}
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
