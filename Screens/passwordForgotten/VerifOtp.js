import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginStyle from "../Login/style";
import SignUpStyle from "../signup/style";
import { TextInput } from "@react-native-material/core";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS, FONT } from "../../constants";
import { BASE_URL } from "../../api/apiUrl";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      <View style={SignUpStyle.modalBackGround}>
        <Animated.View
          style={[
            SignUpStyle.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
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

const showToastOtpSent = () => {
  Toast.show({
    type: "success",
    text1: "OTP Sent !!",
    text2: "Nouveau code OTP envoyé !!",
    autoHide: true,
    visibilityTime: 3500,
  });
};

const showToastOtpVerified = () => {
  Toast.show({
    type: "success",
    text1: "OTP Verified",
    text2: "Code otp validé !!",
    autoHide: true,
    visibilityTime: 3500,
  });
};

showToastResendOTPError = () => {
  Toast.show({
    type: "error",
    text1: "WARNING",
    text2: "Erreur d envoie du code OTP!!",
    autoHide: true,
    visibilityTime: 3500,
  });
};

const LoginSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]+$/, "Ce champ ne doit avoir que des chiffes !!")
    .min(6, "il doit avoir exactement 6 chiffres !!")
    .max(6, "il doit avoir exactement 6 chiffres !!")
    .required("Champ obligatoire !!"),
});

export default function VerifOtp({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const route = useRoute();
  const emailUser = route.params.email;

  //function resend otp with email was sent previous otp code
  const resendOTP = (emailUser) => {
    setIsLoading(true);
    axios
      .put(`${BASE_URL}/api/user/resend-otp`, {
        email: emailUser,
      }) // Assuming your API expects an email in the request body
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          showToastOtpSent();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        showToastResendOTPError();
        //console.log(emailUser);
      });
  };

  const confirmOTP = (values) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/user/verify-otp`, {
        otp_code: values.otp,
      }) // Assuming your API expects an email in the request body
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          setModalVisible(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        showToastResendOTPError();
      });
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <SafeAreaView style={LoginStyle.safeAreaViewStyle}>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          confirmOTP(values);
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
          <KeyboardAwareScrollView>
            <ScrollView>
              <View style={LoginStyle.styleView}>
                <View>
                  <Image
                    source={require("../../assets/otp.jpeg")}
                    style={LoginStyle.image}
                  />
                </View>
                <Spinner visible={isLoading} color={COLORS.spinner} size={60} />
                <Toast config={toastConfig} />
                {/* pati modal la*/}
                <ModalPoup visible={modalVisible}>
                  <View style={{ alignItems: "center" }}></View>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../../assets/editMail.png")}
                      style={{ height: 150, width: 150, marginVertical: 5 }}
                    />
                  </View>
                  <Text style={SignUpStyle.textModal}>
                    Code OTP envoyé sur votre email
                  </Text>
                  <View style={{ alignSelf: "center" }}>
                    <TouchableOpacity style={[SignUpStyle.modalBtn]} onPress={() => setModalVisible(false)}>
                      <Text style={SignUpStyle.textBtn}>Entrer code OTP</Text>
                    </TouchableOpacity>
                  </View>
                </ModalPoup>
                {/* pati text la */}
                <View style={{ alignItems: "center", paddingTop: 30 }}>
                  <Text style={LoginStyle.textTitle}>OTP VERIFICATION</Text>
                  <Text style={LoginStyle.textSubtitle}>
                    Veuillez entrer le code otp qui a été envoyé sur cet email :
                    <Text style={{ fontFamily: FONT.PoppinsBold }}>
                      {emailUser}
                    </Text>
                  </Text>
                  <View style={LoginStyle.timerView}>
                    <Text style={LoginStyle.hrss}>
                      Vous n'avez pas reçu de code |
                    </Text>
                    <TouchableOpacity
                      disabled={counter >= 1 && counter <= 60}
                      onPress={() => resendOTP(emailUser)}
                    >
                      <Text
                        style={[
                          LoginStyle.hrss,
                          {
                            color:
                              counter >= 1 && counter <= 60
                                ? "#D9E5FF"
                                : "#407BFF",
                          },
                        ]}
                      >
                        Renvoyer
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={LoginStyle.hrs}>dans {counter} secondes </Text>
                </View>
                {/* pati input la */}
                <View style={LoginStyle.viewAllInput}>
                  <View style={{ paddingTop: 10 }}>
                    <TextInput
                      placeholderTextColor={COLORS.text}
                      selectionColor={COLORS.primary}
                      value={values.otp}
                      keyboardType="numeric"
                      onChangeText={handleChange("otp")}
                      onBlur={() => setFieldTouched("otp")}
                      label="Entrer le code OTP"
                      variant="outlined"
                      inputStyle={{ backgroundColor: COLORS.white }}
                      color={COLORS.primary}
                    />
                    {touched.otp && errors.otp && (
                      <Text style={LoginStyle.errorText}>{errors.otp}</Text>
                    )}
                  </View>
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
                  <Text style={LoginStyle.textBtn}>Confirm OTP</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}
