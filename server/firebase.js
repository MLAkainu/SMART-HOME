// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
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
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { initializeApp as dbInit } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { Router } from "express";
import { serviceAccount, firebaseConfig, dbUrl } from "./config.js";

const router = Router();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
let app;
let db;

export const initializeFirebaseApp = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: dbUrl,
    });
    app = dbInit(firebaseConfig);
    db = getFirestore(app);
    return admin;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken.uid; // User ID if token is valid
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null;
  }
};

const createUser = async (req, res) => {
  try {
    const receivedToken = req.body.token;
    if (receivedToken === null) throw new Error("error");
    const uid = await verifyToken(receivedToken);
    await setDoc(doc(db, "Users", uid), {
      lname: req.body.lname,
      fname: req.body.fname,
      phoneNo: req.body.phoneNo,
      avatar: null,
    });
    res.status(200).json({ msg: "user created" });
  } catch (error) {
    console.log("Error creating new user:", error);
    res.status(400).json({ msg: "error" });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const receivedToken = req.body.token; // Adjust based on how you send the token
//     if (receivedToken === null) throw new Error("error");
//     const uid = await verifyToken(receivedToken);
//     const docRef = doc(db, "Users", uid);
//     const docSnap = await getDoc(docRef);
//     if (req.body.password === docSnap.data().password) {
//       console.log(`Successfully fetched user data`);
//     res.status(200).json(uid);
//     }
//     else {
//       res.status(400).json({message:'wrong email or password'})
//     }
//   } catch (error) {
//     console.log("Error fetching user data:", error);
//     res.status(404).json({ message: "No user found" });
//   }
// };

// const logOutUser=async(req,res)=>{
//   localStorage.setItem('token','')
// }

const getUser = async (req, res) => {
  try {
    const receivedToken = req.query.token;
    console.log("token=", receivedToken);
    if (receivedToken === null) throw new Error("error");
    const uid = await verifyToken(receivedToken);
    console.log(uid);
    const userRecord = await getAuth().getUser(uid);
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    res.status(200).json({ ...docSnap.data(), email: userRecord.email, uid });
  } catch (error) {
    console.log("Error fetching user data:", error);
    res.status(404).json({ message: "No user found" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userRecord = await getAuth().updateUser(req.body.uid, {
      email: req.body.email,
      password: req.body.password,
    });
    const user = req.body;
    delete user.uid;
    delete user.email;

    await updateDoc(doc(db, "Users", userRecord.uid), user);
    res.status(200).json({ mgs: "user upated" });
  } catch (error) {
    console.log("Error updating user:", error);
    res.json({ message: "cant update user" });
  }
};

// const deleteHelper = async (type,uid) => {
//   const querySnapShot = await getDocs(collection(db, "Users", uid, type));
//   querySnapShot.forEach(async q => {
//     await deleteDoc(doc(db,"Users",uid,type,q.id))
//   })
// }

// const deleteUser = async (req, res) => {
//   try {
//     const uid = req.body.uid;
//     if (uid) {
//       deleteHelper("Notifs", uid)
//       deleteHelper("humid", uid)
//       deleteHelper('temp', uid)
//       deleteHelper('light',uid)
//       await deleteDoc(doc(db, "Users", uid));
//       res.status(200).json({ message: "user deleted" });
//     } else {
//       res.status(404).json({ message: "user not found" });
//     }
//     await getAuth().deleteUser(req.body.uid);
//   } catch (error) {
//     console.log(error);
//     res.json({message:"error when deleting user"})
//   }
// };

const createNotif = async (req, res) => {
  try {
    const receivedToken = req.body.token;
    if (receivedToken === null) throw new Error("error");
    const uid = await verifyToken(receivedToken);
    const userRef = collection(db, "Users", uid, `/Notifs`);
    const docRef = await addDoc(userRef, {
      type: req.body.type,
      message: req.body.message,
      timeStamp: serverTimestamp(),
    });
    res.status(200).json({ message: "notif created" });
  } catch (err) {
    console.log(err);
  }
};

const getNotifs = async (req, res) => {
  try {
    const receivedToken = req.query.token;
    console.log("token=", receivedToken);
    if (receivedToken === null) throw new Error("error");
    const uid = await verifyToken(receivedToken);
    const userRef = collection(db, "Users", uid, "/Notifs");
    const date = new Date(req.body.date);
    const startTime = new Date(date.setHours(0, 0, 0, 0));
    const endTime = new Date(date.setHours(23, 59, 59, 999));
    const q = query(
      userRef,
      where("timeStamp", ">=", startTime),
      where("timeStamp", "<=", endTime)
    );
    const querySnapShot = await getDocs(q);
    const acts = []
    querySnapShot.forEach((act) => {
      acts.push({
        message: act.data().message,
        type: act.data().type,
        timeStamp:act.data().timeStamp.toDate()
      })
    });
    res.send(acts);
  } catch (err) {
    res.status(400).json({ message: "can not get notifs" });
    console.log(err);
  }
};

const createActivity = async (req, res) => {
  try {
    const receivedToken = req.body.token;
    if (receivedToken === null) throw new Error("error");
    const uid = await verifyToken(receivedToken);
    const userRef = collection(db, "Users", uid, `/${req.body.type}`);
    const docRef = await addDoc(userRef, {
      val: req.body.val,
      timeStamp: serverTimestamp(),
    });
    res.status(200).json({ message: "activity recorded" });
  } catch (err) {
    console.log(err);
  }
};

const getActivities = async (req, res) => {
  try {
    const receivedToken = req.query.token;
    if (receivedToken === null) throw new Error("error");
    const uid = await verifyToken(receivedToken);
    const userRef = collection(db, "Users", uid, req.query.type);
    const date = new Date(req.query.date);
    const startTime = new Date(date.setHours(0, 0, 0, 0));
    const endTime = new Date(date.setHours(23, 59, 59, 999));
    const q = query(
      userRef,
      where("timeStamp", ">=", startTime),
      where("timeStamp", "<=", endTime)
    );
    const querySnapShot = await getDocs(q);
    var acts = new Array(24).fill(null);
    querySnapShot.forEach((act) => {
      let time = act.data().timeStamp.toDate().getHours();
      acts[time] = act.data().val;
    });
    res.send(acts);
  } catch (err) {
    res.status(400).json({ message: "can not get activities" });
    console.log(err);
  }
};

// const verifyUser = async (req, res) => {
//   try {
//     const uid = req.body.token;
//     const userRecord = await getAuth().getUser(uid);
//     const docRef = doc(db, "Users", uid);
//     const docSnap = await getDoc(docRef);
//     res.status(200).json({ ...docSnap.data(), email: userRecord.email, uid });
//   } catch (error) {
//     console.log("Error fetching user data:", error);
//     res.status(404).json({ msg: "false" });
//   }
// }

router.route("/user/new").post(createUser);
// router.route("/user/login").post(loginUser);
// router.route('/user/verify').post(verifyUser);
router.route("/user/").get(getUser).put(updateUser); //.delete(deleteUser);
router.route("/notifs").post(createNotif).get(getNotifs);
router.route("/activities").get(getActivities).post(createActivity);

export default router;
