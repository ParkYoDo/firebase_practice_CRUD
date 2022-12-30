import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDoOiak1g6k0wvpk8h13G0g4PGVYgoPhMc',
  authDomain: 'store-cf58f.firebaseapp.com',
  projectId: 'store-cf58f',
  storageBucket: 'store-cf58f.appspot.com',
  messagingSenderId: '583129694224',
  appId: '1:583129694224:web:4cd81a42007356d3dcca95',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
