import { app, auth } from "../firebase/firebase"
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"

export async function register(email, username, password) {

  const exists = await usernameExists(username);
  if (exists) {
    throw new Error("Username is already taken.");
  }

  const firestore = getFirestore(); // Obtenez une référence au service Firestore

  // Créez l'utilisateur avec l'email et le mot de passe
  const userCreated = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCreated.user.uid;

  // Utilisez `doc` pour obtenir une référence à un document spécifique et `setDoc` pour créer ou mettre à jour
  await setDoc(doc(firestore, "users", uid), {
    username: username,
    email: email,
    uid: uid,
  });

  // Mise à jour du displayName dans le profil utilisateur
  await updateProfile(userCreated.user, {
    displayName: username,
  });


  // Si nécessaire, ajoutez plus de logique ici après la création de l'utilisateur et la mise à jour de Firestore
  return userCreated;
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
  return auth.signOut()
}

async function usernameExists(username) {
  const firestore = getFirestore();
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Retourne true si le username existe déjà
}