import { useCallback, useEffect, useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Navigation from "./routes/Navigation";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();



export default function App() {
  //const {userInfo}=useContext(AuthContext);
  //load all font
  const [fontsLoaded] = useFonts({
    bohuan: require("./assets/fonts/bohuan.ttf"),
    SfProRegular: require("./assets/fonts/SF-Pro.ttf"),
    SfProMedium: require("./assets/fonts/sf-pro-medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
