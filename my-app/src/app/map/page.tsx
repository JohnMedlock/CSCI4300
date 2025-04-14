import Navbar from "@/components/Navbar";
import SpotList from "@/components/SpotList";
import Map from "@/components/Map";

export default function MapPage() {
  return (
    <div className="h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 lg:w-1/4 overflow-y-auto bg-black p-4 space-y-4">
          <SpotList />
        </div>
        <div className="flex-1 h-full">
          <Map />
        </div>
      </div>
    </div>
  );
}

