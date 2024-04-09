import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Message from "../../components/Message/Message.jsx";

import './Chat.css';

// Contexte d'authentification
import { useAuth } from "../../contexts/AuthContext";

// Firebase
import { addMessageToGroup, listenForMessages } from "../../services/ChatGroup.jsx";

// const mock_messages = [
//     { content: 'On doit prendre le train a 8h00', from: 'Hugues', createdAt: '11:43' },
//     { content: 'Non je dois aller chez le medecin en faite', createdAt: '11:44' },
//     { content: 'Ah mewde, bon pas grave on se voit lundi', from: 'Hugues', createdAt: '11:47' },
//     { content: 'Aller vous faire f****', from: 'Jiong', createdAt: '11:49' },
//     { content: 'wsh', createdAt: '13:21' },
// ];

const Chat = ({ group }) => {

    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const textareaRef = useRef(null);
    const hiddenTargetRef = useRef(null);

    // Fonction pour envoyer un message
    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() && group && group.id) {
            const newMessage = {
                content: message,
                from: currentUser.displayName,
                userId: currentUser.uid,
            };

            await addMessageToGroup(group.id, newMessage);
            setMessage('');
        }
    };

    useEffect(() => {
        if (group && group.id) {
            const unsubscribe = listenForMessages(group.id, setChat);
            return () => unsubscribe(); // Nettoyer en arrêtant l'écoute des messages
        }
    }, [group, setChat]);

    useEffect(() => {
        hiddenTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents the default action to ensure consistent behavior across browsers
            sendMessage(event);
        }
    };

    const messages = chat.map((message, index) => (
        <Message
            from={message.from}
            createdAt={message.createdAt} // Vous devrez peut-être formater cette date
            key={index}
        >
            {message.content}
        </Message>
    ));

    return (
        <div className="chat">
            <div className="chat-header">
                <h4>{group ? group.name : "Chat"}</h4>
            </div>
            <div className="chat-main">
                {messages}
                <div id="chat-target" ref={hiddenTargetRef} />
            </div>
            <form className="chat-footer" onSubmit={sendMessage}>
                <textarea
                    name="chat-input"
                    placeholder="Enter your message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={textareaRef}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </div>
    );
};

export default Chat;
