import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../api/apiUrl";

export const AuthContext = createContext();

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

const showToastErr = () => {
  Toast.show({
    type: "error",
    text1: "Attention !!",
    text2: "Une erreur s'est produite",
    autoHide: true,
    visibilityTime: 4500,
  });
};

/*
  pati sa m jere toast lan ak tout configuration
*/

const showToastNif = () => {
  Toast.show({
    type: "error",
    text1: "Attention!",
    text2: "Nif incorrect",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastSucces = () => {
  Toast.show({
    type: "success",
    text1: "Message",
    text2: "Le compte existe vraiment dans la base de données",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastPassword = () => {
  Toast.show({
    type: "error",
    text1: "Attention !!",
    text2: "Mot de passe incorrect",
    autoHide: true,
    visibilityTime: 4500,
  });
};

/*

*/
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splachLoading, setSplachLoading] = useState(false);

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
        let errorParsed = JSON.parse(error.response.config.data);
        if (errorParsed?.nif && errorParsed?.email) {
          setIsLoading(false);
          showToastEmailNif();
          console.log(errorParsed);
        } else if (errorParsed?.nif) {
          setIsLoading(false);
          showToastError();
        } else if (errorParsed?.email) {
          setIsLoading(false);
          showToastEmail();
        }
      });
  };

  const login = (values) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/login`, values)
      .then((response) => {
        let userInfo = response.data;
        /*
        m voy mesaj poum di moun nn ke kont lan cree
        */
          setIsLoading(false);
          setUserInfo(userInfo);
          let values = JSON.stringify(userInfo);
          AsyncStorage.setItem("userInfo", values);
          console.log(userInfo);
          //showToastSucces();
       
      })
      .catch((error) => {
        /*
        m afiche messaj si nif lan ak email lan existe deja
        */
       console.log(error.response.data);
        const errorParsed = error.response.data;

        if (errorParsed?.nif) {
          setIsLoading(false);
          showToastNif();
        } else if (errorParsed?.password) {
          setIsLoading(false);
          showToastPassword();
        }
      });
  };

  const logout = async () => {
    setIsLoading(true);

    axios.post(`${BASE_URL}/api/auth/logout`,null,{
      headers: { Authorization : `Bearer ${userInfo.token}`}
    }).then( response => {
      console.log(response.data);
      AsyncStorage.removeItem('userInfo');
      setUserInfo({});
      setIsLoading(false);
    }).catch( error => {
      setIsLoading(false);
      console.log(error);
    });

  };

  const isLoggedIn = async () => {
    try {
      setSplachLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplachLoading(false);
    } catch (error) {
      setSplachLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        userInfo,
        splachLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
