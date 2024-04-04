import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './Input.css';

const Input = ({type, placeholder, fa}) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const onEyeClickHandler = () => setPasswordIsVisible(!passwordIsVisible);

    return (
        <div className="input">
            <FontAwesomeIcon icon={fa} />
            <input
                type={type}
                placeholder={placeholder}
            />
            {type === 'password' && (
                <FontAwesomeIcon icon={passwordIsVisible ? faEyeSlash : faEye} onClick={onEyeClickHandler} />
            )}
        </div>
    );
}


export default Input;
