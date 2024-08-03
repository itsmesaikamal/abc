import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css'; // Import the CSS file for styling

const CreateEvent = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Ensure the token is retrieved correctly

        try {
            const response = await axios.post('http://localhost:5000/create-event', 
                { name, date, location, description },
                {
                    headers: {
                        'x-token': token
                    }
                }
            );
            console.log('Event created:', response.data);
            // Optionally clear the form
            setName('');
            setDate('');
            setLocation('');
            setDescription('');
        } catch (error) {
            console.error('Error creating event:', error);
            // Optionally provide user feedback
        }
    };

    return (
        <div className="create-event-container">
           
            <form onSubmit={handleSubmit} className="create-event-form">
                <label>
                    Event Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    Location:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
