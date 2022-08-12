import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Rentals from './pages/Rentals/Rentals';
import SingleRental from "./pages/Single-Rentals/SingleRental"
import './App.css';

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path='/rentals/:id' element={<SingleRental/>}/>
    </Routes>
  )
};

export default App;
