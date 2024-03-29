import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import HomeStyle from "../style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, FONT, SCREENSIZE } from "../../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import { BASE_URL } from "../../../api/apiUrl";
import axios from "axios";

export default function FAQ({navigation}) {
  const [dataFaq, setDataFaq] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/faq`);
        const newArray = response.data;
        if (newArray) {
          setLoading(false);
          setDataFaq(newArray);
        }
      
      } catch (error) {
        //console.error(error);
        setError(error); // Gérez les erreurs ici
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView >
      <View >
        <Spinner visible={loading} color={COLORS.spinner} size={80} />
        <FlatList
          data={dataFaq}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 5, marginBottom: 15 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FaqDetail", {
                    id: item.id,
                  });
                }}
              >
                <View style={HomeStyle.flatlist2}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row",width: "70%", alignItems: "center",paddingLeft: SCREENSIZE.deviceHeight / 4 - 196, }}
                    >
                      <Ionicons
                        name="help-circle-outline"
                        size={30}
                        style={{ color: COLORS.primary }}
                      />
                      <Text style={HomeStyle.Title_faq}>{item.title}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignContent: "center",
                        paddingRight: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONT.SfProRegular,
                          color: COLORS.gray,
                        }}
                      >
                        09/10/2023
                      </Text>
                    </View>
                  </View>
                  <View style={HomeStyle.view_faq}>
                    <Text numberOfLines={4} style={HomeStyle.Text_faq}>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
