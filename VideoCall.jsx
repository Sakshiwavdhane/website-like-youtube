import React, { useState, useRef } from 'react';
import './VideoCall.css';

const VideoCall = () => {
    const [isCalling, setIsCalling] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);

    const startCall = async () => {
        setIsCalling(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
    };

    const stopCall = () => {
        setIsCalling(false);
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
    };

    const startScreenShare = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        videoRef.current.srcObject = stream;
    };

    const startRecording = () => {
        setIsRecording(true);
        const stream = videoRef.current.srcObject;
        const options = { mimeType: 'video/webm; codecs=vp9' };
        mediaRecorderRef.current = new MediaRecorder(stream, options);
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data);
            }
        };
        mediaRecorderRef.current.onstop = saveRecording;
        mediaRecorderRef.current.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    };

    const saveRecording = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="video-call">
            <video ref={videoRef} autoPlay playsInline className="video" />
            <div className="controls">
                {isCalling ? (
                    <button onClick={stopCall}>End Call</button>
                ) : (
                    <button onClick={startCall}>Start Call</button>
                )}
                <button onClick={startScreenShare} disabled={!isCalling}>
                    Share Screen
                </button>
                {isRecording ? (
                    <button onClick={stopRecording}>Stop Recording</button>
                ) : (
                    <button onClick={startRecording} disabled={!isCalling}>
                        Start Recording
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoCall;