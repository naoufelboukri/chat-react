import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleLeft, faPlus, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Control from "./Control/Control.jsx";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/Auth.jsx"
import Modal from "../Modal/Modal.jsx";
import CreateRoom from "../CreateRoom/CreateRoom.jsx";
import './Sidebar.css';

const mock_rooms = [
    {name: 'Naoufel', by: 'naoufel'},
    {name: 'Abdou', by: 'abdou'},
];

const Sidebar = () => {

    const navigate = useNavigate();
    const [isClose, setIsClose] = useState(true);
    const [index, setIndex] = useState(0);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(); // Appelle la fonction signOut importée
            navigate("/login")
            // Rediriger l'utilisateur après la déconnexion, si nécessaire
            // par exemple: history.push('/login');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    const rooms = mock_rooms.map((room, i) => <Control room={room} active={index === i} setActive={() => setIndex(i)} key={i}/>);

    return (
        <>
            <Modal container={CreateRoom} isVisible={modalIsVisible} close={() => setModalIsVisible(false)}/>
            <aside>
                <a className={isClose ? 'collapser collapser-close' : 'collapser'} onClick={() => setIsClose(!isClose)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </a>

                <div className={isClose ? 'sidebar sidebar-close' : 'sidebar'}>
                    <div className="sidebar-header">
                        <img src={'/logo.png'} />
                        <h2>Messaging</h2>
                    </div>

                    <div className="sidebar-main">
                        <div className="sidebar-controls">
                            {rooms}
                            <li className="Control Control-button" onClick={() => setModalIsVisible(true)}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </li>
                        </div>
                        <div className="sidebar-content">

                        </div>
                    </div>

                    <Link className={isClose ? 'sidebar-footer sidebar-footer-close' : 'sidebar-footer'} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} size={'2x'} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;
