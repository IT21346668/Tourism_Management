import React, { useEffect ,useState} from 'react';
import '../Style/editVehicleBooking.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

 
export default function EditVehicleBooking() {


  const param = useParams();
  const [userName, setUserName,]= useState("");
  const [userPhone, setUserPhone]= useState("");
  const [vehicleName, setVehicleName]= useState("");
  const [pick_up_place, setPick_up_place]= useState("");
  const [start, setStart]= useState("");
  const [end, setEnd]= useState("");
  const [destination_place, setDestination_place]= useState("");
  const [distance, setDistance]= useState("");
  const [alert, setAlert] = useState(null); // add state for alert

  useEffect(() => {
    function loadUser(){
      axios.get(`http://localhost:8040/vehicle/${param.id}`).then ((response)=>{
        setUserName(response.data.vehicle.userName);
        setUserPhone(response.data.vehicle.userPhone);
        setVehicleName(response.data.vehicle.vehicleName);
        setPick_up_place(response.data.vehicle.pick_up_place);
        setStart(response.data.vehicle.start);
        setEnd(response.data.vehicle.end);
        setDestination_place(response.data.vehicle.destination_place);
        setDistance(response.data.vehicle.distance);

      }).catch ((error) =>{
        alert(error.message);
      })

    }
    loadUser();
  }, []);

  function onSubmit(e) {
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
    };
  
    axios
      .put(`http://localhost:8040/vehicle/update/${param.id}`, newBooking)
      .then(() => {
        setAlert({
          type: 'success',
          message: 'booking Edited successfully',
        })
        setTimeout(() => {
          setAlert(null);
        }, 1500); // Hide the alert after 3 seconds
        
      })
      .catch(() => {
        setAlert({
          type: 'error',
          message: 'Failed to edit book place. Please try again!',
        });
        setTimeout(() => {
          setAlert(null);
        }, 1500); // Hide the alert after 5 seconds
        
      });
  }
  

  return (
      <div className="container">
        <div>

          {alert && (
          <div className={`alert ${alert.type}`}>
            {alert.message}
            <button onClick={() => setAlert(null)}>x</button>
          </div>
        )}

    
    <form id ="editform" onSubmit={onSubmit}>

          <h3>Update Vehicle Booking Details</h3>
          <br></br>
            <div className="form-group">
              <label>Name:</label>
              <input type="text"   name="userName" value={userName}   onChange={(e)=> setUserName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input type="tel"  name="userPhone" value={userPhone} onChange={(e)=> setUserPhone(e.target.value)}  />
            </div>

            <div className="form-group">
              <label>Vehicle Name:</label>
              <input type="text" name="vehicleName" value={vehicleName} onChange={(e)=> setVehicleName(e.target.value)}  />
            </div>

            <div className="form-group">
              <label>Pick-Up Place:</label>
              <input type="text"  name="pick_up_place" value={pick_up_place} onChange={(e)=> setPick_up_place(e.target.value)}  />
            </div>
             
            <div className="form-group">
              <label>Start:</label>
              <input type="datetime"   name="start" value={ start} onChange={(e)=> setStart(e.target.value)}  />
            </div>

            <div className="form-group">
              <label>End:</label>
              <input type="datetime" name="end" value={ end} onChange={(e)=> setEnd(e.target.value)}  />
            </div>

            <div className="form-group">
              <label>Destination Place:</label>
              <input type="text" name="destination_place" value={ destination_place} onChange={(e)=> setDestination_place(e.target.value)}  />
            </div> 

            <div className="form-group">
              <label>Distance:</label>
              <input type="Number" name="distance" value={ distance } onChange={(e)=> setDistance(e.target.value)}  />
            </div> 
            
            <div className="btn-block">
                    <button type="submit" className='update-btn'>UPDATE</button>
                </div>

          </form>
        </div>
        </div>
      
    );

}