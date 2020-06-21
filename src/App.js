import React, { useState } from 'react';
import { Controller } from './components/controller/controller';
import { Toggle } from './components/common/toggle';

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
  const updateNameOnEnterKey = (event) => {
    if (event.key === 'Enter') {
      updatePlayerName();
    }
  }
  const isInputEmpty = () => input.trim().length < 1;
  const isPlayerNameEmpty = () => playerName.trim().length < 1;

  return (
    <div style={pageCenterStyle}>
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <h1> Snake Game </h1>
        <Toggle state={isPlayerNameEmpty()}>
          <input value={input}
            style={{ marginBottom: '0.5rem' }}
            placeholder="Your name"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={updateNameOnEnterKey} />
          <button disabled={isInputEmpty()} onClick={updatePlayerName}> Play </button>
        </Toggle>
        <Toggle state={!isPlayerNameEmpty()}>
          <Controller player={{ name: playerName }}></Controller>
        </Toggle>
      </div>
    </div>
  );
}

export default App;
