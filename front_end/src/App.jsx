import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ViewGamePuzzle from "./components/View_Game_Puzzle";
import UserMainPage from "./IT21041716/scenes/userMain";
import LanguageForm from "./IT21041716/scenes/newLanguage";
import Java from "./IT21041716/scenes/java";
import NewMaterial from "./IT21041716/scenes/addNewMaterial";
import Login from "./IT21049590/components/Login";
import Signup from "./IT21049590/components/Signup";
import UserProfile from "./IT21049590/components/UserProfile";
import UpdateUser from "./IT21049590/components/UpdateUser";
import Question from "./IT21049590/components/Questions";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/games/:gameId" element={<ViewGamePuzzle />} />
          <Route path="/MainPage" element={<UserMainPage />} />
          <Route path="/addNewLanguage" element={<LanguageForm />} />
          <Route path="/newMaterial" element={<NewMaterial />} />
          <Route path="/java" element={<Java />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userProfile/:userId" element={<UserProfile />} />
          <Route path="/updateUser/:userId" element={<UpdateUser />} />
          <Route path="/question/:userId" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
