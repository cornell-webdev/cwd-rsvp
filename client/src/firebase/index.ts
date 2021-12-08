// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDOTFJSRWLj2et6H0KH7Blb60lyejmhhqs',
  authDomain: 'rsvp-333720.firebaseapp.com',
  projectId: 'rsvp-333720',
  storageBucket: 'rsvp-333720.appspot.com',
  messagingSenderId: '50488861870',
  appId: '1:50488861870:web:1f6121ef962cc35b5af93f',
  measurementId: '${config.measurementId}',
}

export const firebase = initializeApp(firebaseConfig)
export const storage = getStorage(firebase)
export const analytics = getAnalytics(firebase)
