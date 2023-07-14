import { View, Text, Image,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { COLORS, MARGIN } from "../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStyle from "./style";
import SliderImage from "../../components/SliderImage";


const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
     <View>
      
     </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
