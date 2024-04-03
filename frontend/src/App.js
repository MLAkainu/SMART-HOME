import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from './components/layouts/DefaultLayout';
import Dashboard from './pages/Dashboard';
import Light from './pages/Light';
import TemperHumi from './pages/TemperHumid';

import { useSelector } from "react-redux"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/light" element={<Light />} />
          <Route path="/temperhumi" element={<TemperHumi />} />

        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
