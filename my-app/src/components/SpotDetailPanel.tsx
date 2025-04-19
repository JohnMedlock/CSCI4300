type Review = {
  user: string;
  text: string;
  rating: number;
};

type Spot = {
  _id: string;
  name: string;
  address: string;
  description: string;
  tags: string[];
  image?: string;         // Primary image (optional)
  photos?: string[];      // Multiple image URLs
  reviews?: Review[];
};

type SpotDetailPanelProps = {
  spot: Spot;
  onClose?: () => void;
};

const SpotDetailPanel = ({ spot, onClose }: SpotDetailPanelProps) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg shadow-md overflow-hidden text-white relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black bg-opacity-70 border border-white/20 rounded-full px-2 py-1 hover:scale-110 transition z-10"
          aria-label="Close"
        >
          ✕
        </button>
      )}

      {/* Main Image or Gallery Preview */}
      {spot.photos && spot.photos.length > 0 ? (
        <div className="overflow-x-auto whitespace-nowrap p-2">
          {spot.photos.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Spot ${i + 1}`}
              className="inline-block h-48 w-64 object-cover rounded-md mr-2"
            />
          ))}
        </div>
      ) : (
        spot.image && (
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-48 object-cover"
          />
        )
      )}

      {/* Info Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold">{spot.name}</h3>
        <p className="text-sm text-gray-300">{spot.address}</p>
        <p className="text-sm mt-2">{spot.description}</p>

        <div className="text-xs text-gray-400 mt-3 flex flex-wrap gap-2">
          {spot.tags.map((tag, i) => (
            <span key={i}>• {tag}</span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      {spot.reviews && spot.reviews.length > 0 && (
        <div className="px-4 pb-4">
          <h4 className="text-lg font-semibold mt-4 mb-2">Reviews</h4>
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {spot.reviews.map((review, i) => (
              <div key={i} className="bg-[#2a2a2a] p-3 rounded-md">
                <div className="text-yellow-400 mb-1">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-sm font-semibold">{review.user}</p>
                <p className="text-sm text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotDetailPanel;

