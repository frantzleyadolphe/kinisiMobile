import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import LoginStyle from "../Login/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, MARGIN, FONT } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import SignUpStyle from "../signup/style";
import { BASE_URL } from "../../api/apiUrl";
import Spinner from "react-native-loading-spinner-overlay";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ExpertiseSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email obligatoire !"),
});

const showToastMailNotFound = () => {
  Toast.show({
    type: "error",
    text1: "Email",
    text2: "Aucun compte n'ayant cet email👋",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastErr = () => {
  Toast.show({
    type: "error",
    text1: "Attention !!",
    text2: "Une erreur s'est produite",
    autoHide: true,
    visibilityTime: 4500,
  });
};

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

const ForgotPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const sendOtpByEmail = async (values) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/user/generate-otp`, values)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          navigation.replace("VerifOtp",{ email: values.email });
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          showToastMailNotFound();
          setIsLoading(false);
        } else {
          setIsLoading(false);
          showToastErr();
        }
      });
  };

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView >
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ExpertiseSchema}
          onSubmit={(values, { resetForm }) => {
            sendOtpByEmail(values);
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
                    source={require("./../../assets/forgotPassword.png")}
                    style={LoginStyle.image}
                  />
                </View>
                <Spinner visible={isLoading} color={COLORS.spinner} size={60} />
                <Toast config={toastConfig} />
                {/* pati text la */}
                <View style={{ alignItems: "center", paddingTop: 10 }}>
                  <Text
                    style={{
                      fontFamily: FONT.Black,
                      fontSize: 20,
                      color: COLORS.primary,
                    }}
                  >
                    MOT DE PASSE OUBLIE
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      fontFamily: FONT.SfProMedium,
                      fontSize: 12,
                      color: COLORS.text,
                      opacity: 0.6,
                      textAlign: "center",
                    }}
                  >
                    Pour reinitialiser votre mot de passe, veuillez entrer votre
                    email et vous recevrez un lien de reinitialisation.
                  </Text>
                </View>
               

                {/* {pati input la } */}
                <View style={{ width: "100%", paddingTop: 20 }}>
                  <View>
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
                  <View
                    style={{
                      alignSelf: "flex-end",
                      marginVertical: MARGIN.vertical,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.replace('Login');
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONT.SfProMedium,
                          color: COLORS.primary,
                          fontSize: 12,
                        }}
                      >
                        Je me souviens du mot de passe
                      </Text>
                    </TouchableOpacity>
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
                    Reinitialiser
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
