"use client";

import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

type Poi ={ key: string, location: google.maps.LatLngLiteral }
const locations: Poi[] = [
  {key: 'mainLibrary', location: { lat: 33.954485, lng: -83.373942  }},
  {key: 'jitteryJoes', location: { lat: 33.958009, lng: -83.374418 }},
  {key: 'scienceLibrary', location: { lat: 33.946261, lng: -83.375058 }}
];

const MapComponent = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="w-full h-full rounded-xl overflow-hidden">
        <Map
          defaultCenter={{ lat: 33.950328, lng: -83.374389 }}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          className="w-full h-full"
        >
            <PoiMarkers pois={locations} />
        </Map>
      </div>
    </APIProvider>
  );
};

const PoiMarkers = (props: {pois: Poi[]}) => {
    return (
      <>
        {props.pois.map( (poi: Poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}>
          <Pin background={'#FF0000'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        ))}
      </>
    );
  };

export default MapComponent;