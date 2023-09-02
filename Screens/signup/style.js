import { FONT, MARGIN, COLORS } from "../../constants";

const SignUpStyle = {
  pageColor: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: MARGIN.horizontal,
    marginLeft: MARGIN.horizontal,
  },
  titre: {
    fontFamily: FONT.Black,
    fontSize: 20,
    color: COLORS.primary,
  },
  sousTitre: {
    paddingTop: 5,
    fontFamily: FONT.SfProMedium,
    fontSize: 12,
    color: COLORS.text,
  },
  cpt: { fontFamily: FONT.SfProMedium, color: COLORS.primary },
  input: {
    height: 48,
    width: "100%",
    backgroundColor: COLORS.secondary,
    padding: MARGIN.horizontal,
    borderRadius: 5,
    fontFamily: FONT.SfProRegular,
  },
  btn:{
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginVertical: MARGIN.vertical,
    width: 276,
    height: 51,
    padding: MARGIN.vertical,
    alignItems: "center",
  },
  errorText:{
    color: 'red',
    fontFamily: FONT.SfProMedium,
    paddingTop: 2,
  },
  eyeBtn: {
    position: "absolute",
    right: 15,
    top: 20,
  },
  iconColor: { color: COLORS.text },
};

export default SignUpStyle;
