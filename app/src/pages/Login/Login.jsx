import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import AnimatedLogo from "../../components/AnimatedLogo/AnimatedLogo.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from 'react-loading';

// FIREBASE
import { login } from '../../services/Auth';
import { getErrorMessage } from '../../firebase/errorMessageFireBase';


function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const onEyeClickHandler = () => setPasswordIsVisible(!passwordIsVisible);

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const clearFields = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (email !== '' || password !== '') {
            try {
                setLoading(true);
                const response = await login(email, password);
                console.log("response", response.user);

                clearFields();
                navigate("/messaging"); // Redirection vers la page Messaging après connexion
            } catch (error) {
                // Gérer les erreurs Firebase ici
                // Personnaliser le message d'erreur en fonction du code d'erreur
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
                    <h2>Sign In</h2>
                    <p>Log in to access your messaging</p>

                    <div className="input">
                        <FontAwesomeIcon icon={faUser} />
                        <input
                            type={'text'}
                            placeholder={'E-mail'}
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
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

                    {errorMessage.length > 0 && <Alert>{errorMessage}</Alert>}
                    <Button disabled={loading}>
                        {loading ? <ReactLoading type="bars" color="#fff" height={40} width={40} /> : 'Sign In'}
                    </Button>
                </form>
                <p className={'login-password-router'}>
                    Don&apos;t have an account ? &nbsp;
                    <a onClick={() => navigate("/register")}>
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
