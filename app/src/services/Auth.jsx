import { app, auth } from "../firebase/firebase"
import { getFirestore, collection, setDoc } from "firebase/firestore"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"

export async function register(email, password, username) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCreated) => {
      uid: userCreated.user.uid
      const firestore = getFirestore(app)

      setDoc(collection(firestore, "users").id(uid), {
        username: username,
        email: email,
      })
    })
    .then(() => {
      console.log("Données utilisateur stockées avec succès !")
    })
    .catch((err) => {
      console.log("Erreur: ", err)
    })
    .catch((err) => {
      console.log("Erreur: ", err)
    }) 
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
  return auth.signOut()
}
