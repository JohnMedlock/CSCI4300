'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SpotList from '@/components/SpotList';
import Map from '@/components/Map';
import SpotDetailPanel from '@/components/SpotDetailPanel';
import spotData from '../../data/dummydata.json'; // <- use relative path

type Spot = {
  id: number;
  title: string;
  address: string;
  description: string;
  image: string;
  tags: string[];
  photos?: string[];
  reviews?: { user: string; text: string; rating: number }[];
};

export default function MapPage() {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  return (
    <div className="h-screen flex flex-col bg-black">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-1/3 lg:w-1/4 overflow-y-auto bg-black p-4 space-y-4">
          <SpotList
            spots={spotData}
            selectedId={selectedSpot?.id}
            onSelect={(spot) =>
              setSelectedSpot(
                selectedSpot?.id === spot.id ? null : spot // toggles selection
              )
            }
          />

        </div>

        {selectedSpot ? (
          <div className="w-2/3 lg:w-3/4 flex">
            <div className="w-1/2 bg-[#1a1a1a] text-white p-4 overflow-y-auto">
              <SpotDetailPanel spot={selectedSpot} />
            </div>
            <div className="w-1/2 h-full">
              <Map selectedSpot={selectedSpot} />
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <Map selectedSpot={null} />
          </div>
        )}
      </div>
    </div>
  );
}

