import { app, auth } from "../firebase/firebase"
import { getFirestore, collection, setDoc, doc } from "firebase/firestore"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"

export async function register(email, username, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCreated) => {
      const uid = userCreated.user.uid
      const firestore = getFirestore(app)


      // Utilisez `doc` pour obtenir une référence à un document spécifique et `setDoc` pour créer ou mettre à jour
      return setDoc(doc(firestore, "users", uid), {
        username: username,
        email: email,
      });
    })
    .then(() => {
      console.log("Données utilisateur stockées avec succès !")
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
