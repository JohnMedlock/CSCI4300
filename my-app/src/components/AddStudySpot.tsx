'use client';

import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const AddStudySpot = () => {
  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [studySpot, setStudySpot] = useState<{
    name: string;
    description: string;
    address: string;
    extraDirection: string;
    tags: string[];
    coordinates: { lat: number; lng: number };
    image: string;
    photoRefs?: string[];
  }>({
    name: '',
    description: '',
    address: '',
    extraDirection: '',
    tags: [],
    coordinates: { lat: 0, lng: 0 },
    image: '',
    photoRefs: [],
  });

  const handleTagToggle = (tag: string) => {
    setStudySpot((prev) => {
      // Make sure to cast the tags array properly
      const currentTags = [...prev.tags] as string[];
      
      if (currentTags.includes(tag)) {
        // Remove tag if already present
        return {
          ...prev,
          tags: currentTags.filter(t => t !== tag)
        };
      } else {
        // Add tag if not present
        return {
          ...prev,
          tags: [...currentTags, tag]
        };
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudySpot((prev) => ({
      ...prev,
      [name]: value,
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
        tags: [],
        coordinates: { lat: 0, lng: 0 },
        image: ''
      });
    } catch (error: any) {
      console.error('Error adding study spot:', error);
      setError(error.message || 'Failed to add study spot');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Available tags 
  const availableTags = ['outdoors', 'indoors', 'free', 'wifi', 'quiet', 'outlets'];

  // google autocomplete 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });
  
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const placeId = place.place_id;
      const location = place.geometry?.location;

      if (!placeId || !location) return;

      const service = new google.maps.places.PlacesService(document.createElement('div'));

      service.getDetails(
        {
          placeId,
          fields: ['formatted_address', 'geometry', 'photos', 'name'],
        },
        (details, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && details) {
            const photoRefs = details.photos?.map((photo) => photo.photo_reference) ?? [];
            const previewImage = details.photos?.[0]?.getUrl({ maxWidth: 800 }) ?? '';

            setStudySpot(prev => ({
              ...prev,
              address: details.formatted_address || '',
              coordinates: {
                lat: location.lat(),
                lng: location.lng(),
              },
              image: previewImage,
              photoRefs: photoRefs,
            }));
          } else {
            console.error('Failed to get place details:', status);
          }
        }
      );
    }
  };

  // once user selects address get necessary information
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
                {isLoaded ? (
                  <Autocomplete
                    onLoad={setAutocomplete}
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter address"
                      value={studySpot.address}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400"
                    />
                  </Autocomplete>
                ) : (
                  <input
                    type="text"
                    name="address"
                    placeholder="Loading..."
                    disabled
                    className="w-full p-2 rounded bg-[#1e293b] text-white placeholder-gray-400"
                  />
                )}
                {studySpot.image && (
                  <img
                    src={studySpot.image}
                    alt={studySpot.name || 'Study Spot'}
                    className="w-full h-32 object-cover"
                  />
                )}
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
                <label className="block text-sm font-semibold mb-2">Tags</label>
                <div className="flex gap-2 flex-wrap">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-4 py-1 rounded text-sm font-medium transition ${
                        studySpot.tags.includes(tag)
                          ? 'bg-blue-600'
                          : 'bg-[#1e293b]'
                      }`}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  ))}
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
