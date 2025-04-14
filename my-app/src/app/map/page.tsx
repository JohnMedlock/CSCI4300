import Navbar from "@/components/Navbar";
import SpotList from "@/components/SpotList";
import Map from "@/components/Map";

export default function MapPage () {
    return (
        <div className="h-screen flex flex-col bg-gray-800">
            {/* Navbar at the top */}
            <Navbar />

            {/* Main content: SpotList and Map side by side */}
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/4 overflow-y-auto p-4 border-r border-gray-200">
                    <SpotList />
                </div>
                <div className="w-3/4 p-4 h-full">
                    <Map />
                </div>
            </div>
        </div>
    );
}