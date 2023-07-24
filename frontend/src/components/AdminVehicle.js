import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './VehicleTableRow';
import '../Style/search.css';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.vehicle !== this.state.vehicle) {
      this.fetchData();
    }
  }

  fetchData = () => {
    axios
      .get('http://localhost:8040/vehicle/get')
      .then((Response) => {
        this.setState({ vehicle: Response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  filteredRows = () => {
    return this.state.vehicle.filter((row) =>
      Object.values(row)
        .join('')
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase())
    );
  };

  tabRow() {
    return this.filteredRows().map(function (object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h1 align="center">Vehicle Booking Details</h1>
        <div id="admin-search" style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search here"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </div>
        <table className="table table-stripped table " style={{ marginTop: 20 }}>                       
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Pick-up Place</th>
              <th>Arrival Date and Time</th>
              <th>Destination Date and Time</th>
              <th>Destination Place</th>
              <th>Distance</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
        
      </div>
    );
  }
}