import React, { useState, useRef, useEffect } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videos }) => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState(null);
  const [isHolding, setIsHolding] = useState(false);

  // Utility functions for controls
  const skipForward = () => {
    videoRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    videoRef.current.currentTime -= 10;
  };

  const pausePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const closeWebsite = () => {
    alert('Closing website...');
  };

  const showComments = () => {
    alert('Displaying comments...');
  };

  const showLocationAndTemperature = () => {
    alert('Location: Your City, Temperature: 25°C');
  };

  const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
  };

  const handleGesture = (e) => {
    setTapCount((prev) => prev + 1);

    if (tapTimeout) clearTimeout(tapTimeout);

    const newTimeout = setTimeout(() => {
      const touchX = e.nativeEvent.changedTouches
        ? e.nativeEvent.changedTouches[0].clientX
        : e.clientX;
      const touchY = e.nativeEvent.changedTouches
        ? e.nativeEvent.changedTouches[0].clientY
        : e.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (tapCount === 1) {
        if (touchX > width * 0.8 && touchY < height * 0.2) {
          showLocationAndTemperature();
        } else if (
          touchX > width * 0.33 &&
          touchX < width * 0.66 &&
          touchY > height * 0.33 &&
          touchY < height * 0.66
        ) {
          pausePlay();
        }
      } else if (tapCount === 2) {
        if (touchX > width * 0.66) {
          skipForward();
        } else if (touchX < width * 0.33) {
          skipBackward();
        }
      } else if (tapCount === 3) {
        if (touchX > width * 0.66) {
          closeWebsite();
        } else if (touchX < width * 0.33) {
          showComments();
        } else if (touchX > width * 0.33 && touchX < width * 0.66) {
          nextVideo();
        }
      }

      setTapCount(0);
    }, 300);

    setTapTimeout(newTimeout);
  };

  let holdTimeout;
  const handleHoldStart = (e) => {
    const touchX = e.nativeEvent.changedTouches
      ? e.nativeEvent.changedTouches[0].clientX
      : e.clientX;
    const width = window.innerWidth;

    holdTimeout = setTimeout(() => {
      setIsHolding(true);
      if (touchX > width * 0.66) {
        changePlaybackSpeed(2);
      } else if (touchX < width * 0.33) {
        changePlaybackSpeed(0.5);
      }
    }, 500);
  };

  const handleHoldEnd = () => {
    clearTimeout(holdTimeout);
    if (isHolding) {
      setIsHolding(false);
      changePlaybackSpeed(1);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideo];
      videoRef.current.play();
    }
  }, [currentVideo]);

  return (
    <div
      className="video-container"
      onClick={handleGesture}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      <video ref={videoRef} className="video-player" controls />
    </div>
  );
};

export default VideoPlayer;
