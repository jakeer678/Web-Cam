import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraScreen.css';

const CameraScreen = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const webcamRef = useRef(null);

  useEffect(() => {
    const handleGeolocation = (position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(handleGeolocation);
    } else {
      console.log('Geolocation is not supported');
    }

    return () => {
      navigator.geolocation.clearWatch(handleGeolocation);
    };
  }, []);

  useEffect(() => {
    const handleDeviceOrientation = (event) => {
      const { alpha, beta, gamma } = event;
      setOrientation({ alpha, beta, gamma });
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setShowCamera(false);

    // Hide the camera preview after taking the photo
    webcamRef.current.stream.getVideoTracks().forEach((track) => track.stop());
  };

  const retakePhoto = () => {
    setPhoto(null);
    setShowCamera(true);
  };


  return (
    <div className="camera-screen">
    <h1>Camera Screen</h1>
    {showCamera ? (
      <div className="camera-container">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="camera" />
      </div>
    ) : (
      <div className="photo-container">
        {photo && <img src={photo} alt="Captured" className="captured-photo" />}
        <button onClick={retakePhoto} className="capture-button">
          Retake Photo
        </button>
      </div>
    )}
    {showCamera && (
      <div className="info-container">
        <h2>Coordinates:</h2>
        <p>Latitude: {coordinates.latitude.toFixed(6)}</p>
        <p>Longitude: {coordinates.longitude.toFixed(6)}</p>
        <h2>Orientation:</h2>
        <p>Alpha: {orientation.alpha ? orientation.alpha.toFixed(2) : 0}°</p>
        <p>Beta: {orientation.beta ? orientation.beta.toFixed(2) : 0}°</p>
        <p>Gamma: {orientation.gamma ? orientation.gamma.toFixed(2) : 0}°</p>
      </div>
    )}
    {!showCamera && (
      <div className="navigation-container">
        <button onClick={() => setShowCamera(true)} className="navigate-button">
          Go Back to Camera
        </button>
      </div>
    )}
  </div>
  );
};

export default CameraScreen;
