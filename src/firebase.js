import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDFmcLJZdbtZ7XaDZArSsn0d5t4HRTx-rw',
  authDomain: 'flower-shop-69019.firebaseapp.com',
  projectId: 'flower-shop-69019',
  storageBucket: 'flower-shop-69019.firebasestorage.app',
  messagingSenderId: '382445615532',
  appId: '1:382445615532:web:9a656249b6af8f5f44e209',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
