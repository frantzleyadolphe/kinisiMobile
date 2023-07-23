import { FONT, MARGIN, COLORS, SCREENSIZE } from "../../constants";

const HomeStyle = {
  Page: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: MARGIN.horizontal,
    marginLeft: MARGIN.horizontal,
  },
  colorPage:{
     flex: 1, 
     backgroundColor: COLORS.white
  },
  SectionIcon: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingTop:2,
    paddingBottom: 5,
  },
  Icon:{
    color: COLORS.primary,
    paddingLeft: 10,
  },
  ViewButton:{
    flexDirection:'row',
    paddingBottom: 20,
  },
  Section:{
    width:'100%',
    paddingTop: 15,
  },
  SectionSlider:{
    width:'100%',
    paddingTop: 10,
  },
  image:{
    width: 100,
    height:100,
    marginTop:MARGIN.vertical
  },
  image2:{
    width: 175,
    height:100,
    marginTop:MARGIN.vertical
  },
  avatar:{
    width: 50,
    height:50
  },
  button:{
    width: (SCREENSIZE.deviceWidth / 2) - 25,
    height: (SCREENSIZE.deviceHeight / 4) - 25,
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    alignItems: "center",
    marginRight:20
  },
  Text:{
    fontFamily: FONT.Black,
    padding: 10,
    
    color: COLORS.buttonText,
    textAlign: 'center'
  },
  imageContainer :{
    borderRadius:15,
    overFlow: 'hidden'
  },
  imageSlider :{
    width:SCREENSIZE.deviceWidth-25,
    height:100,
    borderRadius:15,
  },
  ButtonRetour:{
   alignSelf:'flex-start',
   color:COLORS.primary
  },
  Header:{
    width:'100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingTop:10,
    justifyContent: 'space-between',
  },
  TextHeader:{
    fontFamily:FONT.Black,
    fontSize:15,
  }
};

export default HomeStyle;
