import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAQy5lx-VblQl_pshyijGNlCtfQfgvpQSk",
    authDomain: "clothing-shop-5ce2c.firebaseapp.com",
    projectId: "clothing-shop-5ce2c",
    storageBucket: "clothing-shop-5ce2c.appspot.com",
    messagingSenderId: "127511148630",
    appId: "1:127511148630:web:4d9ab019e0e83963b9e3f7",
    measurementId: "G-66WY7C2CSQ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get();
    // console.log(snapshot); 
    if(!snapshot.exists) {
      const {displayName , email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        })
      } catch(err) {
        console.log("error creating user" , err.message)
      }
    }  
    return userRef; 
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


