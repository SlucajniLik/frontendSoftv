
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBPG5BehbVr3Ntzr6qbji4pDucwtAGJ0bU",
  authDomain: "uploadimage-5f186.firebaseapp.com",
  projectId: "uploadimage-5f186",
  storageBucket: "uploadimage-5f186.appspot.com",
  messagingSenderId: "345300315145",
  appId: "1:345300315145:web:3cef8fb6a949036a2b5cd8"
};


const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)