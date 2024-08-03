// Myprofile.js
import React, { useContext, useState, useEffect } from 'react';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Myprofile.css'; // Import the CSS file

const Myprofile = () => {
  const [token] = useContext(store);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/myprofile', {
      headers: {
        'x-token': token
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [token]);

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="profile-container">
      {data && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Welcome : {data.username}</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myprofile;
