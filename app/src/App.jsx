import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

// import Auth from "./pages/Auth/Auth.jsx"
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Messaging from "./pages/Messaging/Messaging.jsx";
import MessagingTest from "./containers/MessagingTesting/MessagingTest.jsx";
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path={'/'} element={<Auth/>}/> */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path={'/messaging'} element={<Messaging />} />
                <Route path={'/messagingTest'} element={<MessagingTest />} />
            </Routes>
        </Router>
    )
}

export default App
