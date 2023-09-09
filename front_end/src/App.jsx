import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ViewGamePuzzle from './components/View_Game_Puzzle';
import UserMainPage from './IT21041716/scenes/userMain';
import LanguageForm from './IT21041716/scenes/newLanguage'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/games/:gameId' element={<ViewGamePuzzle/>}/>
        <Route path='/MainPage' element={<UserMainPage/>}/>
        <Route path='/addNewLanguage' element={<LanguageForm/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
