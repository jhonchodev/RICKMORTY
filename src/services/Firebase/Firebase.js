import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FIREBASE_ROUTES } from "../../utils/Routes";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyC_gywmm6BNw1WaCJVglz1n2FnrOSTUQBg",
  authDomain: "rickmortyapp-7534c.firebaseapp.com",
  databaseURL: "https://rickmortyapp-7534c-default-rtdb.firebaseio.com/",
  projectId: "rickmortyapp-7534c",
  storageBucket: "rickmortyapp-7534c.appspot.com",
  messagingSenderId: "244069003617",
  appId: "1:244069003617:web:ed9040f63e2fa8d7689520",
};

// apiKey: "AIzaSyBehL8G0MPUtfj0GWgax0uWsToj6_DO8QE",
// authDomain: "rickandmorty-cfcf7.firebaseapp.com",
// projectId: "rickandmorty-cfcf7",
// databaseURL:"https://rickandmorty-cfcf7-default-rtdb.firebaseio.com",
// storageBucket: "rickandmorty-cfcf7.appspot.com",
// messagingSenderId: "396772021520",
// appId: "1:396772021520:web:646712cb6c42e6c9ec8195",
// measurementId: "G-M87R25H7KB"
class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getDatabase();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut();
  };

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //Firebase Database

  getFavoriteCharacters = () =>
    this.db
      .ref(`${FIREBASE_ROUTES.USERS}` + this.auth.currentUser.uid + `${FIREBASE_ROUTES.FAVORITES}`)
      .once("value");

  setNewCharacter = async characterId => {
    var array = await this.getFavoriteCharacters().then(snapshot => (snapshot.val())) || [];
    array.push(characterId)
    this.db.ref().child(`${FIREBASE_ROUTES.USERS}` + this.auth.currentUser.uid + `${FIREBASE_ROUTES.FAVORITES}`).update(array);
  }


  setNewComment = (characterId, commentText) => {
    var newCommentKey = this.db
      .ref()
      .child(`${FIREBASE_ROUTES.COMMENTS}` + characterId)
      .push().key;
    var updates = {};
    updates[`${FIREBASE_ROUTES.COMMENTS}` + characterId + "/" + newCommentKey] = commentText;
    return this.db.ref().update(updates);
  };

  getComments = characterId => this.db.ref(`${FIREBASE_ROUTES.COMMENTS}` + characterId);
}

export default Firebase;
