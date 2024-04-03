import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";

import Control from "./Control/Control.jsx";

import './Sidebar.css';
import Messages from "./Messages/Messages.jsx";
import Users from "./Users/Users.jsx";
import {Link} from "react-router-dom";

const Sidebar = () => {

    const [isClose, setIsClose] = useState(true);
    const [index, setIndex] = useState(0);

    return (
        <aside>
            <a className={isClose ? 'collapser collapser-close' : 'collapser'} onClick={() => setIsClose(!isClose)}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </a>

            <div className={isClose ? 'sidebar sidebar-close' : 'sidebar'}>
                <div className="sidebar-header">
                    <img src={'/logo.png'}/>
                    <h2>Messaging</h2>
                </div>

                <div className="sidebar-main">
                    <div className="sidebar-controls">
                        <Control image={faComments} active={index === 0} setActive={() => setIndex(0)}/>
                        <Control image={faUsers} active={index === 1} setActive={() => setIndex(1)}/>
                    </div>
                    <div className="sidebar-content">
                        { index === 0 && <Messages/> }
                        { index === 1 && <Users/> }
                    </div>
                </div>

                <Link to={'/'} className={isClose ? 'sidebar-footer sidebar-footer-close' : 'sidebar-footer'}>
                    <FontAwesomeIcon icon={faRightFromBracket} size={'2x'}/>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar;
