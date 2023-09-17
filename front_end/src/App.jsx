import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ViewGamePuzzle from './components/View_Game_Puzzle';


//sithanga
import UserMainPage from './IT21041716/scenes/userMain';
import LanguageForm from './IT21041716/scenes/newLanguage'
import Language from './IT21041716/scenes/singleLanguage'
import NewMaterial from './IT21041716/scenes/addNewMaterial'
import VedioPlayer from './IT21041716/scenes/vedioPlayer'


import Layout from './IT21041716/scenes/dashboard/index'
import NewLanguage from './IT21041716/scenes/dashboard/newLanguage'


function App() {


  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path='/games/:gameId' element={<ViewGamePuzzle />} />

          {/* sithanga  */}
          <Route path='/' element={<UserMainPage />} />
         
          <Route path='/language/:id' element={<Language />} />
          <Route path='/player/:id' element={<VedioPlayer />} />


          {/* dashboard */}
          <Route  element= {<Layout/>}>
            <Route path='/Add New Language' element= {<LanguageForm/>} />
            <Route path='/Add New Material' element={<NewMaterial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
