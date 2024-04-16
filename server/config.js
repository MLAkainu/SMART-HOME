import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const { API_KEY, AUTH_DOMAIN, DB_URL, PROJ_ID, BUCKET, SENDER_ID, APP_ID,
SA_TYPE,
SA_PROJ_ID,
SA_PRI_ID,
SA_PRI,
SA_CLI_EMAIL,
SA_CLI_ID,
SA_AUTH_URI,
SA_TOKEN_URI,
SA_AUTH_PROVIDER,
SA_CERT_URL,
SA_UNI_DOMAIN} =
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
const CERT = SA_PRI.replace(/\\n/g, "\n");
export const serviceAccount = {
  type: SA_TYPE,
  project_id: SA_PROJ_ID,
  private_key_id: SA_PRI_ID,
  private_key: CERT,
  client_email: SA_CLI_EMAIL,
  client_id: SA_CLI_ID,
  auth_uri: SA_AUTH_URI,
  token_uri: SA_TOKEN_URI,
  auth_provider_x509_cert_url: SA_AUTH_PROVIDER,
  client_x509_cert_url: SA_CERT_URL,
  universe_domain: SA_UNI_DOMAIN,
};

export const dbUrl = DB_URL;
