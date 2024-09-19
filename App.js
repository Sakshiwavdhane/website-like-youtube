import React, { useState, useEffect } from 'react';
import VideoCall from './VideoCall.jsx'; // Ensure the extension matches your file
import './App.css';

function App() {
    const [isVideoCallEnabled, setIsVideoCallEnabled] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            if (currentHour >= 18 && currentHour < 24) {
                setIsVideoCallEnabled(true);
            } else {
                setIsVideoCallEnabled(false);
            }
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <h1>VoIP Web App</h1>
            {isVideoCallEnabled ? (
                <VideoCall />
            ) : (
                <p>Video calls are only allowed between 6 PM and 12 AM.</p>
            )}
        </div>
    );
}

export default App;