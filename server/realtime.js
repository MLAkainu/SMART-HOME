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
  // const uid = req.body.uid;
  // const val = req.body.val;
  // const date = req.body.date;
  // const reference = ref(db, `${uid}/temp`);
  //   set(reference, {
  //     val
  //   })
  const reference = ref(db, 'SYS-1');
    set(reference, {
      'TEMP':req.body.val
    })
  res.status(200).json({ message: "data recorded" });
}


export const readTemp = (req, res) => {
  try{const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/temp`)
  const temp = ref(db, `SYS-1/TEMP`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    res.status(200).json(data).end()
  },{onlyOnce:true}
    )
  }
  catch (err) {
    res.json({data:'error'})
  }
}

export const writeHumid = (req, res) => {
  const db = getDatabase();
  // const uid = req.body.uid;
  // const val = req.body.val; 
  // const date = req.body.date;
  // const reference = ref(db, `${uid}/humid`);
  // set(reference, {
  //   val
  // })
  const reference = ref(db, "SYS-1");
  set(reference, {
    HUMIDITY: req.body.val,
  });
  res.status(200).json({message:'data recorded'})
}

export const readHumid = (req, res) => {
  try {const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/humid`)
  const temp = ref(db, `SYS-1/HUMIDITY`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    res.status(200).json(data).end()
  },{onlyOnce:true})
  }
  catch (err) {
    res.json({data:'error'})
  }
}

export const writeLight = (req, res) => {
  try{const db = getDatabase();
  // const uid = req.body.uid;
  // const val = req.body.val;
  // const date = req.body.date;
  // const reference = ref(db,`${uid}/light`);
  // set(reference, {
  //   val
  // })
    const reference = ref(db, "SYS-1");
    // console.log(req.body.val)
  // set(reference, {
  //   LIGHT: req.body.val,
    // });
    const updates = {};
    updates['SYS-1/LIGHT'] = req.body.val
    update(ref(db),updates)
    res.status(200).json({ message: 'data recorded' })
  }
  catch (err) {
    console.log(err)
  }
};

export const writeDoor = (req, res) => {
  const db = getDatabase();
  // const uid = req.body.uid;
  // const val = req.body.val;
  // const date = req.body.date;
  // const reference = ref(db,`${uid}/light`);
  // set(reference, {
  //   val
  // })
  const reference = ref(db, "SYS-1");
  set(reference, {
    DOOR: req.body.val,
  });
  res.status(200).json({ message: "data recorded" });
};

export const readLight = (req, res) => {
  const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/light`)
  const temp = ref(db, `SYS-1/LUX`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    res.status(200).json(data)
  })
};

export const writeLux = (req,res) => {
  const db = getDatabase();
  // const uid = req.body.uid;
  // const val = req.body.val;
  // const date = req.body.date;
  // const reference = ref(db, `${uid}/temp`);
  //   set(reference, {
  //     val
  //   })
  const reference = ref(db, 'SYS-1');
    set(reference, {
      'TEMP':req.body.val
    })
  res.status(200).json({ message: "data recorded" });
}

export const readLux = (req, res) => {
  try{const db = getDatabase();
  // const temp = ref(db, `${req.body.uid}/temp`)
  const temp = ref(db, `SYS-1/TEMP`)
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    res.status(200).json(data).end()
  },{onlyOnce:true}
    )
  }
  catch (err) {
    res.json({data:'error'})
  }
}

rtrouter.route("/equip/light").get(readLight).post(writeLight)
// rtrouter.route("/equip/door").get(readDoor).post(writeDoor)
// rtrouter.route("/equip/fan").get(readFan).post(writeFan)

rtrouter.route("/data/stat/humid").get(readHumid).post(writeHumid);
rtrouter.route("/data/stat/temp").get(readTemp).post(writeTemp);
rtrouter.route("/data/stat/lux").get(readLux).post(writeLux);
rtrouter.route('/noty/push')
export default rtrouter;