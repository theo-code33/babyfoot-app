import React, { useEffect } from "react";
import { signUp } from "./services/auth/auth.service";

function App() {
  const user = {
    username: "patapouf",
    password: "test33",
    email: "dfsgb@gmail.com",
    cover: null,
  };

  const handleClick = (): void => {
    signUp(user);
  };

  const handleImage = (e: any): void => {
    const file = e.target.files[0];
    user.cover = file;
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleClick}>Click me</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="file" name="file" id="file" onInput={handleImage} />
      </header>
    </div>
  );
}

export default App;
