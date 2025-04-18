'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

// study spot props
type SpotCardProps = {
  _id: string;
  name: string;
  description: string;
  address: string;
  attributes?: {
    outdoors?: boolean;
    indoors?: boolean;
    free?: boolean;
  };
  image?: string; 
};

const SpotCard = ({ name, address, description, image, attributes }: SpotCardProps) => {
  const [loggedIn, setLoggedIn] = useState(false);
  
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setLoggedIn(isLoggedIn);
    }, []);
  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden text-white">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-32 object-cover" />
        {loggedIn ? ( // check if user is logged in 
          <button
            className="absolute top-2 right-2 bg-black bg-opacity-70 border border-white/20 rounded-full p-2 hover:scale-110 transition z-10"
            aria-label="Favorite"
          >
            <FontAwesomeIcon icon={regularHeart} className="text-white text-xl" />
          </button>
        ) : null}

      </div>
      <div className="p-3">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-300">{address}</p>
        <p className="text-sm mt-2 line-clamp-2">{description}</p>
        <div className="text-xs text-gray-400 mt-2 flex flex-wrap gap-1">
          <h3>complete attribute logic</h3>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;

