import {useState} from "react";

import Background from "../../components/Background/Background.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import AnimatedLogo from "../../components/AnimatedLogo/AnimatedLogo.jsx";
import Alert from "../../components/Alert/Alert.jsx";
import './Auth.css'
import {useNavigate} from "react-router-dom";

const wording = {
    signIn: {word: 'Sign In', paragraph: "Log in to access your messaging.", router: "Don't have an account ? "},
    signUp: {word: 'Sign Up', paragraph: "Sign up for secure Messaging.", router: "Already have an account ? "},
}

function Auth() {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        navigate('/messaging');
    }

    return (
        <div className={'login'}>
            <Background/>
            <div className="login-container">
                <AnimatedLogo/>
                <form onSubmit={onSubmitHandler}>
                    <h2>{signIn ? wording.signIn.word : wording.signUp.word}</h2>
                    <p>{signIn ? wording.signIn.paragraph : wording.signUp.paragraph}</p>
                    <Input/>
                    <Input secure/>
                    { errorMessage.length > 0 && <Alert>{errorMessage}</Alert>}
                    <Button>{signIn ? wording.signIn.word : wording.signUp.word}</Button>
                </form>
                <p className={'login-password-router'}>
                    { signIn ? wording.signIn.router : wording.signUp.router }
                    <a onClick={() => setSignIn(!signIn)}>
                        {!signIn ? wording.signIn.word : wording.signUp.word}
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Auth
