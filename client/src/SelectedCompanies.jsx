import React, { useState } from 'react';
import {
  TruckIcon,
  SpeakerphoneIcon,
  GlobeAltIcon,
  CubeTransparentIcon,
  LocationMarkerIcon,
  CurrencyDollarIcon,
  ChatIcon,
  SupportIcon,
  ChartBarIcon,
} from '@heroicons/react/outline'; // Import icons from Heroicons

const aspects = [
  { name: 'Supply Chain', icon: <TruckIcon className="w-6 h-6 mr-2" /> },
  { name: 'Marketing Strategy', icon: <SpeakerphoneIcon className="w-6 h-6 mr-2" /> },
  { name: 'Media Presence', icon: <GlobeAltIcon className="w-6 h-6 mr-2" /> },
  { name: 'Product Portfolio', icon: <CubeTransparentIcon className="w-6 h-6 mr-2" /> },
  { name: 'Geographical Presence', icon: <LocationMarkerIcon className="w-6 h-6 mr-2" /> },
  { name: 'Financials', icon: <CurrencyDollarIcon className="w-6 h-6 mr-2" /> },
  { name: 'Customer Feedback', icon: <ChatIcon className="w-6 h-6 mr-2" /> },
  { name: 'After Sales Services', icon: <SupportIcon className="w-6 h-6 mr-2" /> },
  { name: 'Future Outlooks', icon: <ChartBarIcon className="w-6 h-6 mr-2" /> },
];

const SelectedCompanies = ({ companies }) => {
  const [selectedAspects, setSelectedAspects] = useState([]);

  // Handle card selection, with a limit of 4
  const handleAspectSelect = (aspectName) => {
    if (selectedAspects.includes(aspectName)) {
      setSelectedAspects(selectedAspects.filter((item) => item !== aspectName));
    } else if (selectedAspects.length < 4) {
      setSelectedAspects([...selectedAspects, aspectName]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 space-y-8 translate-y-20 bg-cover bg-center">
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-lg border-2 border-gray-300 rounded-lg p-4 mb-8 bg-white shadow-md">
          {companies.length > 0 ? (
            <div className="text-lg font-bold mb-4 text-center">
              Selected Companies are: {companies.join(', ')}.
            </div>
          ) : (
            <div className="text-lg text-gray-500">No companies selected</div>
          )}
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-6">
        {aspects.map((aspect, index) => (
          <div
            key={index}
            className={`aspect-card flex items-center justify-center p-6 text-center font-bold border-2 rounded-lg cursor-pointer transition-colors duration-300
              ${selectedAspects.includes(aspect.name) ? 'bg-blue-100 border-blue-500 text-gray-800' : 'bg-gray-100 border-gray-300 text-gray-700'}
              ${selectedAspects.length === 4 && !selectedAspects.includes(aspect.name) ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-50'}
            `}
            onClick={() => handleAspectSelect(aspect.name)}
          >
            {aspect.icon}
            {aspect.name}
          </div>
        ))}
      </div>
  
      {selectedAspects.length === 4 && (
        <div className="text-red-500 text-sm">
          You can only select up to 4 aspects.
        </div>
      )}
  
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-lg font-bold">
        Submit
      </button>
    </div>
  );
  
};

export default SelectedCompanies;
