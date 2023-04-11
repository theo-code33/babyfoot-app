import { Route, Routes } from "react-router-dom";
import SignUpPage from "../../pages/authPages/SignUpPage";
import SignInPage from "../../pages/authPages/SignInPage";
import InGame from "../../pages/Game/InGame";
import Game from "../../pages/Game";
import GameCreate from "../../pages/Game/GameCreate/GameCreate";
import GameSelectPlayer from "../../pages/Game/GameStart/GameSelectPlayer";
import GameStartPanel from "../../components/game/admin/GameStartPanel";
import Qrcode from "../../components/Qrcode/Qrcode";
import GameResult from "../../pages/Game/GameResult";
import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
// import UserProfile from "../../pages/user/UserProfile";

const MainRouter = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/:id" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signin/:id" element={<SignInPage />} />
        <Route path="/game" element={<ProtectedRoute user={userContext?.user}>
          <Game />
        </ProtectedRoute>} />
        <Route path="/game/create" element={<ProtectedRoute user={userContext?.user}>
          <GameCreate />
        </ProtectedRoute>} />
        <Route path="/game/:id/start-game" element={<ProtectedRoute user={userContext?.user}>
          <GameStartPanel />
        </ProtectedRoute>} />
        <Route path="/game/:id/end-game/" element={<ProtectedRoute user={userContext?.user}>
          <GameResult />
        </ProtectedRoute>} />
        <Route path="/game/:id" element={<ProtectedRoute user={userContext?.user}>
          <InGame />
        </ProtectedRoute>} />
        <Route path="/game/:id/select-player" element={<ProtectedRoute user={userContext?.user}>
          <GameSelectPlayer />
        </ProtectedRoute>} />
        <Route path="/qr-code/:id" element={<Qrcode />} />
        {/* <Route path="/user/profile" element={<UserProfile />} /> */}
      </Routes>
    </>
  );
};

export default MainRouter;
