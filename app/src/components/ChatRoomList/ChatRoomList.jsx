import React, { useState } from 'react';
import './ChatRoomList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ChatRoomList = ({ groupName, rooms, people }) => {
    const [isRoomsExpanded, setIsRoomsExpanded] = useState(true);
    const [isPeopleExpanded, setIsPeopleExpanded] = useState(true);

    const toggleRoomsList = () => {
        setIsRoomsExpanded(!isRoomsExpanded);
    };

    const togglePeopleList = () => {
        setIsPeopleExpanded(!isPeopleExpanded);
    };

    return (
        <div className="chat-room-list">
            {groupName && <div className="chat-room-group-name">{groupName}</div>}

            {/* Section pour les personnes */}
            <div className="chat-room-header" onClick={togglePeopleList}>
                <span>People 👤 {people.length}</span>
                <FontAwesomeIcon icon={isPeopleExpanded ? faChevronDown : faChevronRight} />
            </div>
            {isPeopleExpanded && people && people.length > 0 && (
                <ul className="chat-room-items">
                    {people.map((person, index) => (
                        <li key={index} className="chat-room-user">
                            <span className="chat-room-user-icon" style={{ backgroundColor: "#5865f2" }}> {/* Mettez ici la couleur de fond de votre choix */}
                                {person.charAt(0).toUpperCase()} {/* Affiche la première lettre du nom */}
                            </span>
                            <span className="chat-room-user-name">{person}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Section pour les salles */}
            <div className="chat-room-header" onClick={toggleRoomsList}>
                <span>Rooms</span>
                <FontAwesomeIcon icon={isRoomsExpanded ? faChevronDown : faChevronRight} />
            </div>
            {isRoomsExpanded && rooms && rooms.length > 0 && (
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
