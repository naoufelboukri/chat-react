import './Modal.css';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Modal = ({container: Container, isVisible, close}) =>
    <div className={isVisible ? 'modal modal-visible' : 'modal'}>
        <div className="modal-content">
            <FontAwesomeIcon icon={faXmark} className={'modal-close'} onClick={close}/>
            <Container/>
        </div>
    </div>

export default Modal;
