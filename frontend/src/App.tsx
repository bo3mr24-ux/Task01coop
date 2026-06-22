import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SponsorRegister from './pages/SponsorRegister';
import IndividualRegister from './pages/IndividualRegister';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/sponsor-register" element={<SponsorRegister />} />
      <Route path="/individual-register" element={<IndividualRegister />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
