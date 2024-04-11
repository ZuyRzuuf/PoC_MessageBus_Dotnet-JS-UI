import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [nestjsMessages, setNestjsMessages] = useState([]);
  const [nodejsMessages, setNodejsMessages] = useState([]);

  // useEffect(() => {
  //   const socket = io('http://localhost:8082');
  //
  //   socket.on('message', (message) => {
  //     setNestjsMessages((prevMessages) => [...prevMessages, message]);
  //   });
  //
  //   return () => {
  //     socket.off('message');
  //     socket.disconnect();
  //   };
  // }, []);
  //
  useEffect(() => {
    const nestSocket = io('http://localhost:8082');
    const nodeSocket = io('http://localhost:8083');

    nestSocket.on('nestMessage', (message) => {
      setNestjsMessages((prevMessages) => [...prevMessages, message]);
    });
    nestSocket.on('nestRedPandaMessage', (message) => {
      setNestjsMessages((prevMessages) => [...prevMessages, message]);
    });
    nestSocket.on('nestKafkaMessage', (message) => {
      setNestjsMessages((prevMessages) => [...prevMessages, message]);
    });
    nodeSocket.on('nodeMessage', (message) => {
      setNodejsMessages((prevMessages) => [...prevMessages, message]);
    });
    nodeSocket.on('nodeRedPandaMessage', (message) => {
      setNodejsMessages((prevMessages) => [...prevMessages, message]);
    });
    nodeSocket.on('nodeKafkaMessage', (message) => {
      setNodejsMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      nestSocket.off('nodeRedPandaMessage');
      nestSocket.off('nodeKafkaMessage');
      nestSocket.disconnect();
      nodeSocket.off('nodeRedPandaMessage');
      nodeSocket.off('nodeKafkaMessage');
      nodeSocket.disconnect();
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
