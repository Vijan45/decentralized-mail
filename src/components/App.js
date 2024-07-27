import React from 'react';
import SendMessage from './components/SendMessage';
import Inbox from './components/Inbox';

const App = () => {
    return (
        <div className="App">
            <h1>Decentralized Mail System</h1>
            <SendMessage />
            <Inbox />
        </div>
    );
};

export default App;
