import React, { useState } from 'react';
import { Controller } from './components/controller/controller';

const pageCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  alignItems: 'center'
}

function App() {
  let [input, setInput] = useState('');
  let [playerName, setName] = useState(input);

  const updatePlayerName = () => {
    setName(input);
    setInput('');
  };
  const isInputEmpty = () => input.trim().length === 0;

  return (
    <div style={pageCenterStyle}>
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <h1> Snake Game </h1>
        <input value={input}
          style={{ marginBottom: '0.5rem' }}
          placeholder="Your name"
          onChange={(event) => setInput(event.target.value)} />
        <button disabled={isInputEmpty()} onClick={updatePlayerName}> Play </button>
        <Controller player={{ name: playerName }}></Controller>
      </div>
    </div>
  );
}

export default App;
