import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//sithanga
import VedioPlayer from "./IT21041716/scenes/vedioPlayer";
import Home from './IT21041716/scenes/staticPages/home'
import Learning from './IT21041716/scenes/staticPages/learning'
import LanguageSpec from './IT21041716/scenes/staticPages/specificLanguage'


import Login from "./IT21049590/components/Login";
import Signup from "./IT21049590/components/Signup";
import UserProfile from "./IT21049590/components/UserProfile";
import UpdateUser from "./IT21049590/components/UpdateUser";
import Question from "./IT21049590/components/Questions";
import AddQuestion from "./IT21049590/components/AddQuestion";
import AddQuestionDialog from "./IT21049590/components/AddQuestionDialog";
import ViewAllQuestions from "./IT21049590/components/ViewAllQuestions";

import AddGamePluzzle from "./components/Add_Game_Puzzle";
import AdminViewGamePuzzle from "./components/Admin_View_Game_Puzzle";
import Game_Puzzle_List from "./components/Game_Puzzle_List";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/content" element={<LanguageSpec />} />
          <Route path="/player/:id" element={<VedioPlayer />} />

          {/* end sithanga */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userProfile/:userId" element={<UserProfile />} />
          <Route path="/updateUser/:userId" element={<UpdateUser />} />
          <Route path="/question/:userId" element={<Question />} />
          <Route path="/addQuestion/:userId" element={<AddQuestion />} />
          <Route path="/addQuestionDialog" element={<AddQuestionDialog />} />
          <Route
            path="/viewAllQuestions/:userId"
            element={<ViewAllQuestions />}
          />

          <Route path="/games/add" element={<AddGamePluzzle />} />
          <Route path="/games/admin/view" element={<AdminViewGamePuzzle />} />
          <Route path="/games/list/:id" element={<Game_Puzzle_List />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
