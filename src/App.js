import React, { useState } from 'react';
import { Controller } from './components/controller/controller';

function App() {
  let [input, setInput] = useState('');
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <h1> Snake Game </h1>
        <input
          style={{ marginBottom: '0.5rem' }}
          placeholder="Your name"
          onChange={(event) => setInput(event.target.value)} />
        <button disabled={input.trim().length === 0}> Play </button>
        <Controller></Controller>
      </div>
    </div>
  );
}

export default App;
