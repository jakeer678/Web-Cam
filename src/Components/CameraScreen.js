import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./CameraScreen.css";

const CameraScreen = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

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
      const { beta, gamma } = event;
      const updatedCoordinates = {
        latitude: coordinates.latitude + beta,
        longitude: coordinates.longitude + gamma,
      };
      setCoordinates(updatedCoordinates);
    };

    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    } else {
      console.log('Device orientation events are not supported');
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [coordinates]);


  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  return (
    <section>
      <div className="camera-screen">
        <h1>Camera Screen</h1>
        <div className="camera-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="camera"
          />
        </div>
        <div className="info-container">
          <h2>Coordinates:</h2>
          <p>Latitude: {coordinates.latitude.toFixed(6)}</p>
          <p>Longitude: {coordinates.longitude.toFixed(6)}</p>
        </div>
        
        <div className="photo-container">
          {photo ? (
            <div>
              <img src={photo} alt="Captured" className="captured-photo" />
              <button onClick={retakePhoto} className="retake-button">
                Retake Photo
              </button>
            </div>
          ) : (
            <button onClick={capturePhoto} className="capture-button">
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CameraScreen;
