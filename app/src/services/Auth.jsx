import { auth } from '../firebase/firebase';

export async function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export async function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export async function signOut() {
    return auth.signOut();
}