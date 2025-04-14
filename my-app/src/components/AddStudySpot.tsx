"use client";

import React, { useState } from 'react';

const AddStudySpot = () => {
  // State for the new study spot
  const [studySpot, setStudySpot] = useState({
    name: '',
    description: '',
    address: '',
    extraDirection: '',
    attributes: {
      outdoors: false,
      indoors: false,
      free: false
    }
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    
    setStudySpot(prevSpot => ({
      ...prevSpot,
      [name]: value
    }));
  };

  // Handle attribute changes (checkboxes)
  const handleAttributeChange = (attribute: string) => {
    setStudySpot(prevSpot => ({
      ...prevSpot,
      attributes: {
        ...prevSpot.attributes,
        [attribute]: !prevSpot.attributes[attribute as keyof typeof prevSpot.attributes]
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser action
    
    console.log('New study spot data:', studySpot);
    
    // Clear form inputs after submission
    setStudySpot({
      name: '',
      description: '',
      address: '',
      extraDirection: '',
      attributes: {
        outdoors: false,
        indoors: false,
        free: false
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-[#1a2642] bg-opacity-90 rounded-lg p-8 shadow-xl text-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-medium">Name</h2>
            <input
              type="text"
              name="name"
              value={studySpot.name}
              onChange={handleChange}
              placeholder="Name of location"
              className="w-full p-3 rounded bg-[#2a3651] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-medium">Description</h2>
            <textarea
              name="description"
              value={studySpot.description}
              onChange={handleChange}
              placeholder="Description of location"
              rows={3}
              className="w-full p-3 rounded bg-[#2a3651] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-medium">Address</h2>
            <input
              type="text"
              name="address"
              value={studySpot.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 rounded bg-[#2a3651] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-medium">Extra direction</h2>
            <input
              type="text"
              name="extraDirection"
              value={studySpot.extraDirection}
              onChange={handleChange}
              placeholder="Extra directions"
              className="w-full p-3 rounded bg-[#2a3651] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-medium">Attributes</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAttributeChange('outdoors')}
                className={`px-4 py-2 rounded ${
                  studySpot.attributes.outdoors ? 'bg-blue-600' : 'bg-[#2a3651]'
                }`}
              >
                Outdoors
              </button>
              <button
                type="button"
                onClick={() => handleAttributeChange('indoors')}
                className={`px-4 py-2 rounded ${
                  studySpot.attributes.indoors ? 'bg-blue-600' : 'bg-[#2a3651]'
                }`}
              >
                Indoors
              </button>
              <button
                type="button"
                onClick={() => handleAttributeChange('free')}
                className={`px-4 py-2 rounded ${
                  studySpot.attributes.free ? 'bg-blue-600' : 'bg-[#2a3651]'
                }`}
              >
                Free
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-[#2a3651] text-white"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudySpot;