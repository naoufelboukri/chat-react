import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import './Alert.css';
const Alert = ({children}) =>
    <div className="Alert">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        {children}
    </div>

export default Alert;
