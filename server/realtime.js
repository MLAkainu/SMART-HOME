import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, update, remove, onValue } from "firebase/database";
import { firebaseConfig } from "./config.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service


export const writeUserData = (userName, Fname,Lname,phoneNo, email, password) => {
  const db = getDatabase();
  const reference = ref(db, "users/" + userName);
  set(reference, {
    Fname: Fname,
    Lname: Lname,
    phoneNo: phoneNo,
    email: email,
    password:password
  });
};

// replace val for each type

export const writeTemp = (userName, val) => {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userName, '/temp');
    set(reference, {
      val:val
    })
}

export const readTemp = (userName) => {
  const db = getDatabase();
  const temp = ref(db, 'users/' + userName + '/temp');
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    updateTemp(postElement,data)
  }
  )
}

export const writeHumid = (userName, val) => {
  const db = getDatabase();
  const reference = ref(db, "users/" + userName, "/humid");
  set(reference, {
    val: val,
  });
};

export const readHumid = (userName) => {
  const db = getDatabase();
  const temp = ref(db, "users/" + userName + "/humid");
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    updateHumid(postElement, data);
  });
};

export const writeLight = (userName, val) => {
  const db = getDatabase();
  const reference = ref(db, "users/" + userName, "/light");
  set(reference, {
    val: val,
  });
};

export const readLight = (userName) => {
  const db = getDatabase();
  const temp = ref(db, "users/" + userName + "/light");
  onValue(temp, (snapshot) => {
    const data = snapshot.val();
    updateLight(postElement, data);
  });
};