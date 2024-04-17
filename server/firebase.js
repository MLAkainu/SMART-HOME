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

const createUser = async (req, res) => {
  try {
    const userRecord = await getAuth().createUser({
      email: req.body.email,
      emailVerified: false,
      password: req.body.password,
      disabled: false,
    });
    console.log("Successfully created new user:", userRecord.uid);
    await setDoc(doc(db, "Users", userRecord.uid), {
      lname: req.body.lname,
      fname: req.body.fname,
      phoneNo: req.body.phoneNo,
      password:req.body.password,
      avatar: null,
    });
    res.status(200).send({ message: "user created" });
  } catch (error) {
    console.log("Error creating new user:", error);
    res.status(400).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const userRecord = await getAuth().getUserByEmail(req.body.email);
    const uid = userRecord.uid;
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    if (req.body.password === docSnap.data().password) {
      console.log(`Successfully fetched user data`);
    res.status(200).json(userRecord.passwordHash);
    }
    else {
      res.status(400).json({message:'wrong email or password'})
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
    res.status(404).json({ message: "No user found" });
  }
};

const logOutUser=async(req,res)=>{
  localStorage.setItem('token','')
}

const getUser = async (req, res) => {
  try {
    const uid = req.body.uid;
    const userRecord = await getAuth().getUser(req.body.uid);
    const docRef = doc(db, "Users", req.body.uid);
    const docSnap = await getDoc(docRef);
    res.status(200).json({...docSnap.data(),email:userRecord.email,uid})

  } catch (error) {
    console.log("Error fetching user data:", error);
      res.status(404).json({ message: "No user found" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userRecord = await getAuth().updateUser(req.body.uid, {
      email: req.body.email,
      password:req.body.password,
    })
    console.log(userRecord)
    const user = req.body;
    delete user.uid;
    delete user.email;
    delete user.password;
    
    await updateDoc(doc(db, "Users", userRecord.uid),user)
    res.status(200).json({ mgs: "user upated" });
  }
  catch (error) {
    console.log("Error updating user:", error);
    res.json({message:'cant update user'})
  }
};

const deleteUser = async (req, res) => {
  try {
    const uid = req.body.uid;
    if (uid) {
      const notifQuerySnapShot = await getDocs(
        collection(db, "Users", uid, "Notifs")
      );
      notifQuerySnapShot.forEach(async (document) => {
        await deleteDoc(doc(db, "Users", uid, "Notifs", document.id));
      });
      const actQuerySnapShot = await getDocs(
        collection(db, "Users", uid, "Activities")
      );
      actQuerySnapShot.forEach(async (document) => {
        await deleteDoc(doc(db, "Users", uid, "Activities", document.id));
      });
      await deleteDoc(doc(db, "Users", uid));
      res.status(200).json({ message: "user deleted" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
    await getAuth().deleteUser(req.body.uid);
  } catch (error) {
    console.log(error);
    res.json({message:"error when deleting user"})
  }
};

const createNotif = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.params.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    if (userId) {
      const notifRef = collection(db, "Users", userId, "Notifs");
      const notif = {
        type: req.body.type,
        content: req.body.content,
        createdAt: serverTimestamp(),
      };
      await addDoc(notifRef, notif);
      res.status(200).json({ message: "notif created" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getNotifs = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.params.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    if (userId) {
      const querySnapShot = await getDocs(
        collection(db, "Users", userId, "Notifs")
      );
      const notifs = [];
      querySnapShot.forEach((doc) => {
        let data = doc.data();
        const time = new Date(data.createdAt.toDate());
        data = {
          ...data,
          createdAt: time,
        };
        notifs.push(data);
      });
      res.status(200).json(notifs);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const createActivity = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.params.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    if (userId) {
      const actRef = collection(db, "Users", userId, "Activitites");
      const act = {
        type: req.body.type,
        content: req.body.content,
        createdAt: serverTimestamp(),
      };
      await addDoc(actRef, act);
      res.status(200).json({ message: "notif created" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getActivities = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.params.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    if (userId) {
      const querySnapShot = await getDocs(
        collection(db, "Users", userId, "Activities")
      );
      const acts = [];
      querySnapShot.forEach((doc) => {
        let data = doc.data();
        const time = new Date(data.createdAt.toDate());
        data = {
          ...data,
          createdAt: time,
        };
        acts.push(data);
      });
      res.status(200).json(atcs);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const verifyUser = async (req, res) => {
  try {
    const uid = req.body.token;
    const userRecord = await getAuth().getUser(uid);
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    res.status(200).json({ ...docSnap.data(), email: userRecord.email, uid });
  } catch (error) {
    console.log("Error fetching user data:", error);
    res.status(404).json({ msg: "false" });
  }
}

router.route("/user/new").post(createUser);
router.route("/user/login").post(loginUser);
router.route('/user/verify').post(verifyUser);
router.route("/user/").get(getUser).put(updateUser).delete(deleteUser);
router.route("/notifs").post(createNotif).get(getNotifs);
router.route("/activities").get(getActivities).post(createActivity);

export default router;
