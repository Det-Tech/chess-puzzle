import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAmyZ8X_ZXlaa1ERMhwDMFG6t3W3t92WCw",
  authDomain: "puzzle-race.firebaseapp.com",
  databaseURL: "https://puzzle-race.firebaseio.com",
  projectId: "479455954651",
  storageBucket: "puzzle-race.appspot.com",
  messagingSenderId: "G-MHQ6XB0YWD",
  appId: "1:479455954651:web:2fe2522833398d29b6aefe",
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// apiKey
// : 
// "AIzaSyAmyZ8X_ZXlaa1ERMhwDMFG6t3W3t92WCw"
// appId
// : 
// "1:479455954651:web:2fe2522833398d29b6aefe"
// authDomain
// : 
// "puzzle-race.firebaseapp.com"
// databaseURL
// : 
// "https://puzzle-race.firebaseio.com"
// measurementId
// : 
// "G-MHQ6XB0YWD"
// messagingSenderId
// : 
// "479455954651"
// projectId
// : 
// "puzzle-race"
// storageBucket
// : 
// "puzzle-race.appspot.com"

const Firebase = firebase.initializeApp(config);

export const Auth = Firebase.auth();
export const Database = Firebase.database();

export const getFirebaseServerTimestamp = async (): Promise<number> => {
  try {
    const offsetSnap = await Firebase.database()
      .ref("/.info/serverTimeOffset")
      .once("value");

    return offsetSnap.val() + Date.now();
  } catch {
    console.error("Error while getting firebase server time offset");
    return NaN;
  }
};
