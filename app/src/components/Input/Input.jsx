import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './Input.css';

const Input = ({ secure, onChange }) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const onEyeClickHandler = () => setPasswordIsVisible(!passwordIsVisible);

    const handleInputChange = (event) => {
        const value = event.target.value;
        onChange(value);
    };

    return (
        <div className="input">
            <FontAwesomeIcon icon={secure ? faLock : faUser} />
            <input
                type={secure && !passwordIsVisible ? 'password' : 'text'}
                placeholder={secure ? 'Password' : 'E-mail'}
                onChange={handleInputChange}
            />
            {secure && (
                <FontAwesomeIcon icon={passwordIsVisible ? faEyeSlash : faEye} onClick={onEyeClickHandler} />
            )}
        </div>
    );
}


export default Input;
