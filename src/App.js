import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import CameraScreen from "./Components/CameraScreen";
import About from "./Components/About";
import Home from "./Components/Home";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<CameraScreen />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
