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
}