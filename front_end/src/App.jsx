import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ViewGamePuzzle from './components/View_Game_Puzzle';

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/games/:gameId' element={<ViewGamePuzzle/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
