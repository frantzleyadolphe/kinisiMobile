import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/Home";
import Login from "../Screens/Login";
import SignUp from "../Screens/signup";
import ForgotPassword from "../Screens/passwordForgotten";
import RenewAssucance from "../Screens/Home/ScreensHome/RenewAssurance";
import ExperstiseQuery from "../Screens/Home/ScreensHome/ExperstiseQuery";
import { AuthContext } from "../context/AuthContext";
import IndicatorLoading from "../Screens/IndicatorLoading";
import Profil from "../Screens/Home/ScreensHome/Profil";
import AlertVehicule from "../Screens/Home/ScreensHome/AlertVehicule";
import SuivisRequete from "../Screens/Home/ScreensHome/SuivisRequete";
import VerifOtp from "../Screens/passwordForgotten/VerifOtp";
import Success from "../Screens/passwordForgotten/Success";

const Stack = createNativeStackNavigator();

const StackUser = createNativeStackNavigator();

function InsideLayout() {
  <NavigationContainer>
    <StackUser.Navigator>
      <StackUser.Screen name="Home" component={HomeScreen} />
      <StackUser.Screen name="RenewAssurance" component={RenewAssucance} />
      <StackUser.Screen name="ExpertiseQuery" component={ExperstiseQuery} />
      <StackUser.Screen name="AlertVehicle" component={AlertVehicule} />
      <StackUser.Screen name="Profil" component={Profil} />
      <StackUser.Screen name="Suivis" component={SuivisRequete} />
    </StackUser.Navigator>
  </NavigationContainer>;
}

const Navigation = () => {
  const { userInfo, splachLoading } = useContext(AuthContext);
  const token = userInfo.token ? true : false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splachLoading ? (
          <Stack.Screen name="splach" component={IndicatorLoading} />
        ) : token ? (
          <></>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="VerifOtp" component={VerifOtp} />
            <Stack.Screen name="Success" component={Success} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
