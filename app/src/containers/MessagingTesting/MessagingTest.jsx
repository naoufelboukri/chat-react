import React, { useEffect, useState, useContext } from 'react';
import './MessagingTest.css';
import io from 'socket.io-client';

const MessagingTest = () => {
  const [socket, setSocket] = useState(null); // État pour stocker la référence au socket

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Remplacez l'URL par celle de votre backend
    setSocket(newSocket); // Stocker la référence au socket dans l'état

    // Nettoyer lorsque le composant est démonté
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    const messageInput = document.querySelector('.chat-input input');
    const message = messageInput.value.trim();
    if (message && socket) { // Vérifier si socket est défini
      socket.emit('message', { text: message });
      messageInput.value = ''; // Effacer le champ de saisie après l'envoi
    }
  };

  return (
    <div className="MessagingTest">
      <div className="chat-input">
        <input type="text" placeholder="Tapez votre message..." />
        <button onClick={handleSendMessage}>Envoyer</button>
        {{ currentUser }}
      </div>
    </div>
  );
};

export default MessagingTest;
