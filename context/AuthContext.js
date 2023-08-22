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
    text2: "Nif ou password incorrect",
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

// const showToastPassword = () => {
//   Toast.show({
//     type: "error",
//     text1: "Attention !!",
//     text2: "Nif ou password incorrect",
//     autoHide: true,
//     visibilityTime: 4500,
//   });
// };

/*

*/
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splachLoading, setSplachLoading] = useState(false);



 // Définition d'une fonction d'inscription
const register = (values) => {
  // Mettre isLoading à true pour indiquer qu'une opération est en cours
  setIsLoading(true);

  // Effectuer une requête POST à l'URL de base combinée avec le chemin d'inscription "/api/auth/register"
  axios
    .post(`${BASE_URL}/api/auth/register`, values)
    .then((response) => {
      // Une fois la réponse reçue avec succès...
      // Extraire les informations de l'utilisateur de la réponse
      let userInfo = response.data;

      /*
      m voy mesaj poum di moun nn ke kont lan cree
      */

      // Vérifier si des informations utilisateur sont présentes
      if (userInfo) {
        // Mettre isLoading à false pour indiquer que l'opération est terminée
        setIsLoading(false);

        // Mettre à jour les informations de l'utilisateur avec les données reçues
        setUserInfo(userInfo);

        // Stocker les informations de l'utilisateur dans le stockage local sous forme de chaîne JSON
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        // Appeler la fonction showToast() pour afficher un message de succès
        showToast();
      }
    })
    .catch((error) => {
      /*
      m afiche messaj si nif lan ak email lan existe deja
      */

      // Extraire les données d'erreur de la configuration de la requête
      let errorParsed = JSON.parse(error.response.config.data);

      // Vérifier si à la fois "nif" et "email" sont présents dans les données d'erreur
      if (errorParsed?.nif && errorParsed?.email) {
        // Mettre isLoading à false en cas d'erreur
        setIsLoading(false);

        // Appeler la fonction showToastEmailNif() pour afficher un message d'erreur spécifique
        showToastEmailNif();

        // Afficher les détails de l'erreur dans la console
        console.log(errorParsed);
      } else if (errorParsed?.nif) {
        // Mettre isLoading à false en cas d'erreur
        setIsLoading(false);

        // Appeler la fonction showToastError() pour afficher un message d'erreur lié au nif
        showToastError();
      } else if (errorParsed?.email) {
        // Mettre isLoading à false en cas d'erreur
        setIsLoading(false);

        // Appeler la fonction showToastEmail() pour afficher un message d'erreur lié à l'email
        showToastEmail();
      }
    });
};

  // Définition d'une fonction de connexion
const login = (values) => {
  // Mettre isLoading à true pour indiquer qu'une opération est en cours
  setIsLoading(true);

  // Effectuer une requête POST à l'URL de base combinée avec le chemin d'authentification "/api/auth/login"
  axios
    .post(`${BASE_URL}/api/auth/login`, values)
    .then((response) => {
      // Une fois la réponse reçue avec succès...
      // Extraire les informations de l'utilisateur de la réponse
      let userInfo = response.data;

      /*
      m voy mesaj poum di moun nn ke kont lan cree
      */

      // Mettre isLoading à false pour indiquer que l'opération est terminée
      setIsLoading(false);

      // Mettre à jour les informations de l'utilisateur avec les données reçues
      setUserInfo(userInfo);

      // Convertir les informations de l'utilisateur en chaîne JSON
      let values = JSON.stringify(userInfo);

      // Stocker les informations de l'utilisateur dans le stockage local (AsyncStorage)
      AsyncStorage.setItem("userInfo", values);

      // Décommenter la ligne suivante si vous avez une fonction showToastSucces() pour afficher un message de succès
      //showToastSucces();
    })
    .catch((error) => {
      /*
      m afiche messaj si nif lan ak email lan existe deja
      */

      // Extraire les données d'erreur de la réponse d'erreur
      const errorParsed = error.response.data;

      // Vérifier si un message d'erreur est présent dans les données d'erreur
      if (errorParsed?.message) {
        // Mettre isLoading à false en cas d'erreur
        setIsLoading(false);

        // Appeler la fonction showToastNif() pour afficher un message d'erreur
        showToastNif();
      }
    });
};

// Définition d'une fonction de déconnexion appelée "logout"
const logout = async () => {
  // Mettre isLoading à true pour indiquer qu'une opération est en cours
  setIsLoading(true);

  // Effectuer une requête POST à l'URL de base combinée avec le chemin de déconnexion "/api/auth/logout"
  // et inclure le token d'autorisation dans les en-têtes de la requête
  axios.post(`${BASE_URL}/api/auth/logout`, null, {
    headers: { Authorization: `Bearer ${userInfo.token}` }
  }).then(response => {
    // Une fois la réponse reçue avec succès...
    // Supprimer les informations utilisateur du stockage local
    AsyncStorage.removeItem('userInfo');

    // Réinitialiser les informations utilisateur à un objet vide
    setUserInfo({});

    // Mettre isLoading à false pour indiquer que l'opération est terminée
    setIsLoading(false);
  }).catch(error => {
    // En cas d'erreur...
    // Mettre isLoading à false en cas d'erreur
    setIsLoading(false);

    // Appeler la fonction showToastErr() pour afficher un message d'erreur
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
