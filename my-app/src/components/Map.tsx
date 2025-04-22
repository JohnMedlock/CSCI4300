'use client';

import { APIProvider, Map as GoogleMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

// Type definition for an individual study prop
type StudySpot = {
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

// Props for the MapComponent - Accepts an array of StudySpot objects to plot on the map
type MapProps = {
  studySpots: StudySpot[];
}

// MapComponent - A component that displays study spots on a Google Map using @vis.gl/react-google-maps
const MapComponent = (props: MapProps) => {
  const {studySpots} = props;

  // Load the google map with the plotted study spots
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-full rounded-xl overflow-hidden">
        <GoogleMap
          defaultCenter={{ lat: 33.950328, lng: -83.374389 }}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          className="w-full h-full"
        >
          {/* Map the coordinates of each spot as POI markers*/}
          {studySpots.map((spot) => ( 
            <AdvancedMarker key={spot._id} position={spot.coordinates}>
              <img
                src="/images/OrangePin.png" // Custom POI marker
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