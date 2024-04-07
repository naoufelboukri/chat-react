import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Message from "../../components/Message/Message.jsx";

import './Chat.css';

const mock_messages = [
    { content: 'On doit prendre le train a 8h00', from: 'Hugues', time: '11:43' },
    { content: 'Non je dois aller chez le medecin en faite', time: '11:44' },
    { content: 'Ah mewde, bon pas grave on se voit lundi', from: 'Hugues', time: '11:47' },
    { content: 'Aller vous faire f****', from: 'Jiong', time: '11:49' },
    { content: 'wsh', time: '13:21' },
];

const Chat = () => {

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState(mock_messages);

    const messages = chat.map((message, index) => <Message from={message.from} time={message.time} key={index}>{message.content}</Message>);

    const textareaRef = useRef(null);
    const hiddenTargetRef = useRef(null);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message.trim()) { // Added trim to prevent sending empty or spaces-only messages
            setChat([...chat, { content: message, time: 'now', from: 'You' }]); // Consider adding a "from" attribute if needed
            setMessage('');
        }
    };

    useEffect(() => {
        hiddenTargetRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevents the default action to ensure consistent behavior across browsers
            sendMessage(event);
        }
    };

    return (
        <div className="chat">
            <div className="chat-header">
                <h4>ETNA</h4>
            </div>
            <div className="chat-main">
                {messages}
                <div id={'chat-target'} ref={hiddenTargetRef} />
            </div>
            <form className="chat-footer" onSubmit={sendMessage}>
                <textarea
                    name="chat-input"
                    placeholder="Enter your message"
                    value={message} // Use value prop instead of children
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
