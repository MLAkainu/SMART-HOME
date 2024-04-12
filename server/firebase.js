// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { Router } from "express";
import { firebaseConfig } from "./config.js";
const router = Router();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
let app;
let db;

export const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    return app;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    delete req.body.userName;
    const usersRef = doc(db, "Users",userName);
    // const q = query(usersRef, where("userName", "==", req.body.userName));
    // const user = await getDocs(q);
    //console.log(user);
    const user = await getDoc(usersRef);
    // const docs=[]
    // user.forEach((doc) => {
    //   const info = doc.data();
    //   delete info.password;
    //   docs.push(info);
    // });
    // if (docs.length > 0) {
    //   return res.status(400).json({msg:'username already exist'})
    // }
    if (user.exists()) {
      return res.status(400).json({ msg: "username already exist" });
    }
    await setDoc(usersRef, req.body);
    res.status(201).json({ msg: "user created" });
  } catch (err) {
    console.log(err);
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const userName = req.body.userName;
    delete req.body.userName;
    const usersRef = doc(db, "Users", userName);
    const user = await getDoc(usersRef);
    if (user.exists()) {
      const userData = user.data()
      delete userData.password;
      return res.status(200).json(userData)
    }
    return res.status(404).json({msg:'not found'})
  }
  catch (err) {
    console.log(err)
  }

};

const createNotif = async (req, res) => {
  try {
    const userName = req.body.userName;
    delete req.body.userName;
    const usersRef = doc(db, "Users", userName);
    const user = await getDoc(usersRef);
    if (user.exists()) {
      const notifRef = collection(db, "Users", userName, "Notifs");
      const notif = {
        type: req.body.type,
        content: req.body.content,
        createdAt:serverTimestamp(),
      };
      await addDoc(notifRef, notif);
      res.status(200).json({ msg: "notif created" });
    }
    else {
      res.status(404).json({msg:"user not found"})
    }
  }
  catch (err) {
    console.log(err)
  }
}

const getNotifsByUserName = async (req, res) => {
  try {
    const userName = req.body.userName;
    delete req.body.userName;
    const usersRef = doc(db, "Users", userName);
    const user = await getDoc(usersRef);
    if (user.exists()) {
      const querySnapShot = await getDocs(collection(db, "Users", userName, "Notifs"))
      const notifs = []
      querySnapShot.forEach(doc => {
        let data = doc.data();
        const time = new Date(data.createdAt.toDate())
        data = {
          ...data,
          createdAt: time
        }
        notifs.push(data)
      })
      res.status(200).json(notifs);
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}


router.route("/users").post(createUser).get(getUserByUserName);
router.route("/notifs").post(createNotif).get(getNotifsByUserName);

export default router;
