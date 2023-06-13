import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraScreen.css';

const CameraScreen = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [photo, setPhoto] = useState(null);
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

  useEffect(() => {
    const handleOrientationChange = () => {
      const updatedOrientation = {
        alpha: orientation.alpha >= 0 ? orientation.alpha : 360 + orientation.alpha,
        beta: orientation.beta >= 0 ? orientation.beta : 360 + orientation.beta,
        gamma: orientation.gamma >= 0 ? orientation.gamma : 360 + orientation.gamma,
      };
      setOrientation(updatedOrientation);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [orientation]);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  return (
    <div className="camera-screen">
      <h1>Camera Screen</h1>
      <div className="camera-container">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="camera" />
      </div>
      <div className="info-container">
        <h2>Coordinates:</h2>
        <p>Latitude: {coordinates.latitude.toFixed(6)}</p>
        <p>Longitude: {coordinates.longitude.toFixed(6)}</p>
        <h2>Orientation:</h2>
        <p>Alpha: {orientation.alpha ? orientation.alpha.toFixed(2) : 0}°</p>
        <p>Beta: {orientation.beta ? orientation.beta.toFixed(2) : 0}°</p>
        <p>Gamma: {orientation.gamma ? orientation.gamma.toFixed(2) : 0}°</p>
      </div>
      <div className="photo-container">
        {photo && <img src={photo} alt="Captured" className="captured-photo" />}
        <button onClick={capturePhoto} className="capture-button">
          Capture Photo
        </button>
      </div>
    </div>
  );
};

export default CameraScreen;
