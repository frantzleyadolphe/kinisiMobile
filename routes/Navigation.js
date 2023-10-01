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
import { COLORS } from "../constants";

const Stack = createNativeStackNavigator();

const StackUser = createNativeStackNavigator();

const StackOut = createNativeStackNavigator();

function InsideLayout() {
  return (
    <StackUser.Navigator>
      <StackUser.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <StackUser.Screen name="RenewAssurance" component={RenewAssucance} options={{ title: "Renouvellement assurance", statusBarColor: COLORS.primary,headerTitleAlign: 'center',headerTintColor: '#ffffff',headerStyle: {backgroundColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          },}}/>
      <StackUser.Screen name="ExpertiseQuery" component={ExperstiseQuery} />
      <StackUser.Screen name="AlertVehicle" component={AlertVehicule} />
      <StackUser.Screen name="Profil" component={Profil} />
      <StackUser.Screen name="Suivis" component={SuivisRequete} />
    </StackUser.Navigator>
  );
}

function OutsideLayout() {
  return (
    <StackOut.Navigator>
      <StackOut.Screen name="Login" component={Login} />
      <StackOut.Screen name="SignUp" component={SignUp} />
      <StackOut.Screen name="ForgotPassword" component={ForgotPassword} />
      <StackOut.Screen name="VerifOtp" component={VerifOtp} />
      <StackOut.Screen name="Success" component={Success} />
    </StackOut.Navigator>
  );
}

const Navigation = () => {
  const { userInfo, splachLoading } = useContext(AuthContext);
  const token = userInfo.token ? true : false;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splachLoading ? (
          <Stack.Screen name="splach" component={IndicatorLoading} />
        ) : token ? (
          <Stack.Screen name="Inside@" component={InsideLayout} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name="Outside" component={OutsideLayout} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
