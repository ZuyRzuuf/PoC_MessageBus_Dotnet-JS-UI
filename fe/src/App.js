import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [nestjsMessages, setNestjsMessages] = useState([]);
  const [nodejsMessages, setNodejsMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:8082');

    socket.on('message', (message) => {
      setNestjsMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:8083');

    socket.on('message', (message) => {
      setNodejsMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  return (
      <div className="App">
        <div>
          <h2>Messages from NestApp:</h2>
          <ul>
            {nestjsMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Messages from NodeApp:</h2>
          <ul>
            {nodejsMessages.map((msg, index) => (
                <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;
