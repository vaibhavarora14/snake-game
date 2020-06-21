import React, { useState } from 'react';
import { Controller } from './components/controller/controller';
import { Toggle } from './components/common/toggle';
import { pageCenterStyle, snakeGameOuterStyle } from './App.style';

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
      <div style={{ ...snakeGameOuterStyle, maxHeight: (window.innerHeight - 100) }}>
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
          <Controller player={{ name: playerName }} style={{ maxHeight: (window.innerHeight - 100) }}></Controller>
        </Toggle>
      </div>
    </div >
  );
}

export default App;
