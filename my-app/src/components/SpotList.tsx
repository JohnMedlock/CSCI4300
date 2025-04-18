'use client';

import SpotCard from "./SpotCard";
import { useEffect, useState } from "react";

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
};


const SpotList = ({
  spots,
  onSelect,
  selectedId
}: {
  spots: Spot[];
  onSelect: (spot: Spot) => void;
  selectedId: number | null | undefined;
}) => {
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
    // map the study spot information to SpotCard(s)
    <div className="flex flex-col gap-4">
      {studySpots.map((spot) => (
        <div
          key={spot._id}
          onClick={() => onSelect(spot)}
          className={`cursor-pointer rounded transition 
            'bg-[#354B74]' : 'bg-[#1a1a1a]'} 
            hover:bg-[#2a2a2a]`}
        >
          <SpotCard {...spot} />
        </div>
      ))}
    </div>
  );
};

export default SpotList;

