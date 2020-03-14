import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#e8dfcc",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  //Welcome page styles -------------

  splashContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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


  //Button styles -------------
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
  homeChitButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 250,
    paddingVertical: 2,
    backgroundColor: '#f96a47',
    borderWidth: 1,
    borderColor: '#f96a47',
    borderRadius: 3,
    elevation: 2,
  },

  postBtn: {
    marginHorizontal: 10,
    paddingHorizontal: 46,
    paddingVertical: 5,
    backgroundColor: '#f96a47',
    borderWidth: 1,
    borderColor: '#f96a47',
    borderRadius: 2,
    elevation: 2,

  },
  btnText: {
    fontFamily: "Nunito",
    fontSize: 15,
    color: '#333333',
  },

  //Form styles -------------
  authFormContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  authFormHeader: {
    fontSize: 20,
    fontFamily: "Nunito",
    marginHorizontal: 45,
    marginBottom: 10,
  },
  authFormInput: {
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
  authFormLabel: {
    fontSize: 15,
    fontFamily: "Nunito",
    marginHorizontal: 45,
    marginBottom: 5,
    color: '#333333',
  },
  //Chit styles -------------
  chitList: {
    marginHorizontal: 0,
  },
  chitContainer: {
    backgroundColor: '#333333',
    elevation: 3,
    borderBottomColor: '#c1c1c1',
    borderBottomWidth: 2,
  },

  chitHeaderContainer: {
    backgroundColor: '#f96a47',
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 4,
    paddingBottom: 10,
  },
  chitDateContainer: {
    backgroundColor: '#f96a47',
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  chitLocationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 175,
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 2,
    paddingTop: 2,
    backgroundColor: '#e9a642',
    borderRadius: 5,
    elevation: 2,
  },
  chitHeader: {
    marginLeft: 10,
    paddingLeft: 0,
    fontSize: 15,
    fontFamily: "Nunito",
    color: '#333333',
  },
  chitDate: {
    paddingRight: 10,
    paddingLeft: 5,
    fontSize: 13,
    fontFamily: "Nunito",
    color: '#333333',
  },
  chitContent: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 35,
    fontSize: 15,
    fontFamily: "Nunito",
    color: '#ffffff',
  },

  //Chit form styles --------------
  chitFormContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 20,

    backgroundColor: '#333333',
    borderRadius: 4
  },
  chitFormHeader: {
    fontSize: 20,
    fontFamily: "Nunito",
    marginHorizontal: 45,
    marginTop: 10,
    color: '#ffffff',
  },
  chitFormInput: {
    fontFamily: "Nunito",
    marginHorizontal: 25,
    marginBottom: 20,
    backgroundColor: '#f96a47',
    color: '#333333',
    borderRadius: 4,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
  },
  chitFormLabel: {
    fontSize: 15,
    fontFamily: "Nunito",
    color: '#333333',
  },

  searchContainer: {
  },
  searchInputContainer: {
    backgroundColor: '#c1c1c1',
  },
  searchInput: {
    fontFamily: "Nunito",
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    color: '#333333',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
    borderRadius: 20,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b1b1b1'
  },
  headerText: {
    alignItems: 'center',
    justifyContent: "center",
  },
  headerIcon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  }

});