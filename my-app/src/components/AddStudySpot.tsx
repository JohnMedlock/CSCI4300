'use client';

import React, { useState } from 'react';

const AddStudySpot = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted study spot:', studySpot);
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
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
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
                  className="px-6 py-2 bg-[#334155] hover:bg-[#475569] rounded font-semibold"
                >
                  Submit
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

