import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import SignUpPage from "../../pages/authPages/SignUpPage";
import SignInPage from "../../pages/authPages/SignInPage";
import Game from "../../pages/Game";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
};

export default MainRouter;
