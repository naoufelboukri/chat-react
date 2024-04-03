import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userLoggingIn, setUserLoggingIn] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe(); // Unsubscribe from the auth state change listener when the component unmounts
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggingIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggingIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggingIn,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
