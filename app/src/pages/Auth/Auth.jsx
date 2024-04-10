import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {motion, useAnimation} from 'framer-motion';

import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import AnimatedLogo from "../../components/AnimatedLogo/AnimatedLogo.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import './Auth.css'

// FIREBASE
import { register, login } from '../../services/Auth';
import {faEnvelope, faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import {getErrorMessage} from "../../firebase/errorMessageFireBase.js";

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
    const [username, setUsername] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const variants = {
        hidden: {height: 0, opacity: 0, transition: {duration: .5}},
        visible: {height: 'auto', opacity: 1},
    };

    const clearFields = () => {
        setEmail("");
        setPassword("");
    };

    const auth = async () => {
        try {
            setLoading(true);
            const response = signIn ? await login(email, password) : await register(email, username, password);
            if (response) {
                clearFields()
                navigate('/messaging');
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
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (signIn && (email === '' || password === '')) {
            setErrorMessage('Please fill all fields correctly');
        } else if (!signIn && (username === '' || password === '' || email === '' || password2 === '')) {
            setErrorMessage('Please fill all fields correctly');
        } else if (!signIn && password !== password2) {
            setErrorMessage('Passwords must be identical');
        } else {
            await auth();
        }
    }

    return (
        <div className={'auth'}>
            <div className="auth-container">
                <AnimatedLogo />
                <form onSubmit={onSubmitHandler}>
                    <h2>{signIn ? wording.signIn.word : wording.signUp.word}</h2>
                    <p>{signIn ? wording.signIn.paragraph : wording.signUp.paragraph}</p>
                    <Input value={email} type={'email'} placeholder={'Email'} fa={faEnvelope} set={email => setEmail(email)}/>
                    <Input
                        animate={signIn ? 'hidden' : 'visible'}
                        variants={variants}
                        value={username} type={'text'} placeholder={'Username'} fa={faUser} set={username => setUsername(username)}/>
                    <Input value={password} type={'password'} placeholder={'Password'} fa={faLock} set={password => setPassword(password)}/>
                    <Input
                        animate={signIn ? 'hidden' : 'visible'}
                        variants={variants}
                        value={password2} type={'password'} placeholder={'Confirm password'} fa={faLock} set={password2 => setPassword2(password2)}/>
                    {errorMessage.length > 0 && <Alert>{errorMessage}</Alert>}
                    <Button>
                        {
                            loading ?
                                <ReactLoading type={'bubbles'} color={'#fff'} height={30} width={30} className={'loader'}/> :
                                signIn ? wording.signIn.word : wording.signUp.word
                        }
                    </Button>
                </form>
                <p className={'auth-password-router'}>
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
