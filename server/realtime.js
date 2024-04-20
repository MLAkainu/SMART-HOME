import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, onValue } from "firebase/database";
// import { firebaseConfig } from "./config.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
  apiKey: "AIzaSyDkg6T_z2SyvQxU2BIv1bJcfddlhEGqNR4",
  authDomain: "smart-home-1dabb.firebaseapp.com",
  databaseURL:
    "https://smart-home-1dabb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-home-1dabb",
  storageBucket: "smart-home-1dabb.appspot.com",
  messagingSenderId: "653274004114",
  appId: "1:653274004114:web:4a60ff484610d413c4c44b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
import { Router } from "express";
const rtrouter=Router()

export const writeTemp = (req,res) => {
  const db = getDatabase();
  const uid = req.body.uid;
  const val = req.body.val;
  const reference = ref(db, `${uid}/temp`);
    set(reference, {
      val
    })
    res.status(200).json({message:'data recorded'})
}


export const readTemp = (req,res) => {
  const db = getDatabase();
  const temp = ref(db, `${req.body.uid}/temp`)
  console.log(temp)
  onValue(temp, (snapshot) => {
    console.log(snapshot)
    const data = snapshot.val();
    res.status(200).json(data)
  }
  )
}

export const writeHumid = (uid, val) => {
  const db = getDatabase();
  const reference = ref(db, `users/${uid}/humid`);
  set(reference, {
    val: val,
  });
};

export const readHumid = (uid) => {
  const db = getDatabase();
  const temp = ref(db, `users/${uid}/humid`);
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    updateHumid(postElement, data);
  });
};

export const writeLight = (uid, val) => {
  const db = getDatabase();
  const reference = ref(db,`users/${uid}/light`);
  set(reference, {
    val: val,
  });
};

export const readLight = (uid) => {
  const db = getDatabase();
  const temp = ref(db, `users/${uid}/light`);
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    updateLight(postElement, data);
  });
};

rtrouter.route('/realtime/temp/').get(readTemp).post(writeTemp)
export default rtrouter;