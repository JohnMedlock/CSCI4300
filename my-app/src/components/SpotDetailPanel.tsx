'use client';
import React from 'react';

type Review = {
  user: string;
  text: string;
  rating: number;
};

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
  reviews?: Review[];
};

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

      <p className="mb-6 text-gray-200">{spot.description}</p>

      {/* Photos Section */}
      {spot.photoRefs && spot.photoRefs.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-3">Photos</h3>
          <div className="flex gap-4 overflow-x-auto mb-6">
            {spot.photoRefs.map((ref, idx) => {
              const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${GOOGLE_API_KEY}`;
              return (
                <img
                  key={idx}
                  src={photoUrl}
                  alt={`Photo ${idx + 1}`}
                  className="h-40 w-60 object-cover rounded-md border border-gray-700"
                  onError={() => console.warn(`Failed to load photoRef: ${ref}`)}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-gray-500 italic mb-6">No photos available.</p>
      )}

      {/* Reviews Section */}
      {spot.reviews?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {spot.reviews.map((review, i) => (
              <div
                key={i}
                className="bg-[#2c2c2c] p-4 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold">{review.user}</p>
                  <div className="text-yellow-400 text-sm">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SpotDetailPanel;
