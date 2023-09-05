import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import HomeStyle from "../style";
import { FONT } from "../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

export default function SuivisRequete({ navigation }) {
  return (
    <SafeAreaView style={HomeStyle.colorPage}>
      <View style={HomeStyle.Header}>
        <View style={HomeStyle.btnLr}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
        <View style={HomeStyle.viewTitle}>
          <Text style={HomeStyle.TextHeader}>Suivie Requêtes </Text>
        </View>
        <View style={HomeStyle.btnRr}>
          <TouchableOpacity>
            <Ionicons
              name="create-outline"
              size={32}
              style={HomeStyle.ButtonRetour}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* pati Flatlist lan */}
      <View>
        <FlatList
          data={data}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 5, marginBottom: 15 }}
          renderItem={() => {
            return (
              <TouchableOpacity>
                <View style={HomeStyle.flatlist}>
                  <View>
                    <Image
                      source={require("../../../assets/alertVol.png")}
                      style={HomeStyle.imageAlert}
                    />
                  </View>
                  <View style={HomeStyle.viewContent}>
                    <Text style={HomeStyle.textAlert}>
                      Alerte vol de véhicule
                    </Text>
                    <View style={HomeStyle.cardColum}>
                      <View style={HomeStyle.viewCard}>
                        <Ionicons name="car" size={20} />
                        <Text style={HomeStyle.textAlertDesc}>| AA20167</Text>
                      </View>
                      <View style={HomeStyle.viewCard2}>
                        <Ionicons name="shield-checkmark" size={20} color="white" />
                        <Text style={HomeStyle.textStatus}>| en cours </Text>
                      </View>
                      
                    </View>
                    <Text style={HomeStyle.textAlertDesc}>
                      Alerte sur cette plaque #AA20167
                    </Text>
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
