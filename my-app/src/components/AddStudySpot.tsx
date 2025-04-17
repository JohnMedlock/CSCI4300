'use client';

import React, { useState } from 'react';

const AddStudySpot = () => {
  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [studySpot, setStudySpot] = useState({
    name: '',
    description: '',
    address: '',
    extraDirection: '',
    attributes: {
      outdoors: false,
      indoors: false,
      free: false,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudySpot((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (attribute: string) => {
    setStudySpot((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: !prev.attributes[attribute as keyof typeof prev.attributes],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Send data to API
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studySpot),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add study spot');
      }
      
      const result = await response.json();
      console.log('Study spot added successfully:', result);
      setSuccess('Study spot added successfully!');
      
      // Clear form
      setStudySpot({
        name: '',
        description: '',
        address: '',
        extraDirection: '',
        attributes: {
          outdoors: false,
          indoors: false,
          free: false,
        },
      });
    } catch (error: any) {
      console.error('Error adding study spot:', error);
      setError(error.message || 'Failed to add study spot');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
          {error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded-md max-w-md w-full">
              {error}
            </div>
          )}
          
          {success && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-md max-w-md w-full">
              {success}
            </div>
          )}
          
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#0f172a] bg-opacity-90 text-white rounded-2xl p-8 shadow-lg"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name of location"
                  value={studySpot.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Description of location"
                  value={studySpot.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={studySpot.address}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Extra direction</label>
                <input
                  type="text"
                  name="extraDirection"
                  placeholder="Extra directions"
                  value={studySpot.extraDirection}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Attributes</label>
                <div className="flex gap-2 flex-wrap">
                  {['outdoors', 'indoors', 'free'].map((attr) => (
                    <button
                      key={attr}
                      type="button"
                      onClick={() => handleAttributeChange(attr)}
                      className={`px-4 py-1 rounded text-sm font-medium transition ${
                        studySpot.attributes[attr as keyof typeof studySpot.attributes]
                          ? 'bg-blue-600'
                          : 'bg-[#1e293b]'
                      }`}
                    >
                      {attr.charAt(0).toUpperCase() + attr.slice(1)}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="px-4 py-1 rounded bg-[#1e293b] text-white"
                    disabled
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#334155] hover:bg-[#475569] rounded font-semibold ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddStudySpot;

