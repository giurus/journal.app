import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA_BqX7JmqmVrggwBtwsZ0U2aIqvt4wJdE',
	authDomain: 'react-app-udemy-3adb0.firebaseapp.com',
	projectId: 'react-app-udemy-3adb0',
	storageBucket: 'react-app-udemy-3adb0.appspot.com',
	messagingSenderId: '587686692314',
	appId: '1:587686692314:web:0aa8ca276a4c5e032cece3'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider, app };
