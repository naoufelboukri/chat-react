import { useState, useEffect } from "react";

import './Messaging.css';
import Sidebar from "../../containers/Sidebar/Sidebar.jsx";
import Chat from "../../containers/Chat/Chat.jsx";


// Service firebase
import { listenForGroupsByUserId } from "../../services/ChatGroup.jsx";

// Context
import { useAuth } from "../../contexts/AuthContext";

const Messaging = () => {
    const { currentUser } = useAuth();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        let unsubscribe;

        if (currentUser && currentUser.uid) {
            // Commencez à écouter les groupes associés à l'userID
            unsubscribe = listenForGroupsByUserId(currentUser.uid, setGroups);
        }

        // Fonction de nettoyage pour arrêter l'écoute lors du démontage du composant
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentUser]);

    return (
        <div className="Messaging">
            <Sidebar groups={groups}/>
            <Chat />
        </div>
    )
}

export default Messaging;
