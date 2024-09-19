import React,{ useState } from 'react';
import './Task.css';

const Task = () => {
    const[videoWatched, setVideosWatched] = useState(0);
    const pointerPerVideo = 5;

    const handleWatchVideo = () => {
        setVideosWatched(videoWatched + 1);
    };

    const calculatePointes = (videos) => {
        return videos * pointerPerVideo;
    };

    return(
        <div className= "profile-container">
            <h1>User Profile</h1>
            <p>Videos Watched: {videoWatched}</p>
            <p>Points: {calculatePointes(videoWatched)}</p>
            <button className="watch-button" onclick={handleWatchVideo}>Watch Video</button>
        </div>
    );
};

export default Task;