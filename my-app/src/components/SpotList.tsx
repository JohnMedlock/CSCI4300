import SpotCard from "./SpotCard";
import spotData from "../dummydata.json";

type Spot = {
  id: number;
  title: string;
  description: string;
  address: string;
  image: string;
  tags?: string[];
};

const SpotList = () => {
  return (
    <div className="flex flex-col gap-4">
      {spotData.map((spot: Spot) => (
        <SpotCard
          key={spot.id}
          title={spot.title}
          description={spot.description}
          address={spot.address}
          image={spot.image}
          tags={spot.tags || []}
        />
      ))}
    </div>
  );
};

export default SpotList;

