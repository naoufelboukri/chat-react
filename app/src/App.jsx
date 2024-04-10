import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

import Messaging from "./pages/Messaging/Messaging.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import { ProtectedRoute } from './middleware/ProtectedRoute.jsx';
import { auth } from './firebase/firebase.js';
import './App.css'

function App() {
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        // OnAuthStateChanged est un listener qui écoute les changements d'état de l'utilisateur
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsFetching(false);
                return
            }
            setUser(null);
            setIsFetching(false);
        });

        return () => unsubscribe();
    }, []);

    if (isFetching) return (
        <h1>Loading...</h1>
    )

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth/>} />
                <Route path={'/messaging'} element={
                    <ProtectedRoute user={user}>
                        <Messaging user={user} />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    )
}

export default App
