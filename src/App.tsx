import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./app/routes/MainRouter";
import { UserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";

function App() {
  const userContext = useContext(UserContext)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  useEffect(() => {
    if(userContext?.user !== undefined){
      setIsLoaded(true)
    }
  }, [userContext?.user])
  return (
    <BrowserRouter>
    {isLoaded && 
      <MainRouter />
    }
    </BrowserRouter>
  );
}

export default App;
