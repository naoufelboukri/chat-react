import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import AnimatedLogo from "../../components/AnimatedLogo/AnimatedLogo.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import './Register.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading';

// FIREBASE
import { register } from '../../services/Auth';
import { getErrorMessage } from '../../firebase/errorMessageFireBase';

function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const onEyeClickHandler = () => setPasswordIsVisible(!passwordIsVisible);

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
    };

    const clearFields = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (email !== '' && username != '' && password !== '' && confirmPassword !== '' && password === confirmPassword) {
            try {
                setLoading(true);
                const response = await register(email, username, password);
                console.log("response", response);
                if (response) {
                    clearFields();
                    navigate("/messaging"); // Redirection vers la page Messaging après connexion
                }
            } catch (error) {
                // Gérer les erreurs Firebase ici
                const errorMessage = getErrorMessage(error.code);
                // Afficher le message d'erreur personnalisé à l'utilisateur
                setErrorMessage(errorMessage);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        } else {
            setErrorMessage("Please fill all fields correctly.");
        }
    }

    return (
        <div className={'login'}>
            <div className="login-container">
                <AnimatedLogo />
                <form onSubmit={onSubmitHandler}>
                    <h2>Sign Up</h2>
                    <p>Sign up for secure Messaging</p>

                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input
                            type={'text'}
                            placeholder={'E-mail'}
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <FontAwesomeIcon icon={faUser} />
                        <input
                            type={'text'}
                            placeholder={'Username'}
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                        />
                    </div>

                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input
                            type={!passwordIsVisible ? 'password' : 'text'}
                            placeholder={'Password'}
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <FontAwesomeIcon icon={passwordIsVisible ? faEyeSlash : faEye} onClick={onEyeClickHandler} />
                    </div>

                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input
                            type={!passwordIsVisible ? 'password' : 'text'}
                            placeholder={'Confirm Password'}
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        />
                        <FontAwesomeIcon icon={passwordIsVisible ? faEyeSlash : faEye} onClick={onEyeClickHandler} />
                    </div>

                    {errorMessage.length > 0 && <Alert>{errorMessage}</Alert>}
                    <Button disabled={loading}>
                        {loading ? <ReactLoading type="bars" color="#fff" height={40} width={40} /> : 'Sign Up'}
                    </Button>
                </form>
                <p className={'login-password-router'}>
                    Already have an account ? &nbsp;
                    <a onClick={() => navigate("/login")}>
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Register;
