// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAquGqYcG2kZQjgN2nm02cfsLXE3aLl0E",
  authDomain: "ilodrive-3059d.firebaseapp.com",
  databaseURL: "https://ilodrive-3059d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ilodrive-3059d",
  storageBucket: "ilodrive-3059d.appspot.com",
  messagingSenderId: "591590816203",
  appId: "1:591590816203:web:516d5abc6e82c55eac9e4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const password = document.getElementById("password").value;
    const license = document.getElementById("license").value;
    const contact = document.getElementById("contact").value;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, "user@example.com", password);

      // Get the user ID from the userCredential
      const userId = userCredential.user.uid;

      const user = {
        fullname: fullname,
        password: password,
        license: license,
        contact: contact,
      };

      // Save user data to the database
      const usersRef = ref(db, "users");
      const newUsersRef = push(usersRef);

      set(newUsersRef.child(userId), user);

      console.log("User successfully registered");
      signupForm.reset();
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error creating user and saving data:", error);
      // Handle errors and display appropriate messages to the user
    }
  });
});