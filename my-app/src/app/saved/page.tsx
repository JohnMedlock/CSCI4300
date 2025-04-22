'use client';

import Navbar from '@/components/Navbar';
import SpotCard from '@/components/SpotCard';
import savedData from '@/data/saved.json'; // Replace with a real data source or API call if needed

// Defines the structure of a saved study spot
type Spot = {
  id: number;
  title: string;
  address: string;
  description: string;
  image: string;
  tags: string[];
};

/**
 * SavedPage displays a list of study spots the user has saved.
 *
 * Pulls spot data from a static JSON file (can be replaced with a real API).
 * If no spots are saved, it shows a fallback message.
 */
export default function SavedPage() {
  return (
    <main className="min-h-screen relative overflow-hidden text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/DarkBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-8">Saved Study Spots</h1>

          {/* Show fallback if there are no saved spots */}
          {savedData.length === 0 ? (
            <p className="text-gray-400">You haven't saved any spots yet.</p>
          ) : (
            <div className="space-y-6">
              {/* Render a card for each saved spot */}
              {savedData.map((spot: Spot) => (
                <SpotCard
                  key={spot.id}
                  title={spot.title}
                  address={spot.address}
                  description={spot.description}
                  image={spot.image}
                  tags={spot.tags}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
