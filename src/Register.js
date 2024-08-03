// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const changeHandler = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', data)
      .then(res => {
        alert(res.data);
        setData({
          username: '',
          email: '',
          password: '',
          confirmpassword: ''
        });
      })
      .catch(err => {
        console.error(err);
        alert('Registration failed.');
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} autoComplete="off">
        <h3>Register</h3>
        <input type="text" onChange={changeHandler} name="username" placeholder="User Name" value={data.username} /><br />
        <input type="email" onChange={changeHandler} name="email" placeholder="Email" value={data.email} /><br />
        <input type="password" onChange={changeHandler} name="password" placeholder="Password" value={data.password} /><br />
        <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" value={data.confirmpassword} /><br />
        <input type="submit" value="Register" /><br />
      </form>
    </div>
  );
};

export default Register;
