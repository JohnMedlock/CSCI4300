'use client';
import React from 'react';

// Type declaration for an individual study spot
type Spot = {
  _id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
  image?: string;
  photoRefs?: string[];
};

// Detail pane props
type SpotDetailPanelProps = {
  spot: Spot;
  onClose?: () => void;
};

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const SpotDetailPanel = ({ spot, onClose }: SpotDetailPanelProps) => {
  return (
    <div className="bg-[#1a1a1a] text-white h-full w-full p-6 overflow-y-auto rounded-lg relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black bg-opacity-60 border border-white/30 rounded-full p-1 hover:scale-110 transition z-10"
          aria-label="Close"
        >
          ✕
        </button>
      )}

      <h2 className="text-3xl font-bold">{spot.name}</h2>
      <p className="text-sm text-gray-300 mb-2">{spot.address}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {spot.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-[#2c2c2c] text-sm text-white px-3 py-1 rounded-full border border-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Single Image */}
      {spot.image ? (
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-60 object-cover rounded-md border border-gray-700 mb-6"
        />
      ) : spot.photoRefs && spot.photoRefs.length > 0 ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${spot.photoRefs[0]}&key=${GOOGLE_API_KEY}`}
          alt="Spot"
          className="w-full h-60 object-cover rounded-md border border-gray-700 mb-6"
          onError={() =>
            console.warn(`Failed to load photoRef: ${spot.photoRefs?.[0]}`)
          }
        />
      ) : (
        <p className="text-gray-500 italic mb-6">No photo available.</p>
      )}

      {/* Description */}
      <h3 className="text-xl font-semibold mb-2">Details</h3>
      <p className="mb-6 text-gray-200">{spot.description}</p>
    </div>
  );
};

export default SpotDetailPanel;
