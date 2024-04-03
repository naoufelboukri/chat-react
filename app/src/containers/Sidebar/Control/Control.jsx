import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './Control.css';

const Control = ({ image, active, setActive }) => {

    return (
        <li className={active ? 'Control Control-active' : 'Control'} onClick={setActive}>
            <FontAwesomeIcon icon={image} size={'2x'}/>
        </li>
    );
}

export default Control;
