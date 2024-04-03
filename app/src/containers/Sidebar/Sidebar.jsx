import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";

import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import './Sidebar.css';

const Sidebar = () => {

    const [isClose, setIsClose] = useState(true);
    const [index, setIndex] = useState(0);

    return (
        <aside>
            <a className={'sidebar-collapser'} onClick={() => setIsClose(!isClose)}>
                <FontAwesomeIcon icon={faAngleLeft}/>
            </a>

            <div className="sidebar-header">
                <img src={'/logo.png'}/>
                <h2>Messaging</h2>
            </div>

            <div className="sidebar-main">
                <ul className="sidebar-control">
                    <li className={index === 0 ? 'sidebar-control-item active' : 'sidebar-control-item'} onClick={() => setIndex(0)}>
                        <FontAwesomeIcon icon={faUsers} size={'2x'}/>
                    </li>
                    <li className={index === 1 ? 'sidebar-control-item active' : 'sidebar-control-item'} onClick={() => setIndex(1)}>
                        <FontAwesomeIcon icon={faComments} size={'2x'}/>
                    </li>
                </ul>
                <div className="sidebar-content">
                    <SearchBar/>
                </div>
            </div>
        </aside>
    )
}


export default Sidebar;
