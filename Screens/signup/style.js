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
    width: 200,
    height: 51,
    padding: MARGIN.vertical-6,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText:{
    color: 'red',
    fontFamily: FONT.SfProMedium,
    paddingTop: 2,
  },
  eyeBtn: {
    position: "absolute",
    right: 15,
    top: 25,
  },
  iconColor: { color: COLORS.text },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textModal: {
    marginVertical: 5,
    fontSize: 14,
    textAlign: "center",
    fontFamily: FONT.PoppinsBold,
    color: COLORS.primary,
  },
  modalBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginVertical: MARGIN.vertical,
    width: 200,
    height: 51,
    padding: MARGIN.vertical,
    alignItems: "center",
  },
  textBtn: { color: COLORS.white, fontFamily: FONT.Black },
};

export default SignUpStyle;
