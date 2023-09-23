import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  TextInput,
} from "react-native";
import React, { useContext, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeStyle from "../style";
import { AuthContext } from "../../../context/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, FONT } from "../../../constants";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const ModifySchema = Yup.object().shape({
  new_email: Yup.string()
    .email("Email invalide")
    .required("Email obligatoire !"),
});

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
            HomeStyle.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Profil = ({ navigation }) => {
  const { emailModify, logout } = useContext(AuthContext);
  const [visibleModal, setVisibleModal] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const idUser = userInfo.user.id;
  const emailUser = userInfo.user.email;

  return (
    <SafeAreaView style={HomeStyle.colorPage}>
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
            <Text style={HomeStyle.TextHeader}>Profil</Text>
          </View>
        </View>
        <View style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Image
            style={HomeStyle.avatarProfil}
            source={require("../../../assets/avatar.png")}
          />
        </View>
        <Toast config={toastConfig} />
        <View>
          <Text style={{ fontFamily: FONT.Black }}>{emailUser}</Text>
        </View>
        <View style={HomeStyle.viewProfil}>
          {/* modal popup */}
          <Formik
            initialValues={{
              new_email: "",
            }}
            validationSchema={ModifySchema}
            onSubmit={(new_email) => {
              emailModify(idUser, new_email);
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
                </View>
                {/* <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/editMail.png")}
                    style={{ height: 150, width: 150, marginVertical: 5 }}
                  />
                </View> */}

                <Text style={HomeStyle.textModal}>
                  Modifier votre adresse mail
                </Text>
                <View style={{ paddingTop: 10 }}>
                  <TextInput
                    style={HomeStyle.textInput}
                    placeholder="Entrer votre nouveau email"
                    placeholderTextColor={COLORS.text}
                    selectionColor={COLORS.primary}
                    value={values.new_email}
                    onChangeText={handleChange("new_email")}
                    onBlur={() => setFieldTouched("new_email")}
                    autoCapitalize="none"
                  />
                  {touched.new_email && errors.new_email && (
                    <Text style={HomeStyle.errorText}>{errors.new_email}</Text>
                  )}
                </View>
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!isValid}
                    style={[
                      HomeStyle.modalBtn,
                      { backgroundColor: isValid ? "#407BFF" : "#D9E5FF" },
                    ]}
                  >
                    <Text style={HomeStyle.textBtn}>Modifier</Text>
                  </TouchableOpacity>
                </View>
              </ModalPoup>
            )}
          </Formik>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity
              style={HomeStyle.row}
              onPress={() => setVisibleModal(true)}
            >
              <Ionicons
                name="mail-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Changer mon addresse mail</Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity
              style={HomeStyle.row}
              onPress={() => setVisibleModal(true)}
            >
              <Ionicons
                name="lock-closed-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Changer mon mot de passe</Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="notifications-circle-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Mes notifications</Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyle.profilView}>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="settings-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Paramètres</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={HomeStyle.row}>
              <Ionicons
                name="language-outline"
                size={38}
                style={HomeStyle.iconProfil}
              />
              <Text style={HomeStyle.text}>Langues</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "60%", paddingTop: 20 }}>
          <TouchableOpacity onPress={logout} style={HomeStyle.btnDecon}>
            <Ionicons
              name="log-out-outline"
              size={38}
              style={HomeStyle.iconProfil}
            />
            <Text style={HomeStyle.text}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profil;
