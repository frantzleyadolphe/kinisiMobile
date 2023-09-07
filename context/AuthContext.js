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

const showToastModifEmail = () => {
  Toast.show({
    type: "success",
    text1: "Inscription",
    text2: "Modification effectué avec succès!! 👋",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastSignalement = () => {
  Toast.show({
    type: "success",
    text1: "Alert vol de vehicule",
    text2: "Alerte effectuée avec succès!! 👋",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastOtp = () => {
  Toast.show({
    type: "success",
    text1: "OTP",
    text2: "OTP envoyé avec succès sur votre email!! 👋",
    autoHide: true,
    visibilityTime: 4500,
  });
};
const showToastMailNotFound = () => {
  Toast.show({
    type: "error",
    text1: "Email",
    text2: "Aucun compte n'ayant cet email👋",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastErrorNif = () => {
  Toast.show({
    type: "error",
    text1: "Attention!",
    text2: "Ce nif existe déjà !!",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastErrorEmail = () => {
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
const showToastErrServNet = () => {
  Toast.show({
    type: "error",
    text1: "Attention !!",
    text2: "Erreur de connection ou serveur",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastMessageErrorLogin = () => {
  Toast.show({
    type: "error",
    text1: "Attention!",
    text2: "Nif ou password incorrect",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastAccessDenied = () => {
  Toast.show({
    type: "error",
    text1: "Refus",
    text2: "Vous n'êtes pas un propriétaire",
    autoHide: true,
    visibilityTime: 4500,
  });
};

const showToastUserFound = () => {
  Toast.show({
    type: "error",
    text1: "Refus",
    text2: "L'utilisateur existe déjà !!",
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

  // Définition d'une fonction d'inscription
  const register = (values) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/register`, values)
      .then((response) => {
        let userInfo = response.data;
        /*
      Afficher un message pour indiquer que le compte a été créé
      */
        if (userInfo) {
          setIsLoading(false);
          setUserInfo(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          showToast();
        }
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 422) {
            const errors = error.response.data;
            if (
              errors.hasOwnProperty("nif") &&
              errors.hasOwnProperty("email")
            ) {
              setIsLoading(false);
              showToastEmailNif();
            } else if (errors.hasOwnProperty("nif")) {
              setIsLoading(false);
              showToastErrorNif();
            } else if (errors.hasOwnProperty("email")) {
              setIsLoading(false);
              showToastErrorEmail();
            }
          } else if (statusCode === 403) {
            setIsLoading(false);
            showToastAccessDenied();
          } else if (statusCode === 302) {
            setIsLoading(false);
            showToastUserFound();
          }
        } else {
          setIsLoading(false);
          showToastErr();
        }
      });
  };

  const emailModify = async (idUser, new_email) => {
    setIsLoading(true);
    axios
      .put(`${BASE_URL}/api/user/${idUser}/change-email`, new_email)
      .then((response) => {
        let userInfo = response.data;
        /*
      Afficher un message pour indiquer que la mise a jour a été faite
      */
        if (userInfo) {
          setIsLoading(false);
          showToastModifEmail();
          //setVisibleModal(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401) {
            setIsLoading(false);
            //setVisibleModal(false);
            showToastErr();
            console.log(error.response.data);
          }
        }
      });
  };

  const signalement = async (values) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/user/signalement`, values)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          showToastSignalement();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        showToastErr();
        console.log(error);
      });
  };

  // Définition d'une fonction de connexion
  const login = (values) => {
    // Mettre isLoading à true pour indiquer qu'une opération est en cours
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/login`, values)
      .then((response) => {
        let userInfo = response.data;
        setIsLoading(false);
        setUserInfo(userInfo);
        let values = JSON.stringify(userInfo);
        AsyncStorage.setItem("userInfo", values);
      })
      .catch((error) => {
        const errorParsed = error.response.data;
        //console.log(error);
        if (errorParsed?.message) {
          setIsLoading(false);
          showToastMessageErrorLogin();
        } else {
          setIsLoading(false);
          showToastErrServNet();
        }
      });
  };

  const sendOtpByEmail = async (values) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/user/generate-otp`, values)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          showToastOtp();
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

  // Définition d'une fonction de déconnexion
  const logout = async () => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/logout`, null, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then((response) => {
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((error) => {
        // En cas d'erreur...
        setIsLoading(false);
        showToastErr();
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
        emailModify,
        logout,
        signalement,
        sendOtpByEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
