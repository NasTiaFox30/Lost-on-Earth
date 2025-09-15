import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

export default function MapGame() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [randomLocation, setRandomLocation] = useState(null);
    const [userGuess, setUserGuess] = useState(null);
    const streetViewRef = useRef(null); //container Street View

    // Generate location
    useEffect(() => {
        //   setRandomLocation(getRandomCoords());
        setRandomLocation({ lat: 40.748817, lng: -73.985428 }); // New-York
    }, []);
    
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

}