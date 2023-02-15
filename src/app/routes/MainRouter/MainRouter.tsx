import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import SignUpPage from "../../pages/authPages/SignUpPage";
import SignInPage from "../../pages/authPages/SignInPage";
import InGame from "../../pages/Game/InGame";
import Game from "../../pages/Game";
import GameCreate from "../../pages/Game/GameCreate/GameCreate";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/create" element={<GameCreate />} />
        <Route path="/game/:id" element={<InGame />} />

      </Routes>
    </>
  );
};

export default MainRouter;
