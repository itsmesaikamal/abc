import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { store } from './App';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import './ViewEvents.css';

const ViewEvents = () => {
  const [token] = useContext(store);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [eventForm, setEventForm] = useState({ name: '', date: '', location: '', description: '' });
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/view-events', {
          headers: { 'x-token': token }
        });
        setEvents(response.data);
        fetchWeatherData(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, [token]);

  const fetchWeatherData = async (events) => {
    try {
      const weatherPromises = events.map(async (event) => {
        const { location } = event;
        try {
          const response = await axios.get(`http://localhost:5000/weather/${location}`);
          return { location, weather: response.data };
        } catch (err) {
          console.error(`Error fetching weather for ${location}:`, err);
          return { location, weather: null };
        }
      });

      const weatherResponses = await Promise.all(weatherPromises);
      const weatherMap = weatherResponses.reduce((map, item) => {
        map[item.location] = item.weather || {};
        return map;
      }, {});

      setWeatherData(weatherMap);
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/events/${id}`, {
        headers: { 'x-token': token }
      });
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleEditClick = (event) => {
    setEditEvent(event._id);
    setEventForm({
      name: event.name,
      date: event.date,
      location: event.location,
      description: event.description
    });
  };

  const handleFormChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/events/${editEvent}`, eventForm, {
        headers: { 'x-token': token }
      });
      const updatedEvents = events.map(event =>
        event._id === editEvent ? { ...event, ...eventForm } : event
      );
      setEvents(updatedEvents);
      setEditEvent(null);
      setEventForm({ name: '', date: '', location: '', description: '' });
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  return (
    <div className="view-events-container">
      <h1>Events</h1>
      {editEvent && (
        <form className="edit-event-form" onSubmit={handleFormSubmit}>
          <h2>Edit Event</h2>
          <input
            type="text"
            name="name"
            value={eventForm.name}
            onChange={handleFormChange}
            placeholder="Event Name"
            required
          />
          <input
            type="date"
            name="date"
            value={eventForm.date}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="location"
            value={eventForm.location}
            onChange={handleFormChange}
            placeholder="Location"
            required
          />
          <textarea
            name="description"
            value={eventForm.description}
            onChange={handleFormChange}
            placeholder="Description"
            required
          />
          <button type="submit">Save</button>
        </form>
      )}
      <div className="card-container">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <div className="card-actions">
              <FaEdit className="edit-icon" onClick={() => handleEditClick(event)} />
              <FaTrash className="delete-icon" onClick={() => handleDelete(event._id)} />
            </div>
            <h3>{event.name}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Weather:</strong></p>
            {weatherData[event.location] ? (
              <>
                <p>Temperature: {weatherData[event.location]?.main?.temp}°C</p>
                <p>Condition: {weatherData[event.location]?.weather[0]?.description}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEvents;
