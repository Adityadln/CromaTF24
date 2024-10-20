import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import About from './components/About';

const companies = [
  { name: 'Aditya Vision', logoUrl: '../assets/adityavision.png' },
  { name: 'Vijay Sales', logoUrl: '../assets/vijaysales.jpg' },
  { name: 'Reliance Digital', logoUrl: '../assets/reliancedigital.png' },
  { name: 'Poojara Telecom', logoUrl: '../assets/poojara.jpg' },
  { name: 'Bajaj Electricals', logoUrl: '../assets/bajajelectricals.jpg' }
];

const Home = ({ setSubmittedCompanies }) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState('');
  const navigate = useNavigate(); // For navigation

  // Handle checkbox change
  const handleCheckboxChange = (company) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(company)
        ? prevSelected.filter((c) => c !== company) // Uncheck (remove from selection)
        : [...prevSelected, company] // Check (add to selection)
    );
  };

  // Handle adding a new company
  const handleAddCompany = () => {
    if (newCompany && !selectedCompanies.includes(newCompany)) {
      setSelectedCompanies((prevSelected) => [...prevSelected, newCompany]);
      setNewCompany(''); // Clear input after adding
    }
  };

  // Handle submit button click (navigate to the /selected-companies route)
  const handleSubmit = () => {
    setSubmittedCompanies(selectedCompanies);  // Set the companies to parent state
    navigate('/selected-companies');  // Navigate to the new URL
  };

  // Map over companies array to display existing company checkboxes
  const comp = companies.map((company, index) => (
    <div
      key={index}
      className="company-item flex flex-col items-center my-4 bg-white p-4 rounded-md shadow-md border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
      onClick={() => handleCheckboxChange(company.name)}  // Toggle checkbox when the company box is clicked
    >
      <img src={company.logoUrl} alt={`${company.name} logo`} className="company-logo mb-2 h-16 w-16 object-contain" />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedCompanies.includes(company.name)}
          onChange={() => handleCheckboxChange(company.name)}
          onClick={(e) => e.stopPropagation()}  // Prevent the click from bubbling up and double-toggling the checkbox
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="text-lg text-gray-700">{company.name}</label>
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-12 py-10">
      {/* About Section */}
      <div className="w-full flex justify-center">
        <About />
      </div>

      {/* Company List with Submit Button */}
      <h2 className='text-center font-bold text-2xl'>Select Competitors to Analyze : </h2>
      <div className="company-list grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-200 p-6 rounded-lg shadow-lg w-3/4">
        {comp}

        {/* Add new company input */}
        <div className="company-item flex flex-col items-center my-4 bg-white p-4 rounded-md shadow-md border border-gray-300 hover:bg-gray-50 transition">
          <input
            type="text"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            placeholder="Add another company"
            className="border border-gray-300 px-4 py-2 rounded-md mb-2 w-full"
          />
          <button
            onClick={handleAddCompany}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 w-full"
          >
            Add Company
          </button>
        </div>

        <div className="col-span-1 md:col-span-3 flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 font-bold text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
