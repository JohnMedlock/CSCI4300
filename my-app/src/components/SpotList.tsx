import SpotCard from "./SpotCard";
import spotData from "../dummydata.json";

type Spot = {
    id: number;
    title: string;
    description: string;
    image: string;
}

const SpotList = () => {
    return (
        <div className="spot-list">
            {spotData.map((spot: Spot) => (
                <SpotCard key={spot.id} title={spot.title} description={spot.description} image={spot.image} />
            ))}
        </div>
    );
};

export default SpotList;