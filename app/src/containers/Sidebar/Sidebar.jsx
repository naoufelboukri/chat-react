import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import Control from "./Control/Control.jsx";
import { signOut } from "../../services/Auth.jsx"
import Modal from "../Modal/Modal.jsx";
import CreateRoom from "../CreateRoom/CreateRoom.jsx";
import './Sidebar.css';

import ChatRoomList from "../../components/ChatRoomList/ChatRoomList.jsx";


const Sidebar = ({ groups }) => {
    const navigate = useNavigate();
    const [isClose, setIsClose] = useState(true);
    const [index, setIndex] = useState(0); // Index du groupe actif
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(); // Appelle la fonction signOut importée
            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    // Utilisez l'état 'index' pour déterminer quel groupe est actuellement sélectionné
    const activeGroup = groups[index];

    const rooms = groups.map((group, i) => (
        <Control
            room={{ name: group.name, by: group.createdBy }} // Adaptez selon la structure de vos données
            active={index === i}
            setActive={() => setIndex(i)}
            key={i}
        />
    ));

    return (
        <>
            <Modal container={CreateRoom} isVisible={modalIsVisible} close={() => setModalIsVisible(false)} />
            <aside>
                <a className={isClose ? 'collapser collapser-close' : 'collapser'} onClick={() => setIsClose(!isClose)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </a>

                <div className={isClose ? 'sidebar sidebar-close' : 'sidebar'}>
                    <div className="sidebar-header">
                        <img src={'/logo.png'} alt="Logo" />
                        <h2>Messaging</h2>
                    </div>

                    <div className="sidebar-main">
                        <div className="sidebar-controls">
                            {rooms}
                            <li className="Control Control-button" onClick={() => setModalIsVisible(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </li>
                        </div>
                        <div className="sidebar-content">

                            {activeGroup && (
                                <ChatRoomList activeGroup={activeGroup} groupName={activeGroup.name} people={activeGroup.membersName} />
                            )}
                        </div>
                    </div>

                    <Link to="/login" className={isClose ? 'sidebar-footer sidebar-footer-close' : 'sidebar-footer'} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} size={'2x'} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
