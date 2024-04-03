import { useState } from "react";

import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import AnimatedLogo from "../../containers/AnimatedLogo/AnimatedLogo.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import './Auth.css'
import { useNavigate } from "react-router-dom";

// FIREBASE
import { register, login } from '../../services/Auth';

const wording = {
    signIn: { word: 'Sign In', paragraph: "Log in to access your messaging.", router: "Don't have an account ? " },
    signUp: { word: 'Sign Up', paragraph: "Sign up for secure Messaging.", router: "Already have an account ? " },
}

function Auth() {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log("submit", email, password);
        if (email !== '' || password !== '') {
            try {
                if (signIn) {
                    await login(email, password);
                    navigate("/messaging"); // Redirection vers la page Messaging après connexion
                } else {
                    await register(email, password);
                    clearFields(); // Réinitialisation des champs après inscription
                    setSignIn(true); // Changement vers la page Sign In après inscription
                }
            } catch (error) {
                // Gérer les erreurs Firebase ici
                // Personnaliser le message d'erreur en fonction du code d'erreur
                let errorMessage = "Une erreur s'est produite lors de l'authentification.";
                if (error.code === "auth/invalid-credential") {
                    errorMessage = "Les informations d'identification fournies ne sont pas valides.";
                } else if (error.code === "auth/user-not-found") {
                    errorMessage = "Aucun utilisateur trouvé avec cet email.";
                } else if (error.code === "auth/wrong-password") {
                    errorMessage = "Le mot de passe est incorrect.";
                } else if(error.code === "auth/weak-password"){
                    errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
                } else if(error.code === "auth/email-already-in-use"){
                    errorMessage = "L'adresse e-mail est déjà utilisée par un autre compte.";
                } else if(error.code === "auth/operation-not-allowed"){
                    errorMessage = "L'authentification par e-mail et mot de passe n'est pas activée.";
                }
                // Afficher le message d'erreur personnalisé à l'utilisateur
                setErrorMessage(errorMessage);
            }
        }
    }

    return (
        <div className={'login'}>
            <div className="login-container">
                <AnimatedLogo />
                <form onSubmit={onSubmitHandler}>
                    <h2>{signIn ? wording.signIn.word : wording.signUp.word}</h2>
                    <p>{signIn ? wording.signIn.paragraph : wording.signUp.paragraph}</p>
                    <Input onChange={handleEmailChange} />
                    <Input secure onChange={handlePasswordChange} />
                    {errorMessage.length > 0 && <Alert>{errorMessage}</Alert>}
                    <Button>{signIn ? wording.signIn.word : wording.signUp.word}</Button>
                </form>
                <p className={'login-password-router'}>
                    {signIn ? wording.signIn.router : wording.signUp.router}
                    <a onClick={() => setSignIn(!signIn)}>
                        {!signIn ? wording.signIn.word : wording.signUp.word}
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Auth
