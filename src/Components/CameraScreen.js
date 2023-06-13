import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './CameraScreen.css'

const CameraScreen = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
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

    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      console.log('Device orientation events are not supported');
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  const rotateStyle = {
    transform: `rotate(${360 - (orientation.alpha ? orientation.alpha : 0)}deg)`,
  };

  return (
    <div className="camera-screen">
      <h1 className="title">Camera Screen</h1>
      <div className="camera-container" style={rotateStyle}>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <div className="overlay">
          <p>Latitude: {coordinates.latitude.toFixed(6)}</p>
          <p>Longitude: {coordinates.longitude.toFixed(6)}</p>
          <p>Alpha: {orientation.alpha ? orientation.alpha.toFixed(2) : 0}°</p>
          <p>Beta: {orientation.beta ? orientation.beta.toFixed(2) : 0}°</p>
          <p>Gamma: {orientation.gamma ? orientation.gamma.toFixed(2) : 0}°</p>
        </div>
      </div>
    </div>
  );
};

export default CameraScreen;
