import {forwardRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './Input.css';
import {motion} from "framer-motion";

// eslint-disable-next-line react/display-name
const Input = forwardRef(({type, placeholder, fa, value, set}, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const onEyeClickHandler = () => setPasswordIsVisible(!passwordIsVisible);

    return (
        <div className="input" ref={ref}>
            <FontAwesomeIcon icon={fa} />
            <input
                type={type === 'password' && passwordIsVisible ? 'text' : type}
                placeholder={placeholder}
                value={value}
                onChange={e => set(e.target.value)}
            />
            {type === 'password' && (
                <FontAwesomeIcon icon={passwordIsVisible ? faEyeSlash : faEye} onClick={onEyeClickHandler} style={{cursor: 'pointer'}}/>
            )}
        </div>
    );
});


export default motion(Input);
