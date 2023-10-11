import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isLoggedIn } from "./actions/authAction";

import Dashboard from './scenes/dashboard'
import Languages from './scenes/languages'
import Material from './scenes/material'
import Player from "./scenes/player";
import AddnewLan from './scenes/addNewLan'
import Login from './scenes/login'
import Register from './scenes/register'

function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, []); 

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/material/:language" element={<Material />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/newLanguage" element={<AddnewLan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
