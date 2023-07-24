import React, { useState } from 'react';

function UserDetails() {
  const [userDetails, setUserDetails] = useState({ userName: '', age: '', email: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userDetails);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="userName" value={userDetails.userName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="text" name="age" value={userDetails.age} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={userDetails.email} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {userDetails.userName && <ShowDetails userDetails={userDetails} />}
    </div>
  );
}

function ShowDetails(props) {
  const { userName, age, email } = props.userDetails;

  return (
    <div>
      <h2>User Details:</h2>
      <p>Name: {userName}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserDetails;
