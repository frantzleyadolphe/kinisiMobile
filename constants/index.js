import { Dimensions } from "react-native";

export const SCREENSIZE ={
    deviceHeight : Dimensions.get('window').height,
    deviceWidth : Dimensions.get('window').width
};

export const COLORS= {
    primary: '#1C71A6',
    secondary: '#F2F2F2',
    input:'#F2F1F0',
    text:'#0E0E0E',
    iconColor:'#407BFF',
    white:'#FFFFFF',
    buttonText:'#000038',
    spinner:'#1C71A6',
    gray:'#8C8C8C',
    black:'#0D0D0D',
};

export const MARGIN={
    horizontal: SCREENSIZE.deviceWidth/25,
    vertical:SCREENSIZE.deviceWidth/25,
};

export const SIZE={
    title:22,
    susbtitle:14
};

export const FONT = {
    Black: "bohuan",
    SfProRegular:"SfProRegular",
    SfProMedium:"SfProMedium",
    PoppinsBold:"PoppinsBold",
    
  };
