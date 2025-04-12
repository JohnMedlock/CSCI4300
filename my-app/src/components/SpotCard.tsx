type SpotCardProps = {
    title: string;
    description: string;
    image: string;
};

const SpotCard = ({title, description, image}: SpotCardProps) => {
    return (
        <div className="bg-zinc-950 p-4 rounded-lg shadow-md outline-2 outline-white">
            <img src={image} className="rounded mb-2" />
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <h5 className="text-sm text-white">{description}</h5>
        </div>
    );
};

export default SpotCard;