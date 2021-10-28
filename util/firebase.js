// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREAPIKEY,
  authDomain: "za-menu-images.firebaseapp.com",
  projectId: "za-menu-images",
  storageBucket: "za-menu-images.appspot.com",
  messagingSenderId: "953606223601",
  appId: "1:953606223601:web:c1f77676c178b855d05b50",
  measurementId: "G-PEB4CSNPQH"
};

export const app = initializeApp(firebaseConfig);
