'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SpotList from '@/components/SpotList';
import Map from '@/components/Map';
import SpotDetailPanel from '@/components/SpotDetailPanel';

type Review = {
  user: string;
  text: string;
  rating: number;
};
// study spot props
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

export default function MapPage() {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

    const [studySpots, setStudySpots] = useState<Spot[]>([]);
  
    // get all of the study spots
    useEffect(() => {
      const fetchStudySpots = async () => {
        try {
          const res = await fetch("/api/spots");
          const data = await res.json();
          console.log("Fetched spots:", data.spots);
          setStudySpots(data.spots);
        } catch (err) {
          console.error("Failed to fetch study spots:", err);
        }
      };
  
      fetchStudySpots();
    }, []);

  return (
    <div className="h-screen flex flex-col bg-black">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar List */}
        <div className="w-1/3 lg:w-1/4 overflow-y-auto bg-black p-4 space-y-4">
          <SpotList
            spots={studySpots}
            selectedId={1}
            onSelect={(spot) =>
              setSelectedSpot(
                selectedSpot?._id === spot._id ? null : spot // toggles selection
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
              <Map studySpots={studySpots}/>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <Map studySpots={studySpots}/>
          </div>
        )}
      </div>
    </div>
  );
}

