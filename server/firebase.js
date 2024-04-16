// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from "express";
import { firebaseConfig } from "./config.js";
const router = Router();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
let app;
let db;
let auth;

export const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app)
    return app;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const userRef = collection(db, 'Users');
    const q = query(userRef, where("userName", '==', req.body.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId=doc.id;
    });
    if (userId){
      res.status(400).json({msg:"username already exist"})
    } else {
      await addDoc(userRef, req.body)
      res.status(200).json({msg:'user created'})
    }
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.body.userName));
    let user;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });
    if (user) {
      if (user.password != req.body.password)
        return res.status(401).json({msg:'wrong password'})
      delete user.password;
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "user not found" })
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.params.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    if (userId) {
      await updateDoc(doc(db, "Users", userId),req.body);
      res.status(200).json({msg:"user updated"});
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}

const deleteUser = async (req, res) => {
  try {
    const userRef = collection(db, "Users");
    const q = query(userRef, where("userName", "==", req.params.userName));
    let userId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    if (userId) {
      const notifQuerySnapShot = await getDocs(
        collection(db, "Users", userId, "Notifs")
      );
      notifQuerySnapShot.forEach(async (document) => {
        await deleteDoc(doc(db,'Users',userId,'Notifs',document.id))
      });
      const actQuerySnapShot = await getDocs(
        collection(db, "Users", userId, "Activities")
      );
      actQuerySnapShot.forEach(async (document) => {
        await deleteDoc(doc(db, "Users", userId, "Activities", document.id));
      });
      await deleteDoc(doc(db, 'Users', userId));
      res.status(200).json({ msg: "user deleted" });
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}

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
      res.status(200).json({ msg: "notif created" });
    }
    else {
      res.status(404).json({ msg: "user not found" });
    }
  }
  catch (err) {
    console.log(err)
  }
}

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
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}

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
    res.status(200).json({ msg: "notif created" });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
} catch (err) {
  console.log(err);
}
}

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
      res.status(404).json({ msg: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
}

router.route("/user/new").post(createUser);
router.route("/user/login").post(getUser);
router.route('/user').put(updateUser).delete(deleteUser);
router.route("/:userName/notifs").post(createNotif).get(getNotifs);
router.route('/:userName/activities').get(getActivities).post(createActivity);

export default router;
