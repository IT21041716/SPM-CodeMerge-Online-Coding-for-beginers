import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//sithanga
import UserMainPage from "./IT21041716/scenes/userMain";
import LanguageForm from "./IT21041716/scenes/newLanguage";
import Language from "./IT21041716/scenes/singleLanguage";
import NewMaterial from "./IT21041716/scenes/addNewMaterial";
import VedioPlayer from "./IT21041716/scenes/vedioPlayer";
import Layout from "./IT21041716/scenes/dashboard/index";

import ViewGamePuzzle from "./components/View_Game_Puzzle";
import Login from "./IT21049590/components/Login";
import Signup from "./IT21049590/components/Signup";
import UserProfile from "./IT21049590/components/UserProfile";
import UpdateUser from "./IT21049590/components/UpdateUser";
import Question from "./IT21049590/components/Questions";
import AddQuestion from "./IT21049590/components/AddQuestion";
import AddQuestionDialog from "./IT21049590/components/AddQuestionDialog";
import ViewAllQuestions from "./IT21049590/components/ViewAllQuestions";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/games/:gameId" element={<ViewGamePuzzle />} />

          {/* sithanga  */}
          <Route path="/languageMain" element={<UserMainPage />} />
          <Route path="/language/:id" element={<Language />} />
          <Route path="/player/:id" element={<VedioPlayer />} />
          {/* dashboard */}
          <Route element={<Layout />}>
            <Route path="/Add New Language" element={<LanguageForm />} />
            <Route path="/Add New Material" element={<NewMaterial />} />
          </Route>

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
