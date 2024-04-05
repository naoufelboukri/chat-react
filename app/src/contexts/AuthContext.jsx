/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.js';

// Créer le contexte d'authentification
const AuthContext = createContext();

// Utiliser ce hook pour accéder au contexte d'authentification
export const useAuth = () => useContext(AuthContext);

// Provider qui gère l'état d'authentification
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsFetching(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, isFetching }}>
            {!isFetching && children}
        </AuthContext.Provider>
    );
};
