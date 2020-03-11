import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    pageContainer: {
      flex: 1,
      backgroundColor: "#e8dfcc",
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
    },
    headerContainer:{
      alignItems: "center",
      marginBottom: 25,
    },
  
    appTitle: {
      fontSize: 40,
      fontFamily: "Nunito",
      fontStyle: "italic",
      borderBottomWidth: 1.5,
      borderBottomColor: "#333333",
      marginHorizontal: 45,
      marginBottom: 25,
      color: "#333333",
    },

    appWelcome: {
      fontSize: 15,
      fontFamily: "Nunito",
      marginHorizontal: 45,
      marginBottom: 35,
      paddingBottom: 55,
      color: '#333333',
    },

    btnWrapper: {
      flexDirection: "row",
      justifyContent: "center",
    },

    loginBtn: {
      marginHorizontal: 10,
      paddingHorizontal: 46,
      paddingVertical: 5,
      backgroundColor: '#f96a47',
      borderWidth: 1,
      borderColor: '#f96a47',
      borderRadius: 2,
      elevation: 2,

    },

    registerBtn: {
      marginHorizontal: 10,
      paddingHorizontal: 46,
      paddingVertical: 5,
      backgroundColor: '#f96a47',
      borderWidth: 1,
      borderColor: '#f96a47',
      borderRadius: 2,
      elevation: 2,

    },
  
    loginBtnText: {
      fontFamily: "Nunito",
      fontSize: 15,
      color: '#333333',
    },
    registerBtnText: {
      fontFamily: "Nunito",
      fontSize: 15,
      color: '#333333',
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
      marginBottom: 20,
      paddingVertical: 5,
      backgroundColor: '#333333',
      color: '#ffffff',
      borderRadius: 2,
      borderBottomColor: '#ffffff',
      borderBottomWidth: 1,
    },
    formLabel: {
      fontSize: 15,
      fontFamily: "Nunito",
      marginHorizontal: 45,
      marginBottom: 5,
      color: '#333333',
    }
  });