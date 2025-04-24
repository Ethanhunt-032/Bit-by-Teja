import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcg2e00ZjiWRSZsIpSr2uVFTyI7P-30_8",
  authDomain: "bit-by-teja-3c506.firebaseapp.com",
  projectId: "bit-by-teja-3c506",
  storageBucket: "bit-by-teja-3c506.firebasestorage.app",
  messagingSenderId: "276599619789",
  appId: "1:276599619789:web:292053eb9408903ee0e984",
  measurementId: "G-WFCRMF1SCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
