// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const signupForm = document.getElementById('signUpForm')

// input fields and button
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const passwordConfirmInput = document.getElementById('passwordConfirmInput')
const signupBtn = document.getElementById('signupBtn')

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
// const auth = getAuth(app)


function signUp(){
    const auth = getAuth(app)
    const email = emailInput.value
    const password = passwordInput.value
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
            .then(()=>{alert('email verification link sent to your email')})
        if(auth.currentUser.emailVerified){
            open('../index.html', '_self')
        }else{open('../updateprofile/')}
        alert('signed up')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

    });
}

// Utility functions
    function clearSignUpInputFields(){
        emailInput.value = ''
        passwordInput.value = ''
    }

    function enableSignUpBtn(){
        signupBtn.disabled = false
    }
    
    function disableSignUpBtn(){
        signupBtn.disabled = true
    }

    signupBtn.addEventListener('click', () => {
        signUp()
        clearSignUpInputFields()
    })

    signupForm.addEventListener('submit', e => e.preventDefault())

    passwordConfirmInput.addEventListener('input', () => {
        if(passwordInput.value == passwordConfirmInput.value){
            enableSignUpBtn()
        }else{disableSignUpBtn()}
    })
