'use client';

import SpotCard from "./SpotCard";
import spotData from "../dummydata.json";
import { useEffect, useState } from "react";

// study spot props
type StudySpot = {
  _id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  attributes?: {
    outdoors?: boolean;
    indoors?: boolean;
    free?: boolean;
  };
  image?: string; 
};

const SpotList = () => {
  const [studySpots, setStudySpots] = useState<StudySpot[]>([]);

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
      {studySpots.map((spot: StudySpot) => (
        <SpotCard
          key={spot._id}
          _id={spot._id}
          name={spot.name}
          description={spot.description}
          address={spot.address}
          image={spot.image}
          attributes={spot.attributes}
        />
      ))}
    </div>
  );
};

export default SpotList;

