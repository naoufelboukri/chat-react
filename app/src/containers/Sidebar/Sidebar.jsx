import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import Control from "./Control/Control.jsx";
import { signOut } from "../../services/Auth.jsx"
import Modal from "../Modal/Modal.jsx";
import CreateRoom from "../CreateRoom/CreateRoom.jsx";
import logo from "../../assets/logo.png";
import './Sidebar.css';

import ChatRoomList from "../../components/ChatRoomList/ChatRoomList.jsx";


const Sidebar = ({ groups, setActiveGroupIndex, activeGroupIndex }) => {
    const navigate = useNavigate();
    const [isClose, setIsClose] = useState(true);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    // Active group for detailed view in the sidebar content
    const activeGroup = groups[activeGroupIndex];

    return (
        <>
            <Modal container={CreateRoom} isVisible={modalIsVisible} close={() => setModalIsVisible(false)} />
            <aside>
                <a className={isClose ? 'collapser collapser-close' : 'collapser'} onClick={() => setIsClose(!isClose)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </a>

                <div className={isClose ? 'sidebar sidebar-close' : 'sidebar'}>
                    <div className="sidebar-header">
                        <img src={logo} alt="Logo"/>
                        <h2>Messaging</h2>
                    </div>

                    <div className="sidebar-main">
                        <div className="sidebar-controls">
                            {groups.map((group, i) => (
                                <Control
                                    key={i}
                                    room={{ name: group.name, by: group.createdBy }}
                                    active={activeGroupIndex === i}
                                    setActive={() => setActiveGroupIndex(i)}
                                />
                            ))}
                            <li className="Control Control-button" onClick={() => setModalIsVisible(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </li>
                        </div>
                        <div className="sidebar-content">
                            {activeGroup && (
                                <ChatRoomList
                                    activeGroup={activeGroup}
                                    groupName={activeGroup.name}
                                    people={activeGroup.membersName}
                                />
                            )}
                        </div>
                    </div>

                    <Link to="/" className={isClose ? 'sidebar-footer sidebar-footer-close' : 'sidebar-footer'} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} size={'2x'} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;