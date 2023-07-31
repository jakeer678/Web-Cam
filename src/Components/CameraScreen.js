import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./CameraScreen.css";

const CameraScreen = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  const [photo, setPhoto] = useState(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    const handleGeolocation = (position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(handleGeolocation);
      //navigator.geolocation.watchPosition(handleGeolocation);
    } else {
      console.log("Geolocation is not supported");
    }

    return () => {
      navigator.geolocation.clearWatch(handleGeolocation);
    };
  }, []);

  useEffect(() => {
    const handleDeviceOrientation = (event) => {
      let { alpha, beta, gamma } = event;

      // Normalize the values to be within the range of 0-360 degrees
      alpha = (alpha + 360) % 360;
      beta = (beta + 360) % 360;
      gamma = (gamma + 360) % 360;

      setOrientation({ alpha, beta, gamma });

      setCoordinates((prevCoordinates) => ({
        latitude: (prevCoordinates.latitude + beta) % 360,
        longitude: (prevCoordinates.longitude + gamma) % 360,
      }));
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  return (
    <>
      <div className="camera-screen">
        <h3>Welcome Webcam Page!</h3>
        <div className="camera-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="camera"
          />
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
        <div className="valuescontainer">
          <div className="info-container">
            <h2>Coordinates</h2>
            <p>Latitude: {coordinates.latitude.toFixed(6)}</p>
            <p>Longitude: {coordinates.longitude.toFixed(6)}</p>
          </div>
          <div className="orientation-container">
            <h2>Orientation</h2>
            <p>Alpha(z-axis): {orientation.alpha.toFixed(2)}°</p>
            <p>Beta(x-axis): {orientation.beta.toFixed(2)}°</p>
            <p>Gamma(y-axis): {orientation.gamma.toFixed(2)}°</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraScreen;
