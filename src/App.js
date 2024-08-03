import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Myprofile from './Myprofile';
import CreateEvent from './CreateEvent';
import ViewEvents from './ViewEvents';

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myprofile' element={<Myprofile />} />
            <Route path='/create-event' element={<CreateEvent />} />
            <Route path='/view-events' element={<ViewEvents />} />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
};

export default App;
