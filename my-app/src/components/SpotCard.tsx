'use client';

// Type declaration for an individual study spot
type SpotCardProps = {
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

const SpotCard = ({ name, address, description, image, tags }: SpotCardProps) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden text-white">
      {/* Neatly format spot image, name, address, description and tags */}
      <div className="relative">
        <img src={image} alt={name} className="w-full h-32 object-cover" />
      </div>

      <div className="p-3">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-300">{address}</p>
        <p className="text-sm mt-2 line-clamp-2">{description}</p>
        <div className="text-xs text-gray-400 mt-2 flex flex-wrap gap-1">
          {/* Format spot tags */}
          {tags.map((tag, i) => (
            <span key={i}>• {tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
