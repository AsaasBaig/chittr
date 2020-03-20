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


  //camera
  cameraContainer: { flex: 1, flexDirection: 'column' },
  cameraPreview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  cameraCapture: { flex: 0, borderRadius: 5, padding: 15, paddingHorizontal: 20,
  alignSelf: 'center', margin: 20, },

  header: { flex: 1, flexDirection: 'row', alignItems: 'center', 
    justifyContent: 'center', },

  headerText: { flex: 1, alignItems: 'center', justifyContent: "center", color: '#ffffff' },

  headerIcon: { flex: 1, alignItems: 'flex-start', justifyContent: 'center', color: '#ffffff' },

  //Button styles -------------
  btnWrapper: { flexDirection: "row", justifyContent: "center", },

  loginBtn: {marginHorizontal: 10, paddingHorizontal: 46, paddingVertical: 5, backgroundColor: '#f96a47',
    borderWidth: 1, borderColor: '#f96a47', borderRadius: 2, elevation: 2, },

  registerBtn: { marginHorizontal: 10, paddingHorizontal: 46, paddingVertical: 5,  backgroundColor: '#f96a47', 
    borderWidth: 1, borderColor: '#f96a47', borderRadius: 2, elevation: 2, },

  homeChitButton: { alignItems: "center", justifyContent: "center", marginRight: 10, marginLeft: 250,
    paddingVertical: 2, backgroundColor: '#f96a47', borderWidth: 1, borderColor: '#f96a47', 
    borderRadius: 3, elevation: 2, },

  postBtn: { marginHorizontal: 10, paddingHorizontal: 46, paddingVertical: 5, backgroundColor: '#f96a47',
    borderWidth: 1, borderColor: '#f96a47', borderRadius: 2, elevation: 2, },

  btnText: {  fontFamily: "Nunito", fontSize: 15, color: '#333333', },

  profileBtn: { marginVertical: 5, marginHorizontal: 15, paddingHorizontal: 20, paddingVertical: 5,
    backgroundColor: '#333333', borderWidth: 1, borderColor: '#333333', 
    borderRadius: 2, elevation: 2, },

  profileBtnText: { fontFamily: "Nunito", fontSize: 15, color: '#ffffff', },

  //Auth form styles -------------
  authFormContainer: { flex: 1, flexDirection: "column", justifyContent: "center", },

  authFormHeader: { fontSize: 20, fontFamily: "Nunito", marginHorizontal: 45, marginBottom: 10, },

  authFormInput: { fontFamily: "Nunito", marginHorizontal: 45, marginBottom: 20, paddingVertical: 5,
    backgroundColor: '#333333', color: '#ffffff', borderRadius: 2, borderBottomColor: '#ffffff',
    borderBottomWidth: 1, },

  authFormLabel: { fontSize: 15, fontFamily: "Nunito", marginHorizontal: 45, marginBottom: 5,
    color: '#333333', },


  //Chit styles -------------
  chitList: {
  },
  chitContainer: {
    backgroundColor: '#e8dfcc',
    elevation: 3,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },

  chitHeaderContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingBottom: 5,
  },

  chitHeaderName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "flex-start",
  },
  
  chitDateContainer: {
    alignItems: "flex-end",
  },

  chitDate: {
    marginHorizontal: 5,
    fontSize: 12,
    fontFamily: "Nunito",
    fontStyle: 'italic',
    color: '#333333',
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
    paddingTop: 12,
    marginRight: 10,
    fontSize: 15,
    fontFamily: "Nunito",
    color: '#333333',
  },

  chitContent: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 25,
    fontSize: 15,
    fontFamily: "Nunito",
    color: '#333333',
  },

  chitImageContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#333333'
  },

  chitPhotoContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 5,
    paddingVertical: 150,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#333333'
  },

  //Chit form styles --------------
  chitFormContainer: { flex: 1, flexDirection: "column", justifyContent: "center", },

  chitFormContainerDetails: {},

  chitFormHeader: { fontSize: 20, fontFamily: "Nunito", marginHorizontal: 45, marginBottom: 10, },

  chitFormInput: { fontFamily: "Nunito", marginHorizontal: 45, marginBottom: 20, paddingVertical: 5,
    backgroundColor: '#333333', color: '#ffffff', borderRadius: 2, borderBottomColor: '#ffffff',
    borderBottomWidth: 1, },
    
  chitFormLabel: { fontSize: 15, fontFamily: "Nunito", marginHorizontal: 45, marginBottom: 5,
    color: '#333333', },

  //profile style
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 20,
  },
  profileImageContainer: {
    marginHorizontal: 50,
    marginBottom: 10,
    paddingHorizontal: 75,
    paddingVertical: 75,
    borderRadius: 75,
    backgroundColor: '#ffffff',
    borderColor: '#333333',
    borderWidth: 2,
  },
  profileLabel: {
    fontFamily: "Nunito",
    fontSize: 25,
    fontStyle: "italic",
    color: "#333333",
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 15,
  },
  profileDetailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    marginVertical: 15,
    marginHorizontal: 25,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
  },
  profileInput: {
    flex: 1,
    flexWrap: "wrap",
    marginRight: 25,
    fontFamily: "Nunito",
    paddingVertical: 5,
    backgroundColor: '#333333',
    color: '#ffffff',
    borderRadius: 4,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
  },
  profileFormLabel: {
    fontSize: 15,
    fontFamily: "Nunito",
    marginLeft: 25,
    marginBottom: 10,
    color: '#333333',
  },
  profileDetailsColumn: {
    flexDirection: "column",
    flex: 1,
  },

  //search style
  searchInputContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: '#333333',
    borderRadius: 15,
    borderWidth: 1,
  },
  searchIconContainer:{
    marginLeft: 15,
    justifyContent: "center",
  },
  searchInput: {
    flex:1,
    flexWrap: 'wrap',
    fontFamily: "Nunito",
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    color: '#ffffff',
    borderColor: '#ffffff',
  },

  otherChitContainer: {
    marginHorizontal: 10,
    backgroundColor: '#eeeeee',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },

});