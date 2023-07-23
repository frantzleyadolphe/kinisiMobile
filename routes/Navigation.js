import { View, Text } from "react-native";
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

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { userInfo, splachLoading } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splachLoading ? (
          <Stack.Screen name="splach" component={IndicatorLoading} />
        ) : userInfo.authorization.token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RenewAssurance" component={RenewAssucance} />
            <Stack.Screen name="ExpertiseQuery" component={ExperstiseQuery} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
