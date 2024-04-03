import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import './Input.css';

const Input = ({ secure }) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const onEyeClickHandler = () => setPasswordIsVisible(!passwordIsVisible);

    return (
        <div className="input">
            <FontAwesomeIcon icon={secure ? faLock : faUser}/>
            <input
                type={secure && !passwordIsVisible ? 'password' : 'text'}
                placeholder={secure ? 'Password' : 'Username'}
            />
            {secure && (
                <FontAwesomeIcon icon={passwordIsVisible ? faEyeSlash : faEye} onClick={onEyeClickHandler}/>
            )}
        </div>
    );
}


export default Input;
