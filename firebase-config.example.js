// firebase-config.js (example) -- rename and fill
 import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
 import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
 import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
 const firebaseConfig = {
 apiKey: "REPLACE_ME",
 authDomain: "REPLACE_ME.firebaseapp.com",
 projectId: "REPLACE_ME",
 appId: "REPLACE_ME"
 };
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);