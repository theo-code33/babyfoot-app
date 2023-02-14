import React, { useEffect } from 'react';
import { signUp } from './services/auth/auth.service';

function App() {

  const user = {
    uid: '',
    username: 'test',
    password: 'test33',
    email: 'gittheo1@gmail.com'
  }

  const handleClick = () => {
    signUp(user)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleClick}>
          Click me
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
