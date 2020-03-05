import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    pageContainer: {
      flex: 1,
      backgroundColor: "#deede6",
    },
    splashContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },
    formContainer:{
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      marginHorizontal: 45,
    },
    headerContainer:{
      justifyContent: "center",
      alignItems: "center",

      marginBottom: 25,
    },
  
    appTitle: {
      fontSize: 40,
      fontFamily: "Nunito",
      fontStyle: "italic",
      borderBottomWidth: 2,
      marginHorizontal: 45,
      marginBottom: 25,
    },

    appWelcome: {
      fontSize: 15,
      fontFamily: "Nunito",
      marginHorizontal: 45,
      marginBottom: 35,
      paddingBottom: 55,
    },

    btnWrapper: {
      flexDirection: "row",
      justifyContent: "center",
    },

    loginBtn: {
      marginHorizontal: 10,
      paddingHorizontal: 46,
      paddingVertical: 5,
      backgroundColor: '#9cd4ba',
      borderWidth: 1,
      borderColor: '#9cd4ba',
      borderRadius: 2,
      elevation: 2,

    },

    registerBtn: {
      marginHorizontal: 10,
      paddingHorizontal: 46,
      paddingVertical: 5,
      backgroundColor: '#9cd4ba',
      borderWidth: 1,
      borderColor: '#9cd4ba',
      borderRadius: 2,
      elevation: 2,

    },
  
    loginBtnText: {
      fontFamily: "Nunito",
      fontSize: 15,
    },
    registerBtnText: {
      fontFamily: "Nunito",
      fontSize: 15,
    },


    formHeader: {
      fontSize: 20,
      fontFamily: "Nunito",
      marginHorizontal: 45,
      marginBottom: 10,
    },
    formInput: {
      fontFamily: "Nunito",
      marginHorizontal: 45,
      marginBottom: 10,
    },
    formLabel: {
      fontSize: 15,
      fontFamily: "Nunito",
      marginHorizontal: 50,
      borderBottomWidth: 1,
      borderColor: 'black',
    }
  });