import React from "react";
import './App.css';
import AddVehicleBooking from "./components/AddVehicleBooking";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminVehicle from "./components/AdminVehicle";
import EditVehicleBooking from "./components/EditVehicleBooking";
import VehicleList from "./components/vehicleList";
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';


function App() {
  return (
    
    <Router>
        <Navbar/>
      <Routes>
        
        <Route path='' exact element={<Home/>}/>
        <Route path="/vehicleList" element={<VehicleList/>} />
        <Route path="/update/:id" element={<EditVehicleBooking/>} />
        <Route path="/add" element={<AddVehicleBooking/>} />
        <Route path="/adminVehicle" element={<AdminVehicle/>} />


      </Routes>
    </Router>
   
  );
}
export default App;