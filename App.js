import { View } from "react-native";
import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/Home";
import Login from "./Screens/Login";
import SignUp from "./Screens/signup";
import ForgotPassword from "./Screens/passwordForgotten";
import RenewAssucance from "./Screens/Home/ScreensHome/RenewAssurance";


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  //load all font
  const [fontsLoaded] = useFonts({
    bohuan:require("./assets/fonts/bohuan.ttf"),
    SfProRegular:require("./assets/fonts/SF-Pro.ttf"),
    SfProMedium:require("./assets/fonts/sf-pro-medium.ttf"),
  })

  const onLayoutRootView= useCallback(async ()=>{
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="RenewAssurance" component={RenewAssucance} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
