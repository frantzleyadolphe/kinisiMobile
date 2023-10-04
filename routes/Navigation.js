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
import { TouchableOpacity } from "react-native-gesture-handler";
import SuccessEx from "../Screens/Home/ScreensHome/SuccessEx";
import FAQ from "../Screens/Home/ScreensHome/FAQ";

const Stack = createNativeStackNavigator();

const StackUser = createNativeStackNavigator();

const StackOut = createNativeStackNavigator();

function InsideLayout() {
  return (
    <StackUser.Navigator>
      <StackUser.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, statusBarColor: COLORS.primary }}
      />
      <StackUser.Screen
        name="RenewAssurance"
        component={RenewAssucance}
        options={{
          title: "Renouvellement",
          statusBarColor: COLORS.primary,
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
          headerBackTitle: false,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: COLORS.primary,

            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
          headerShadowVisible: false,
        }}
      />
      <StackUser.Screen
        name="ExpertiseQuery"
        component={ExperstiseQuery}
        options={{
          title: "Demande expertise",
          statusBarColor: COLORS.primary,
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
          headerBackTitle: false,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        }}
      />
      <StackUser.Screen
        name="AlertVehicle"
        component={AlertVehicule}
        options={{
          title: "Alerte vol de vehicule",
          statusBarColor: COLORS.primary,
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
          headerBackTitle: false,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        }}
      />
      <StackUser.Screen
        name="Profil"
        component={Profil}
        options={{
          title: "Profil",
          statusBarColor: COLORS.primary,
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
          headerBackTitle: false,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        }}
      />
      <StackUser.Screen name="Suivis" component={SuivisRequete} />
      <StackUser.Screen
        name="SuccessEx"
        component={SuccessEx}
        options={{ headerShown: false }}
      />
      <StackUser.Screen
        name="Faq"
        component={FAQ}
        options={{
          title: "FAQ",
          statusBarColor: COLORS.primary,
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
          headerBackTitle: false,
          headerLargeTitle: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        }}
      />
    </StackUser.Navigator>
  );
}

function OutsideLayout() {
  return (
    <StackOut.Navigator>
      <StackOut.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
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
  //console.log(token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splachLoading ? (
          <Stack.Screen
            name="splach"
            component={IndicatorLoading}
            options={{ headerShown: false }}
          />
        ) : token ? (
          <>
            <Stack.Screen
              name="Inside"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Outside"
              component={OutsideLayout}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
