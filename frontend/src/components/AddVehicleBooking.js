import React, { useState, useEffect } from 'react';
import '../Style/addVehicleBooking.css';
import '../Style/alert.css';
import Logo from '../Images/Logo.png'
import axios from 'axios';
import jsPDF from 'jspdf';

export default function AddVehicleBooking() {
    
    const [userName, setUserName,]= useState("");
    const [userPhone, setUserPhone]= useState("");
    const [vehicleName, setVehicleName]= useState("");
    const [pick_up_place, setPick_up_place]= useState("");
    const [start, setStart]= useState("");
    const [end, setEnd]= useState("");
    const [destination_place, setDestination_place]= useState("");
    const [distance, setDistance]= useState("");
    const [alert, setAlert] = useState(null); // add state for alert
    const [searchClicked, setSearchClicked] = useState(false);
    const [vehicleNum, setVehicleNum] = useState(false);
    const [licenNo, setLiNo] = useState(false);
    const [driverName, setDname] = useState(false);

    function validateDateTime() {
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
  
        // Check if the end date and time are after the start date and time
        if (endDate <= startDate) {
          setAlert("End date and time should be later than the start date and time.");
          return false;
        }
      }
  
      return true;
    }

    

    useEffect(() => {
        // Retrieve form data from localStorage if it exists
        const storedData = localStorage.getItem('form_data');
        if (storedData) {
          const formData = JSON.parse(storedData);
          setUserName(formData.userName);
          setUserPhone(formData.userPhone);
          setVehicleName(formData.vehicleName);
          setPick_up_place(formData.pick_up_place);
          setStart(formData.start);
          setEnd(formData.end);
          setDestination_place(formData.destination_place);
          setDistance(formData.distance);
        }
      }, []);

    function sendData(e) {
      e.preventDefault();

    const newBooking = {

        userName,
        userPhone,
        vehicleName,
        pick_up_place,
        start,
        end,
        destination_place,
        distance,
        driverName,
        licenNo,
        vehicleNum
      
    }

    const pickUpPlaceValue = document.getElementById("Pick-up-place").value;
    const destinationPlaceValue = document.getElementById("Destination-place").value;
    const startValue = new Date(document.getElementById("deti-datetime").value);
    const endValue = new Date(document.getElementById("arr-datetime").value);
    const dis = document.getElementById("distance").value;

    let distancePrice = ""; // Variable to hold the distance value
    let totalPrice = "";
    let daysPrice = "";

    if (pickUpPlaceValue === pickUpPlaceValue && destinationPlaceValue === destinationPlaceValue) {

        const timeDiff = Math.abs(endValue - startValue);
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate the difference in days
        daysPrice = diffDays;

        distancePrice = dis * 5; // Assign the value to the variable

        totalPrice = daysPrice * distancePrice * 5;

        if (pickUpPlaceValue && destinationPlaceValue) {
          const timeDiff = Math.abs(endValue - startValue);
          const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          daysPrice = diffDays;
      
          distancePrice = dis * 5;
          totalPrice = daysPrice * distancePrice * 5;
            
          if (searchClicked) {
            const googleSearchUrl = `https://www.google.com/search?q=distance+${encodeURIComponent(
              pickUpPlaceValue
            )}+to+${encodeURIComponent(destinationPlaceValue)}+by+car`;
            window.location.href = googleSearchUrl;

            return;
          }
        } else {
          setAlert("Please enter valid pick-up and destination places.");
          return;
        }
    }

    if (!validateDateTime()) {
      return;
    }


    axios.post("http://localhost:8040/vehicle/add", newBooking)

    .then(() => {
        setAlert({
          type: 'success',
          message: `Booking added successfully.\n 
                     Distance: ${distancePrice}Km\n
                     Total Price: $${totalPrice}`,        
        })
        setTimeout(() => {
          setAlert(null);
        }, 2500); 
        
      })
      .catch(() => {
        setAlert({
          type: 'error',
          message: 'Failed to book place. Please try again!',
        });
        setTimeout(() => {
          setAlert(null);
        }, 1500); // Hide the alert after 5 seconds
        
      })
     .finally(() => {
          const pdf = new jsPDF();
          pdf.setFontSize(12);
          
         // Add logo
        pdf.addImage(Logo, 'PNG', 15, 10, 30, 20);
        pdf.setFont("helvetica", "bold");
        pdf.text('Vehicle Rental Report - Detroves privet Limited', 20,30);
        pdf.setFont("helvetica", "normal");

         // Add name
         pdf.text('Name: ' + userName, 20, 50);

         // Create a new date object
        var today = new Date();
  
          // Format the date as a string
        var dateString = today.toLocaleDateString();
  
          // Add the date to the PDF document
        pdf.text('Booking date: ' + dateString, 20, 60);
         
         // Add phone number
        pdf.text('Phone Number: ' + userPhone, 20,70);
         
         // Add place
        pdf.text('Pick-up place: ' + pick_up_place, 20, 80);
         
         // Start Add date and time
        pdf.text('Start Date and Time: ' + start, 20, 90);

         // End Add date and time
        pdf.text('End Date and Time: ' + end, 20, 100);

          // Add place
        pdf.text('Destination place: ' + destination_place, 20, 110);

        pdf.text('Distance: ' + distance, 20, 130);
              
        pdf.text('Distance: ' + driverName, 20, 140);

       pdf.text('Distance: ' + licenNo, 20, 150);

        pdf.text('Distance: ' + vehicleNum, 20, 160);
        
        //Total Price
        pdf.text('Total Amount of vehicle rent: $' + totalPrice, 20, 120);
         
        pdf.save('Vehicle Booking-report.pdf');
         
      });
    }

    return (
    <div>
        {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
          <button onClick={() => setAlert(null)}>x</button>
        </div>
      )}
        <div>
        <div className="testbox">
            <form id='addform' onSubmit={sendData}>

                <div className="item">
                    <label for="outlined-disabled">User Name<span>*</span></label>
                    <input 
                        // disabled 
                        required
                        id="uname" 
                        type="text" 
                        //value="Sandali" 
                        onChange={(e) =>{

                             setUserName(e.target.value); //event

                        }}
                    />
                </div>
            
                <div className="item">
                    <label for="outlined-disabled">Phone<span>*</span></label>
                    <input 
                        //disabled 
                        required
                        id="Utel" 
                        type="tel" 
                        pattern="[7-9]{1}[0-9]{9}" 
                        title="Phone number with 7-9 and remaing 9 digit with 0-9"
                        //value="0711111111"
                        onChange={(e) =>{

                            setUserPhone(e.target.value);
                            
                        }} 
                    />
                </div>

                <div className="item">
                    <label htmlfor="vehicleh">Vehicle<span>*</span></label>
                    <input 
                        //disabled 
                        required
                        id="vehicle" 
                        type="text" 
                        //value="MiniCooper"
                        onChange={(e) =>{

                            setVehicleName(e.target.value);
                            
                        }}
                    />
                </div>

                <div className="item">
                    <label htmlFor="name">Pick-up Place<span>*</span></label>
                    <div className="name-item">
                        <input 
                            id="Pick-up-place"
                            type="text" 
                            name="Pick-up-place" 
                            placeholder="Pick-up-place" 
                            required
                            onChange={(e) =>{

                                setPick_up_place(e.target.value);
                                
                            }}
                        />
                    </div>
                </div>

                <div className="item">
                    <label htmlFor="arr-datetime">Arrival Date and Time<span>*</span></label>
                    <input 
                            type="datetime-local" 
                            id="arr-datetime" 
                            name="arr-datetime" 
                            required
                            onChange={(e) =>{

                                setStart(e.target.value);
                                
                            }}
                        />
                </div>

                <div className="item">
                    <label for="deti-datetime">Destination Date and Time<span>*</span></label>
                    <input 
                        type="datetime-local" 
                        id="deti-datetime" 
                        name="deti-datetime" 
                        required
                        onChange={(e) =>{

                            setEnd(e.target.value);
                            
                        }}
                    />
                </div>

                <div className="item">
                    <label htmlFor="Destination-place">Destination Place<span>*</span></label>
                    <div className="name-item">
                        <input 
                            id="Destination-place" 
                            type="text" 
                            name="Destination-place" 
                            placeholder="Destination-place" 
                            required
                            onChange={(e) =>{

                                setDestination_place(e.target.value);
                                
                            }}
                        />
                    </div>
                </div>

                <button
                  
                    onClick={() => setSearchClicked(true)}
                    style={{ marginLeft: '10px' }}
                >
                    Search Distance
                </button>

                <div className="item">
                    <label htmlFor="distance">Distance (in km)<span>*</span></label>
                    <input
                        type="Number"
                        id="distance"
                        name="distance"
                        value={distance}
                        onChange={(e) => {

                            setDistance(e.target.value);

                        }}
                    />
                </div>
                
                <div className="item">
                    <label htmlFor="DriverName">.....Driver Details.....<span>*</span></label>
                    <br/><br/>
                    <label htmlFor="DriverName">Driver Name:</label>
                    <input
                        disabled
                        type="text"
                        id="Dname"
                        name="Dname"
                        value="Kamal Gunrathne"
                        onChange={(e) =>{

                          setDname(e.target.value);
                          
                      }}
                    />
                     <label htmlFor="licenseNo">Driver License Number:</label>
                     <input
                        disabled
                        type="number"
                        id="LiNo"
                        name="LiNo"
                        value="698630900"
                        onChange={(e) =>{

                          setLiNo(e.target.value);
                          
                      }}
                      />

                     <label htmlFor="vehicleNumber">Vehicle Number:<span>*</span></label>
                     <input
                        disabled
                        type="text"
                        id="vnumber"
                        name="vnumber"
                        value="KC23432"
                        onChange={(e) =>{

                          setVehicleNum(e.target.value);
                          
                      }}
                    />
                </div>
                
                <div className="btn-block">
                    <button type="submit"className='add-btn'> Save Details and Generate File </button>
                </div>

             </form>
            </div>
        </div>
        </div>
        );
    }