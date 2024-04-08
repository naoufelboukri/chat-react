import React, { useEffect, useState } from 'react';
import './ChatRoomList.css';
import Tooltip from '@mui/material/Tooltip'; // Importer Tooltip de MUI
import IconButton from '@mui/material/IconButton'; // Importer IconButton de MUI
import AddIcon from '@mui/icons-material/Add'; // Importer AddIcon de MUI
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Chevron vers le bas
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Chevron vers la droite
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AddPeopleDialog from '../AddPeopleDialog/AddPeopleDialog'; // Importer le composant AddPeopleDialog

// Contexte d'authentification
import { useAuth } from '../../contexts/AuthContext';

// Firebase
import { addUsersToGroup, removeUserFromGroup } from '../../services/ChatGroup';



const ChatRoomList = ({ activeGroup, groupName, rooms, people }) => {

    const { currentUser } = useAuth();
    const [openDialog, setOpenDialog] = useState(false);

    const [isPeopleExpanded, setIsPeopleExpanded] = useState(true);
    const [isRoomsExpanded, setIsRoomsExpanded] = useState(true);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const [groupMenuAnchorEl, setGroupMenuAnchorEl] = useState(null);

    const togglePeopleList = () => {
        setIsPeopleExpanded(!isPeopleExpanded);
    };

    const toggleRoomsList = () => {
        setIsRoomsExpanded(!isRoomsExpanded);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddPeople = async (selectedUsers) => {
        try {
            // Ajouter les utilisateurs au groupe
            await addUsersToGroup(activeGroup.id, selectedUsers);

            handleCloseDialog(); // Fermer le dialogue après l'ajout

        } catch (error) {
            console.error("Erreur lors de l'ajout des utilisateurs:", error);
        }
    };

    const handleClick = (event, member) => {
        setAnchorEl(event.currentTarget);
        setSelectedPerson(member);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedPerson(null);
    };

    const handleDelete = async () => {
        console.log('Supprimer:', selectedPerson);
        await removeUserFromGroup(activeGroup.id, selectedPerson.id);
        // Ici, insérez la logique pour supprimer la personne
        handleClose(); // Fermez le menu après l'action
    };

    const handleGroupMenuClick = (event) => {
        setGroupMenuAnchorEl(event.currentTarget);
    };

    const handleGroupMenuClose = () => {
        setGroupMenuAnchorEl(null);
    };

    const handleLeaveGroup = async () => {
        console.log("Quitter le groupe:", activeGroup.name);
        await removeUserFromGroup(activeGroup.id, currentUser.uid);
        // Ici, ajoutez la logique pour retirer l'utilisateur du groupe dans votre base de données
        handleGroupMenuClose(); // Fermez le menu après l'action
    };

    return (
        <div className="chat-room-list">
            {groupName && (
                <div className="chat-room-group-name">
                    {groupName}
                    <IconButton
                        aria-label="settings"
                        aria-controls="group-menu"
                        aria-haspopup="true"
                        onClick={handleGroupMenuClick}
                        size="small"
                        sx={{
                            transform: 'rotate(90deg)', // Rotation de 90 degrés pour l'horizontal
                            marginLeft: '10px', // Ajustez selon votre mise en page
                            color: 'white', // Assurez-vous que la couleur correspond à votre thème
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </div>
            )}


            <Menu
                id="group-menu"
                anchorEl={groupMenuAnchorEl}
                keepMounted
                open={Boolean(groupMenuAnchorEl)}
                onClose={handleGroupMenuClose}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'red', // Couleur de fond du menu en rouge
                        color: 'white', // Couleur du texte
                    },
                }}
            >
                <MenuItem onClick={handleLeaveGroup}>Leave</MenuItem>
            </Menu>

            {/* Section pour les personnes */}
            <div className="chat-room-header">
                <div className="chat-room-header-content" onClick={togglePeopleList}> {/* Conteneur pour le chevron et le texte */}
                    {/* Chevron icon */}
                    {isPeopleExpanded ? <ExpandMoreIcon style={{ color: 'white' }} /> : <ChevronRightIcon style={{ color: 'white' }} />}
                    &nbsp; {/* Text and count */}
                    {/* <span>People 👤 {people.length}</span> */}
                </div>
                {/* Button "+" avec Tooltip à droite */}
                <Tooltip title="Add people">
                    <IconButton
                        className="add-people-btn"
                        onClick={handleOpenDialog} // Ouvre le dialogue
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

                <AddPeopleDialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    onAdd={handleAddPeople} // Passer la fonction en tant que prop
                />
            </div>


            {isPeopleExpanded && activeGroup && activeGroup.memberIds && activeGroup.memberIds.length > 0 && (
                <ul className="chat-room-items">
                    {activeGroup.memberIds.map((memberId, index) => (
                        <li key={index} className="chat-room-user">
                            <span className="chat-room-user-icon" style={{ backgroundColor: "#5865f2" }}>
                                {activeGroup.membersName[index].charAt(0).toUpperCase()}
                            </span>
                            <span className="chat-room-user-name">{activeGroup.membersName[index]}</span>
                            {activeGroup.createdBy === currentUser.uid && (
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => handleClick(e, {
                                        id: memberId,
                                        email: activeGroup.membersEmail[index],
                                        name: activeGroup.membersName[index]
                                    })}
                                    size="small"
                                    sx={{
                                        transform: 'rotate(90deg)', // Rotation de 90 degrés pour l'horizontal
                                        marginLeft: 'auto', // Pour pousser l'icône à droite
                                        color: 'white', // Couleur de l'icône
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            )}
                        </li>
                    ))}

                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: '#333', // Couleur de fond du menu
                                color: 'white', // Couleur du texte
                            },
                        }}
                    >
                        <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
                    </Menu>
                </ul>
            )}


            {/* Section pour les salles */}
            <div className="chat-room-header" >
                <div className="chat-room-header-content" onClick={toggleRoomsList}>
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
