import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, onValue } from "firebase/database";
import { firebaseConfig } from "./config.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
import { Router } from "express";
const rtrouter=Router()

export const writeTemp = (req,res) => {
  const db = getDatabase();
  const uid = req.body.uid;
  const val = req.body.val;
  const date = req.body.date;
  const reference = ref(db, `${uid}/temp`);
    set(reference, {
      val,
      date
    })
    res.status(200).json({message:'data recorded'})
}


export const readTemp = (req, res) => {
  const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/temp`)
  const temp = ref(db, `SYS-1/TEMP`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    res.status(200).json(data)
  }
  )
}

export const writeHumid = (req, res) => {
  const db = getDatabase();
  const uid = req.body.uid;
  const val = req.body.val; 
  const date = req.body.date;
  const reference = ref(db, `${uid}/humid`);
  set(reference, {
    val,
    date
  })
  res.status(200).json({message:'data recorded'})
}

export const readHumid = (req, res) => {
  const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/humid`)
  const temp = ref(db, `SYS-1/HUMIDITY`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    res.status(200).json(data)
  })
}

export const writeLight = (req, res) => {
  const db = getDatabase();
  const uid = req.body.uid;
  const val = req.body.val;
  const date = req.body.date;
  const reference = ref(db,`${uid}/light`);
  set(reference, {
    val,
    date
  })
  res.status(200).json({message:'data recorded'})
};

export const readLight = (req, res) => {
  const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/light`)
  const temp = ref(db, `YSY-1/LIGHT`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    res.status(200).json(data)
  })
};

rtrouter.route("/data/stat/light").get(readLight).post(writeLight);
rtrouter.route("/data/stat/humid").get(readHumid).post(writeHumid);
rtrouter.route("/data/stat/temp").get(readTemp).post(writeTemp);
export default rtrouter;