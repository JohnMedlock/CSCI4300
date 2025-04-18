import SpotCard from './SpotCard';

type Spot = {
  id: number;
  title: string;
  address: string;
  description: string;
  image: string;
  tags: string[];
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
  return (
    // map the study spot information to SpotCard(s)
    <div className="flex flex-col gap-4">
      {spots.map((spot) => (
        <div
          key={spot.id}
          onClick={() => onSelect(spot)}
          className={`cursor-pointer rounded transition 
            ${selectedId === spot.id ? 'bg-[#354B74]' : 'bg-[#1a1a1a]'} 
            hover:bg-[#2a2a2a]`}
        >
          <SpotCard {...spot} />
        </div>
      ))}
    </div>
  );
};

export default SpotList;

