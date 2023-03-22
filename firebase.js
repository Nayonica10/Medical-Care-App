// Import the functions you need from the SDKs you need
import { initializeApp, initializepp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASXG_A5K-BB0EJN87GgxAlxS9o-8H3fxk",
  authDomain: "hospitalfacedetect.firebaseapp.com",
  projectId: "hospitalfacedetect",
  storageBucket: "hospitalfacedetect.appspot.com",
  messagingSenderId: "753471355012",
  appId: "1:753471355012:web:10f3094e87312e9a4a2ad1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
