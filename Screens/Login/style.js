import { StyleSheet } from "react-native";
import { FONT, MARGIN, COLORS } from "../../constants";

const LoginStyle = {
  image: {
    width: 250,
    height: 250,
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
  eyeBtn:{
    position:'absolute',
    right:15,
    top:20,
  },
  passwordInput: {
    height: 48,
    width: "100%",
    backgroundColor: COLORS.secondary,
    padding: MARGIN.horizontal,
    borderRadius: 10,
    fontFamily: FONT.SfProRegular,
  },
};

export default LoginStyle;
