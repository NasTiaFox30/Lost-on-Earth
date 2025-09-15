import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { findRandomStreetView, haversineDistance } from "./Tools"
import MessageBox from "./MessageBox";

export default function MapGame() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [randomLocation, setRandomLocation] = useState(null);
    const [userGuess, setUserGuess] = useState(null);
    const streetViewRef = useRef(null); //container Street View
    const [distance, setDistance] = useState(null);

    // Generate location
    useEffect(() => {
        if (isLoaded) {
            setRandomLocation({ lat: 40.748817, lng: -73.985428 }); // New-York
            // let NewStreetViewService = new window.google.maps.StreetViewService();
            // findRandomStreetView(NewStreetViewService, setRandomLocation);
         }
    }, [isLoaded]);
    
    // Street View API 
    useEffect(() => {
        if (isLoaded && randomLocation && streetViewRef.current) {
        const panorama = new window.google.maps.StreetViewPanorama(
            streetViewRef.current,
            {
            position: randomLocation,
            pov: { heading: 100, pitch: 0 },
            visible: true,
            }
        );
        }
    }, [isLoaded, randomLocation]);

    if (!isLoaded) return <div>Loading Google Maps...</div>;
    if (!randomLocation) return <div>Generating random place...</div>;

    return (
    <div className="flex h-screen">
        {/* World Map */}
        <div className="w-1/2 h-full">
            <GoogleMap
            zoom={2}
            center={{ lat: 0, lng: 0 }}
            mapContainerClassName="w-full h-full"
            onClick={(e) => {
                setUserGuess({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }}
            >
            {userGuess && <Marker position={userGuess} />}
            </GoogleMap>
        </div>

        {/* Street View */}
        <div ref={streetViewRef} className="w-1/2 h-full" />

        {/* Check Button */}
        <div className="absolute bottom-4 left-4 z-10">
            <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => {
                if (!userGuess) {
                alert("Спочатку зробіть свій вибір на карті!");
                return;
                }
                const newDistance = haversineDistance(randomLocation, userGuess);
                setDistance(newDistance);
            }}
            >
            Check 🔎
            </button>
        </div>

        {/* Message */}
        {distance !== null && <MessageBox distance={distance} />}
        </div>
  );
}