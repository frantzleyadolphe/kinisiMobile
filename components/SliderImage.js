import { View, Image, FlatList } from "react-native";
import React from "react";
import HomeStyle from "../Screens/Home/style";
import slides from "../components/data";
const SliderImage = () => {
  return (
    <View style={HomeStyle.SectionSlider}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        style={HomeStyle.imageContainer}
        renderItem={({ item }) => (
          <Image source={item.img} style={HomeStyle.imageSlider} />
        )}
      />
    </View>
  );
};

export default SliderImage;
