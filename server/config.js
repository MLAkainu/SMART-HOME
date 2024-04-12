import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const { API_KEY, AUTH_DOMAIN, DB_URL, PROJ_ID, BUCKET, SENDER_ID, APP_ID } =
  process.env;

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJ_ID,
  storageBucket: BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
};
