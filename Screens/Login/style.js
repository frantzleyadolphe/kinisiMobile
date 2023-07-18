import { StyleSheet } from "react-native";
import { FONT, MARGIN, COLORS } from "../../constants";

const LoginStyle = {
  image: {
    width: 300,
    height: 300,
  },

  view: {
    alignItems: "center",
  },
  color: {
    backgroundColor: "white",
  },
  text: {
    fontFamily: FONT.Black,
    fontSize: 20,
    color: COLORS.primary,
  },
  subtitle: {
    paddingTop: 5,
    fontFamily: FONT.SfProMedium,
    fontSize: 12,

    color: COLORS.text,
  },
  errorText: {
    color: "red",
    fontFamily: FONT.SfProMedium,
    paddingTop: 2,
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginVertical: MARGIN.vertical,
    width: 276,
    height: 51,
    padding: MARGIN.vertical,
    alignItems: "center",
  },
};

export default LoginStyle;
