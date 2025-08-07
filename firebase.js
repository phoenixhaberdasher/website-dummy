// firebase-helper.js

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFISwNmmI0A2XpQqc4m2zbJydwmcHThNA",
  authDomain: "roundabouthoolahoop.firebaseapp.com",
  databaseURL: "https://roundabouthoolahoop-default-rtdb.firebaseio.com",
  projectId: "roundabouthoolahoop",
  storageBucket: "roundabouthoolahoop.appspot.com",
  messagingSenderId: "921987760079",
  appId: "1:921987760079:web:717e0055807fa39efb9cba",
  measurementId: "G-C828PCEPJJ"
};

// Initialize Firebase once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  getAnalytics(app);
  console.log("🔥 Firebase initialized");
} else {
  app = getApps()[0];
  console.log("📦 Firebase already initialized");
}

const db = getDatabase(app);

// Write data to any path
export async function writeData(path, data) {
  try {
    const dataRef = ref(db, path);
    await set(dataRef, data);
    console.log(`✅ Successfully wrote to ${path}`);
  } catch (error) {
    console.error(`❌ Write failed for ${path}:`, error);
  }
}

// Read data from any path
export async function readData(path) {
  try {
    const snapshot = await get(child(ref(db), path));
    if (snapshot.exists()) {
      console.log(`📥 Data from ${path}:`, snapshot.val());
      return snapshot.val();
    } else {
      console.log(`⚠️ No data found at ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Read failed for ${path}:`, error);
    return null;
  }
}
