import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDc_LSSqnLtLadxIY119xVhFPaYc3NM2pM",
    authDomain: "br-devs-27c3b.firebaseapp.com",
    projectId: "br-devs-27c3b",
    storageBucket: "br-devs-27c3b.appspot.com",
    messagingSenderId: "255196448272",
    appId: "1:255196448272:web:f2a5d482848a8f7538ac95",
    measurementId: "G-0KV461825Z"
};
/**`
* Gets a users/{uid} document with username
* @param  {string} username
*/
export async function getUserWithUsername(username: string) {
 const usersRef = firestore.collection('users');
 const query = usersRef.where('username', '==', username).limit(1);
 const userDoc = (await query.get()).docs[0];
 return userDoc;
}

/**`
* Converts a firestore document to JSON
* @param  {DocumentSnapshot} doc
*/
export function postToJSON(doc: { data: Function }) {
 const data = doc.data();
 return {
   ...data,
   // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
   createdAt: data.createdAt.toMillis(),
   updatedAt: data.updatedAt.toMillis(),
 };
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
