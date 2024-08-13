// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth"
require("dotenv").config()


// input fields and button
const form = document.getElementById('form')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const signInBtn = document.getElementById('signInBtn')
const loadingIcon = document.getElementById('loadingIcon')
const btnText = document.getElementById('btnText')
const forgotPassword = document.getElementById('forgotPassword')
const forgotPasswordPopup = document.getElementById('forgotPasswordPopup')
const closePopupBtn = document.getElementById('closePopupBtn')
const passwordResetbtn = document.getElementById('passwordResetbtn')
const emailResetInput = document.getElementById('emailResetInput')
const resetForm = document.getElementById('resetForm')

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "computer-database-5f596.firebaseapp.com",
  databaseURL: "https://computer-database-5f596-default-rtdb.firebaseio.com",
  projectId: "computer-database-5f596",
  storageBucket: "computer-database-5f596.appspot.com",
  messagingSenderId: "24687138568",
  appId: "1:24687138568:web:93c755ba970d971b6d3ebd",
  measurementId: "G-RWWECYWQJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function signIn(){
    const email = emailInput.value
    const password = passwordInput.value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(auth.currentUser.emailVerified){
        open('../index.html', '_self')
    }else{open('../updateprofile/')}
    // ...
    signInBtn.disabled = false
    loadingIcon.classList.add('hidden')
    btnText.classList.remove('hidden')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode == 'auth/invalid-credential' ? 'Incorrect Email or Password' : errorMessage)
    signInBtn.disabled = false
    loadingIcon.classList.add('hidden')
    btnText.classList.remove('hidden')
  });

}

function updatePasswordFunction(){
  const email = emailResetInput.value
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert('Password Reset link sent')
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorCode, errorMessage)
    // ..
  });

}

function closePupUp(){
    forgotPasswordPopup.classList.add('hidden')
    forgotPasswordPopup.classList.remove('flex')
}

passwordResetbtn.addEventListener('click', updatePasswordFunction)

signInBtn.addEventListener('click', e => {
    signIn()
    signInBtn.disabled = true
    loadingIcon.classList.remove('hidden')
    btnText.classList.add('hidden')
})

forgotPassword.addEventListener('click', () => {
  forgotPasswordPopup.classList.remove('hidden')
  forgotPasswordPopup.classList.add('flex')
})

resetForm.addEventListener('submit', e => e.preventDefault())

forgotPasswordPopup.addEventListener('click', e => {
  if(e.target == e.currentTarget) {
    closePupUp()
  }
})

closePopupBtn.addEventListener('click', closePupUp)

form.addEventListener('submit', e => e.preventDefault())

