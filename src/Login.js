// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', data)
        .then(res => {
            localStorage.setItem('token', res.data.token); // Set token in localStorage
            setToken(res.data.token); // Update context
        })
        .catch(err => {
            console.error(err);
            alert('Login failed.');
        });
};


  if (token) {
    return <Navigate to='/myprofile' />;
  }

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} autoComplete="off">
        <h3>Login</h3>
        <input type="email" onChange={changeHandler} name="email" placeholder="Email" value={data.email} /><br />
        <input type="password" onChange={changeHandler} name="password" placeholder="Password" value={data.password} /><br />
        <input type="submit" value="Login" /><br />
      </form>
    </div>
  );
};

export default Login;
