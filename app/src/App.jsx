import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

// import Auth from "./pages/Auth/Auth.jsx"
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Messaging from "./pages/Messaging/Messaging.jsx";
import MessagingTest from "./containers/MessagingTesting/MessagingTest.jsx";
import './App.css'
import { useEffect, useState } from 'react';
import { ProtectedRoute } from './middleware/ProtectedRoute.jsx';
import { auth } from './firebase/firebase.js';

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
                {/* <Route path={'/'} element={<Auth/>}/> */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path={'/messaging'} element={
                    <ProtectedRoute user={user}>
                        <Messaging />
                    </ProtectedRoute>
                } />
                <Route path={'/messagingTest'} element={<MessagingTest />} />
            </Routes>
        </Router>
    )
}

export default App
