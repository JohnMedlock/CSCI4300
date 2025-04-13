"use client";

import React, { useState } from 'react';

const AddStudySpot = () => {
  // State for the new study spot
  const [studySpot, setStudySpot] = useState({
    name: '',
    location: '',
    noiseLevel: '',
    availableHours: '',
    seatingCapacity: '',
    hasOutlets: false,
    hasWifi: false,
    description: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    
    // Handle checkboxes differently than text inputs
    const newValue = type === 'checkbox' ? checked : value;
    
    setStudySpot(prevSpot => ({
      ...prevSpot,
      [name]: newValue
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser action
    
    console.log('New study spot data:', studySpot);
    
    // Clear form inputs after submission
    setStudySpot({
      name: '',
      location: '',
      noiseLevel: '',
      availableHours: '',
      seatingCapacity: '',
      hasOutlets: false,
      hasWifi: false,
      description: ''
    });
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-xl p-8 max-w-xl mx-auto my-8 shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Add New Study Spot</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">Name of Study Spot:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studySpot.name}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="location" className="mb-2 font-medium text-gray-700">Location on Campus:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={studySpot.location}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="noiseLevel" className="mb-2 font-medium text-gray-700">Noise Level:</label>
          <select
            id="noiseLevel"
            name="noiseLevel"
            value={studySpot.noiseLevel}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">Select Noise Level</option>
            <option value="silent">Silent</option>
            <option value="quiet">Quiet</option>
            <option value="moderate">Moderate</option>
            <option value="loud">Loud</option>
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="availableHours" className="mb-2 font-medium text-gray-700">Available Hours:</label>
          <input
            type="text"
            id="availableHours"
            name="availableHours"
            placeholder="e.g., Mon-Fri: 8am-10pm"
            value={studySpot.availableHours}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="seatingCapacity" className="mb-2 font-medium text-gray-700">Seating Capacity:</label>
          <input
            type="number"
            id="seatingCapacity"
            name="seatingCapacity"
            min="1"
            value={studySpot.seatingCapacity}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="flex gap-8 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasOutlets"
              name="hasOutlets"
              checked={studySpot.hasOutlets}
              onChange={handleChange}
              className="w-4 h-4 mr-2 text-blue-500 accent-blue-500"
            />
            <label htmlFor="hasOutlets" className="font-medium text-gray-700">Has Power Outlets</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasWifi"
              name="hasWifi"
              checked={studySpot.hasWifi}
              onChange={handleChange}
              className="w-4 h-4 mr-2 text-blue-500 accent-blue-500"
            />
            <label htmlFor="hasWifi" className="font-medium text-gray-700">Has WiFi</label>
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-2 font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={studySpot.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the study spot (ambiance, best times to go, etc.)"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md mx-auto mt-2 hover:bg-orange-600 transition duration-200 active:scale-95"
        >
          Add Study Spot
        </button>
      </form>
    </div>
  );
};

export default AddStudySpot;