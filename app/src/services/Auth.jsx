import { auth } from '../firebase/firebase';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export async function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
    return auth.signOut();
}