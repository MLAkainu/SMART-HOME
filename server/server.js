import express from "express";
import morgan from "morgan";
import cors from 'cors'
import * as dotenv from "dotenv";
import router, { initializeFirebaseApp } from "./firebase.js";
import rtrouter from './realtime.js';
dotenv.config({ path: "../.env" });
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

initializeFirebaseApp();
// api here

app.use('/api', router);
app.use('/api',rtrouter)

// not found
app.use("*", (req, res) => {
  res.json({ msg: "not found" });
});

// port
const port = process.env.PORT || 5001;

try {

  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}