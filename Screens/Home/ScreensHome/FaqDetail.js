import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";
import { BASE_URL } from "../../../api/apiUrl";
import axios from "axios";
import { COLORS, FONT, MARGIN } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStyle from "../style";
import { ScrollView } from "react-native-gesture-handler";

export default function FaqDetail({ route }) {
  const { id } = route.params;
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Effectuez une requête HTTP GET pour récupérer les détails de la FAQ en utilisant l'ID
    axios
      .get(`${BASE_URL}/api/user/faq/${id}`)
      .then((response) => {
        setLoading(false);
        setFaq(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, [id]);

  return (
    <SafeAreaView style={HomeStyle.FaqDetail}>
      <Spinner visible={loading} color={COLORS.spinner} size={50} />
      <View
        style={{
          paddingTop: 10,
          flexDirection: "row",
          paddingRight: MARGIN.horizontal,
          alignItems: "center",
          alignContent: "center",
          paddingBottom: 5,
        }}
      >
        <Ionicons
          name="help-circle-outline"
          size={50}
          style={{ color: COLORS.primary }}
        />
        <Text style={{ fontSize: 15, fontFamily: FONT.Black }}>
          {faq.title}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Text style={{ paddingTop: 10, fontFamily: FONT.SfProMedium, textAlign: "justify" }}>
          {faq.description}
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
