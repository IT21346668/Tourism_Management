import React, { useState } from 'react';
import axios from 'axios';

export default function CheckAvailability() {

    const [vehicleName, setVehicleName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [availability, setAvailability] = useState(false);

    function checkAvailability(e) {
        e.preventDefault();
        const vehicleBooking = {
            vehicleName,
            start,
            end
        }
      
        axios.post("http://localhost:8040/vehicle/check", vehicleBooking)
            .then((response) => {
                if(response.data.available) {
                    setAvailability(true);
                } else {
                    alert("Vehicle not available for the selected dates. Please try another vehicle or dates.");
                }
            })
            .catch(() => {
                alert("Failed to check availability. Please try again.");
            })
    }

    return (
        <div>
            <form onSubmit={checkAvailability}>
                <div className="item">
                    <label htmlFor="vehicle">Vehicle<span>*</span></label>
                    <input 
                        required
                        id="vehicle" 
                        type="text" 
                        onChange={(e) => {
                            setVehicleName(e.target.value);
                        }}
                    />
                </div>
                <div className="item">
                    <label htmlFor="arr-datetime">Arrival Date and Time<span>*</span></label>
                    <input 
                        type="datetime-local" 
                        id="arr-datetime" 
                        name="arr-datetime" 
                        required
                        onChange={(e) => {
                            setStart(e.target.value);
                        }}
                    />
                </div>
                <div className="item">
                    <label htmlFor="deti-datetime">Destination Date and Time</label>
                    <input 
                        type="datetime-local" 
                        id="deti-datetime" 
                        name="deti-datetime" 
                        required
                        onChange={(e) => {
                            setEnd(e.target.value);
                        }}
                    />
                </div>
                <button type="submit">Check Availability</button>
            </form>
        </div>
    );
}
