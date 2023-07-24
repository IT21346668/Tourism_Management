import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.css";
import car1 from '../Images/car1.jpg';
import car2 from '../Images/car2.jpg';
import car3 from '../Images/car3.jpg';
import car4 from '../Images/car4.jpg';
import car5 from '../Images/car5.jpg';
import car6 from '../Images/car6.jpg';
import car7 from '../Images/car7.jpg';
import car8 from '../Images/car8.jpg';
import car9 from '../Images/car9.jpg';
import bike1 from '../Images/bike1.jpg';
import threewheel1 from '../Images/threewheel1.jpg';
import van1 from '../Images/van1.jpg';
import van2 from '../Images/van2.jpg';
import '../Style/vehicleList.css';
import '../Style/search.css';

function VehicleList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const vehicles = [
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      image: car1,
      description: 'A sleek and reliable sedan thats perfect for commuting or road trips. A sleek and reliable.',
      drivername: 'Rashmika Bandara',
      driverphone: +9489034670,
      price: '$5',
    },
    {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      image: car2,
      description: 'A sporty and stylish coupe thats fun to drive and easy on gas.A sporty and stylish coupe.',
      drivername: 'Darshana Kalana Kumara',
      driverphone: +9489087325,
      price: '$5',
    },
    {
      make: 'Ford',
      model: 'F-150',
      year: 2021,
      image: car3,
      description: 'A rugged and powerful pickup truck thats built to handle tough jobs. Rugged and powerful pickup truck ',
      drivername: 'Sandaml priyankara',
      driverphone: +948905890,
      price: '$5',
    },
    {
      make: 'Maruti Suzuki',
      model: 'Wagonr',
      year: 2022,
      image: car4,
      description: 'A practical and efficient hatchback car that is perfect for city driving and commuting.',
      drivername: 'John Doe',
      driverphone: '+1 555-555-5555',
      price: '$5',
    },
    {
      make: 'Honda',
      model: 'Vezel',
      year: 2022,
      image: car5,
      description: 'A stylish and versatile crossover SUV that is perfect for both city and highway driving.',
      drivername: 'Jane Smith',
      driverphone: '+1 555-555-5555',
      price: '$5',
    },
    {
      make: 'Toyota',
      model: 'Aqua',
      year: 2022,
      image: car6,
      description: 'A fuel-efficient hybrid car that is perfect for eco-conscious drivers and city commuting.',
      drivername: 'David Lee',
      driverphone: '+1 555-555-5555',
      price: '$5',
    },
    {
      make: 'BMW',
      model: 'X5',
      year: 2023,
      image: car7,
      description: 'A luxury SUV that combines high-performance with comfort and elegance.',
      drivername: 'Samantha Brown',
      driverphone: '+1 555-555-5555',
      price: '$5',
    },
    {
        make: 'Toyota',
        model: 'C-HR',
        year: 2022,
        image: car8,
        description: 'A sleek and sporty crossover SUV that is both stylish and practical.That is both stylish and practical.',
        drivername: 'Juan Garcia',
        driverphone: '+1 555-555-5555',
        price: '$5',
    },
    {
        make: 'Mini',
        model: 'Cooper',
        year: 2022,
        image: car9,
        description: 'A compact and fun-to-drive car that is perfect for zipping around the city.that is perfect for zipping .',
        drivername: 'Emily Davis',
        driverphone: '+1 555-555-5555',
        price: '$5',
    },
    {
        make: 'Honda',
        model: 'Activa',
        year: 2022,
        image: bike1,
        description: 'A popular and practical scooter that is perfect for city commuting and short trips.',
        drivername: 'Priya Patel',
        driverphone: '+1 555-555-5555',
        price: '$5',
    },
    {
        make: 'Bajaj',
        model: 'Auto Rickshaw',
        year: 2022,
        image: threewheel1,
        description: 'A versatile and affordable three-wheeler that is commonly used for transportation in many countries.',
        drivername: 'Raj Singh',
        driverphone: '+1 555-555-5555',
        price: '$5',
    },
    {
        make: 'Volkswagen',
        model: 'Transporter',
        year: 2023,
        image: van1,
        description: 'A reliable and spacious van that is ideal for commercial use and transporting goods.',
        drivername: 'Mike Johnson',
        driverphone: '+1 555-555-5555',
        price: '$5',
    },
    {
        make: 'Toyota',
        model: 'Hiace KDH',
        year: 2022,
        image: van2,
        description: 'A versatile and durable van that is perfect for transporting passengers and cargo.',
        drivername: 'Sarah Lee',
        driverphone: '+1 555-555-5555',
        price: '$5',
    },

  ];

  // Filter the list of vehicles based on the search term
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vehicle-list-container">
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder="Search for a vehicle..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="vehicle-list">
        {filteredVehicles.map((vehicle, index) => (
          <div key={index} className="vehicle-card">
            <img className="vehicle-image" src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
            <div className="vehicle-details">
              <h2 className="vehicle-name">{`${vehicle.make} ${vehicle.model}`}</h2>
              <p className="vehicle-year">{vehicle.year}</p>
              <p className="vehicle-description">{vehicle.description}</p>
              <p className="vehicle-drivername">{vehicle.drivername}</p>
              <p className="vehicle-driverphone">{vehicle.driverphone}</p>
              <p className="vehicle-price">{vehicle.price}</p>

              <button><Link to={`/add`} className='vehicle-btn'> RESERVE </Link></button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;