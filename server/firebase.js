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
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("userName", "==", req.body.userName));
    const user = await getDocs(q);
    //console.log(user);
    const docs=[]
    user.forEach((doc) => {
      docs.push(doc.data())
    });
    if (docs.length > 0) {
      return res.status(400).json({msg:'username already exist'})
    }
    const docRef = await addDoc(usersRef, req.body);
    res.status(201).json({ msg: "user created" });
  } catch (err) {
    console.log(err);
  }
};

const getUserByUserName = async (req, res) => {
  try {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("userName", "==", req.body.userName));
    const user = await getDocs(q);
    const docs=[]
    user.forEach((doc) => {
      docs.push(doc.data())
      console.log(doc.data())
    });
    if (docs.length > 0) {
      return res.status(200).json(docs)
    }
    return res.status(404).json({msg:'not found'})
  }
  catch (err) {
    console.log(err)
  }

};

router.route("/users").post(createUser).get(getUserByUserName);

export default router;
