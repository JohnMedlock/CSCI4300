type Review = {
  user: string;
  text: string;
  rating: number;
};

type Spot = {
  title: string;
  address: string;
  description: string;
  tags: string[];
  photos?: string[];
  reviews?: Review[];
};

type SpotDetailPanelProps = {
  spot: Spot;
  onClose?: () => void;
};

const SpotDetailPanel = ({ spot, onClose }: SpotDetailPanelProps) => {
  return (
    <div className="relative space-y-6">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          aria-label="Close detail view"
        >
          ✕
        </button>
      )}

      {/* Title & Address */}
      <header>
        <h2 className="text-2xl font-bold">{spot.title}</h2>
        <p className="text-sm text-gray-300">{spot.address}</p>
      </header>

      {/* Tags */}
      {spot.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {spot.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-700 text-sm px-3 py-1 rounded-full text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm">{spot.description}</p>

      {/* Photos */}
      {spot.photos && spot.photos.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-2">Photos</h3>
          <div className="grid grid-cols-2 gap-2">
            {spot.photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Photo ${i + 1} of ${spot.title}`}
                className="rounded w-full object-cover max-h-40"
              />
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      {spot.reviews && spot.reviews.length > 0 && (
        <section>
          <h3 className="font-semibold text-lg mb-3">Reviews</h3>
          <div className="space-y-4">
            {spot.reviews.map((review, i) => (
              <div key={i} className="space-y-1">
                <div className="text-yellow-400">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-sm font-medium">{review.user}</p>
                <p className="text-sm text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SpotDetailPanel;

