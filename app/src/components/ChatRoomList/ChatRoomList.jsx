import React, { useState } from 'react';
import './ChatRoomList.css';
import Tooltip from '@mui/material/Tooltip'; // Importer Tooltip de MUI
import IconButton from '@mui/material/IconButton'; // Importer IconButton de MUI
import AddIcon from '@mui/icons-material/Add'; // Importer AddIcon de MUI
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Chevron vers le bas
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Chevron vers la droite


const ChatRoomList = ({ groupName, rooms, people }) => {
    const [isPeopleExpanded, setIsPeopleExpanded] = useState(true);
    const [isRoomsExpanded, setIsRoomsExpanded] = useState(true);

    const togglePeopleList = () => {
        setIsPeopleExpanded(!isPeopleExpanded);
    };

    const toggleRoomsList = () => {
        setIsRoomsExpanded(!isRoomsExpanded);
    };

    return (
        <div className="chat-room-list">
            {groupName && <div className="chat-room-group-name">{groupName}</div>}

            {/* Section pour les personnes */}
            <div className="chat-room-header" onClick={togglePeopleList}>
                <div className="chat-room-header-content"> {/* Conteneur pour le chevron et le texte */}
                    {/* Chevron icon */}
                    {isPeopleExpanded ? <ExpandMoreIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
                    &nbsp; {/* Text and count */}
                    <span>People 👤 {people.length}</span>
                </div>
                {/* Button "+" avec Tooltip à droite */}
                <Tooltip title="Add people">
                    <IconButton
                        className="add-people-btn"
                        onClick={(e) => {
                            e.stopPropagation(); // Empêche toggleRoomsList lors du clic sur le bouton
                            console.log("Add people");
                        }}
                        size="large"
                        sx={{
                            color: 'white', // Couleur de l'icône
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Couleur de fond au survol
                            },
                        }}
                    >
                        <AddIcon style={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </div>


            {isPeopleExpanded && people && people.length > 0 && (
                <ul className="chat-room-items">
                    {people.map((person, index) => (
                        <li key={index} className="chat-room-user"> {/* Utilisation de person.id pour la clé */}
                            <span className="chat-room-user-icon" style={{ backgroundColor: "#5865f2" }}>
                                {person.name.charAt(0).toUpperCase()} {/* Affiche la première lettre du nom */}
                            </span>
                            <span className="chat-room-user-name">{person.name}</span>
                        </li>
                    ))}
                </ul>
            )}


            {/* Section pour les salles */}
            <div className="chat-room-header" onClick={toggleRoomsList}>
                <div className="chat-room-header-content">
                    {isRoomsExpanded ? <ExpandMoreIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
                    &nbsp;
                    <span>Rooms</span>
                </div>
                <Tooltip title="Add room">
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Add room");
                        }}
                        size="large"
                        sx={{
                            color: 'white', // Couleur de l'icône
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Couleur de fond au survol
                            },
                        }}
                    >
                        <AddIcon style={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
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
