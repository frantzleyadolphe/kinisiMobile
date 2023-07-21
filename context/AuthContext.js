import React, { createContext, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const BASE_URL = "https://e793-200-113-230-50.ngrok-free.app";

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

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (values) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/api/auth/register`, values)
      .then((response) => {
        let userInfo = response.data;
        /*
        m voy mesaj poum di moun nn ke kont lan cree
        */
        if (userInfo) {
          setIsLoading(false);
          setUserInfo(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          showToast();
        }
      })
      .catch((error) => {
        /*
        m afiche messaj si nif lan ak email lan existe deja
        */
        let errorParsed = JSON.parse(error.response.data);
        if (errorParsed?.nif && errorParsed?.email) {
          setIsLoading(false);
          showToastEmailNif();
        } else if (errorParsed?.nif) {
          setIsLoading(false);
          showToastError();
        } else if (errorParsed?.email) {
          setIsLoading(false);
          showToastEmail();
        }
      });
  };

  return (
    <AuthContext.Provider value={{ isLoading, userInfo, register }}>
      {children}
    </AuthContext.Provider>
  );
};
