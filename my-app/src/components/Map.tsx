'use client';

import { APIProvider, Map as GoogleMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type StudySpot = {
  _id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  attributes: {
    outdoors?: boolean;
    indoors?: boolean;
    free?: boolean;
  };
  image?: string; 
};

const MapComponent = () => {
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

  // load the map
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-full rounded-xl overflow-hidden">
        <GoogleMap
          defaultCenter={{ lat: 33.950328, lng: -83.374389 }}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          className="w-full h-full"
        >
          {studySpots.map((spot) => ( // map the coordinates of each spot as POI markers
            <AdvancedMarker key={spot._id} position={spot.coordinates}>
              <img
                src="/images/OrangePin.png"
                alt={spot.name}
                className="max-h-10 object-contain"
              />
            </AdvancedMarker>

          ))}
        </GoogleMap>
      </div>
    </APIProvider>
  );
};

export default MapComponent;