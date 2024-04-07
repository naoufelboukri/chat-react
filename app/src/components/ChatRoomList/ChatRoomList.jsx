import React, { useState } from 'react';
import './ChatRoomList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ChatRoomList = ({ groupName, name, rooms }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleList = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="chat-room-list">
            {groupName && <div className="chat-room-group-name">{groupName}</div>} {/* Ajout du nom du groupe ici */}
            <div className="chat-room-header" onClick={toggleList}>
                <span>{name}</span> {/* Utilisation du prop name ici */}
                <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />
            </div>
            {isExpanded && (
                <ul className="chat-room-items">
                    {rooms.map((room, index) => (
                        <li key={index} className="chat-room-item">
                            <span className="chat-room-icon" style={{ backgroundColor: room.color }}>
                                {room.name.charAt(0)}
                            </span>
                            <span className="chat-room-name">{room.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatRoomList;
