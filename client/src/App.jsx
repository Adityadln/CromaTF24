import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import SelectedCompanies from './SelectedCompanies';  // Import child component
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';

const App = () => {
  const [submittedCompanies, setSubmittedCompanies] = useState([]); // Store submitted companies

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
      <Routes>
        <Route path="/" element={<Home setSubmittedCompanies={setSubmittedCompanies} />} />       
        <Route path="/selected-companies" element={<SelectedCompanies companies={submittedCompanies} />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
