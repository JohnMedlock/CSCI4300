'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places']; // avoid re-creating the array on each render

const AddStudySpot = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [studySpot, setStudySpot] = useState({
    name: '',
    description: '',
    address: '',
    tags: [],
    coordinates: { lat: 0, lng: 0 },
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudySpot((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setStudySpot((prev) => {
      const currentTags = [...prev.tags];
      if (currentTags.includes(tag)) {
        return { ...prev, tags: currentTags.filter((t) => t !== tag) };
      } else {
        return { ...prev, tags: [...currentTags, tag] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const email = localStorage.getItem('userEmail') || '';
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': email,
        },
        body: JSON.stringify(studySpot),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add study spot');
      }

      const result = await response.json();
      setSuccess('Study spot added successfully!');
      setStudySpot({ name: '', description: '', address: '', tags: [], coordinates: { lat: 0, lng: 0 }, image: '' });
    } catch (err) {
      setError(err.message || 'Failed to add study spot');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableTags = ['outdoors', 'indoors', 'free', 'wifi', 'quiet', 'outlets'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
    version: 'beta',
  });

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!isLoaded || !autocompleteRef.current) return;

    const autocompleteElement = new google.maps.places.PlaceAutocompleteElement();
    autocompleteElement.placeholder = 'Enter address';
    autocompleteRef.current.appendChild(autocompleteElement);

    autocompleteElement.addEventListener('gmp-select', async (event) => {
      const { placePrediction } = event;
      const place = placePrediction.toPlace();
      await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'location', 'photos'] });

      const photo = place.photos?.[0];
      let photoUrl = '/images/defaultSpotImg.png';

      try {
        if (photo) {
          photoUrl = photo.getURI({ maxWidth: 400 });
        }
      } catch (error) {
        console.error('Failed to get photo URI:', error);
      }

      const result = place.toJSON();

      setStudySpot((prev) => ({
        ...prev,
        address: result.formattedAddress || '',
        coordinates: { lat: result.location.lat, lng: result.location.lng },
        image: photoUrl,
      }));
    });

    return () => autocompleteElement.remove();
  }, [isLoaded]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
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

          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="w-full max-w-md bg-[#0f172a] bg-opacity-90 text-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input type="text" name="name" placeholder="Name of location" value={studySpot.name} onChange={handleChange} className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea name="description" placeholder="Description of location" value={studySpot.description} onChange={handleChange} className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Address</label>
                {isLoaded ? <div ref={autocompleteRef} className="w-full"></div> : <input type="text" name="address" placeholder="Loading..." disabled className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400" />}
                {studySpot.image && (
                  <div className="mt-4">
                    <img
                      src={studySpot.image}
                      alt="Preview"
                      className="w-full h-auto rounded-lg shadow"
                      onError={(e) => {
                        e.currentTarget.src = '/images/defaultSpotImg.png';
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tags</label>
                <div className="flex gap-2 flex-wrap">
                  {availableTags.map((tag) => (
                    <button key={tag} type="button" onClick={() => handleTagToggle(tag)} className={`px-4 py-1 rounded text-sm font-medium transition ${studySpot.tags.includes(tag) ? 'bg-blue-600' : 'bg-[#1e293b]'}`}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex justify-center">
                <button type="submit" disabled={isSubmitting} className={`px-6 py-2 bg-[#334155] hover:bg-[#475569] rounded font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddStudySpot;