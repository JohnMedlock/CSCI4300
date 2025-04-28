'use client';

import SpotCard from "./SpotCard";

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
};

// Functional component to display a list of study spots
const SpotList = ({
  spots,
  onSelect,
  selectedId
}: {
  spots: Spot[];
  onSelect: (spot: Spot) => void;
  selectedId: number | null | undefined;
}) => {
  return (
    // Map the study spot information to SpotCard(s)
    <div className="flex flex-col gap-4">
      {spots.map((spot) => (
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

