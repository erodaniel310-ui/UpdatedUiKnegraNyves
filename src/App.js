import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage/Homepage";
import Footer from "./components/Footer";
import Products from "./components/Products/productmen";
import Login from "./AuthPage/Login";
import Register from "./AuthPage/Register";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<><Homepage /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productsmen" element={<Products />} />
          {/* <Route path="/all-men" element={<AllMen />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
