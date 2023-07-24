import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Header extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Detroves</a>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              
              <a class="nav-link" href="#"></a>
              <a class="nav-link" href="/greport">Hotel</a>
              <a class="nav-link" href="/show">Flights</a>
              <a class="nav-link" href="/vehicleList">Car Rental</a>
              <a class="nav-link" href="/admin">Admin View</a>
              <a class="nav-link" href="/map">Adventure</a>
              <a class="nav-link" href="#">Payment</a>
              <a class="nav-link" href="#">Blog</a>
              <a class="nav-link" href="#">Event</a>
              <a class="nav-link" href="#">Spa</a>
              
            </div>
          </div>
        </div>
        
      </nav>
      </div>
    )
  }
}