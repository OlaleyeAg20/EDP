import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"; 

// elements to be removed from logged in view
const mobileNav = document.getElementById('mobileNav')
const signInContainer = document.getElementById('signInContainer')
const heroSection = document.getElementById('heroSection')
const serviceSection = document.getElementById('serviceSection')
const services = document.getElementById('services')
const aboutSection = document.getElementById('aboutSection')
const contactSection = document.getElementById('contactSection')
const footer = document.getElementById('footer')
const signOutBtn = document.getElementById('signOutBtn')
const main = document.querySelector('main')
const menuBtn = document.getElementById('menuBtn')

const itemsTobeRemovedFromLoggedInView = [mobileNav, signInContainer,
                                          heroSection, serviceSection,
                                          services, aboutSection,
                                          contactSection, footer, menuBtn]

const itemsTobeShownOnLoggedInView = [signOutBtn]

// console.log('working')
const firebaseConfig = {
  apiKey: "AIzaSyBz6AZNmiUcDEhH4Lb-BG-sxuyAKskXz_g",
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    loggedInView()
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});



signOutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    location.reload()
  }).catch((error) => {
    // An error happened.
  });
})

//   signupBtn.addEventlistener('click', ()=> console.log('clicked'))

  function loggedInView(){
    itemsTobeRemovedFromLoggedInView.forEach(event => {
      event.style.display = 'none'
    })
    main.innerHTML = ''
    itemsTobeShownOnLoggedInView.forEach(event => {
      event.style.display = 'flex'
    })
  }