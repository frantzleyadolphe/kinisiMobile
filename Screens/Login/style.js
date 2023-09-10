
import { FONT, MARGIN, COLORS } from "../../constants";

const LoginStyle = {
  safeAreaViewStyle: { flex: 1, backgroundColor: COLORS.white },
  styleView: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: MARGIN.horizontal,
    marginLeft: MARGIN.horizontal,
  },
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
  eyeBtn: {
    position: "absolute",
    right: 15,
    top:25,
  },
  textTitle: {
    fontFamily: FONT.Black,
    fontSize: 20,
    color: COLORS.primary,
  },
  textSubtitle: {
    paddingTop: 5,
    fontFamily: FONT.SfProMedium,
    fontSize: 12,
    color: COLORS.text,
    textAlign: "center",
  },
  timerView:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  hrs: {
    paddingTop: 5,
    fontFamily: FONT.PoppinsBold,
    fontSize: 15,
    color: COLORS.text,
  },
  hrss: {
    paddingTop: 5,
    fontFamily: FONT.SfProMedium,
    fontSize: 15,
    color: COLORS.text,
  },
  iconColor: { color: COLORS.text },
  forgotPasswordView: {
    alignSelf: "flex-end",
    marginVertical: MARGIN.vertical,
  },
  forgotPasswordViewText: {
    fontFamily: FONT.SfProMedium,
    color: COLORS.primary,
  },
  viewNew: { alignSelf: "center", marginVertical: MARGIN.vertical },
  viewNewText: {
    fontFamily: FONT.SfProMedium,
    color: COLORS.primary,
  },
  textBtn: { color: COLORS.white, fontFamily: FONT.Black },
  viewAllInput:{ width: "100%", paddingTop: 30 },
};

export default LoginStyle;
