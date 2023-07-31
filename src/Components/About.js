import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="aboutpage">
      <div className="aboutcard">
        <h1>About Webcam </h1>
        <p>
          This web cam application display a live webcam feed on a webpage. And
          It showcases the device's geolocation data (latitude and longitude)
          and device orientation data (alpha, beta, and gamma angles), providing
          users with information about their current location and the device's
          physical orientation in space. Additionally,Users can interact with
          the webcam and capture photos using the "Capture Photo" button. The
          captured photo is displayed on the screen, and users can choose to
          retake the photo using the "Retake Photo" button if desired.
        </p>
      </div>
    </div>
  );
};

export default About;
