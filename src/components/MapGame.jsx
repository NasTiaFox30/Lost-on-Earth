import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { findRandomStreetView, haversineDistance } from "./Tools"
import MessageBox from "./MessageBox";
import LoadingScreen from "./LoadingScreen";

export default function MapGame() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [randomLocation, setRandomLocation] = useState(null);
    const [userGuess, setUserGuess] = useState(null);
    const streetViewRef = useRef(null); //container Street View
    const [distance, setDistance] = useState(null);
    const [guessesLeft, setGuessesLeft] = useState(5);
    const [gameStatus, setGameStatus] = useState('playing'); // game status 
    const [showLine, setShowLine] = useState(false);

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
                    // controls
                    addressControl: false,
                    fullscreenControl: false,
                    linksControl: false,
                    panControl: false,
                    // zoomControl: false,
                }
            );
        }
    }, [isLoaded, randomLocation]);

    const handleGuess = () => {
        if (!userGuess) {
            alert("First mark place to pin!");
            return;
        }

        const newDistance = haversineDistance(randomLocation, userGuess);
        setDistance(newDistance);

        // Check if won
        if (newDistance <= 1000) {
            setGameStatus('won');
            setShowLine(true);
            return;
        }

        setGuessesLeft(guessesLeft - 1);

        // Check if lost
        if (guessesLeft <= 1) {
            setGameStatus('lost');
            setShowLine(true);
        }
    };

    const resetGame = () => {
        setRandomLocation(null);
        setUserGuess(null);
        setGuessesLeft(5);
        setDistance(null);
        setGameStatus('playing');
        setShowLine(false);
        
        // Generate new random location
        if (isLoaded) {
            let NewStreetViewService = new window.google.maps.StreetViewService();
            findRandomStreetView(NewStreetViewService, setRandomLocation);
        }
    };

    const getLinePath = () => {
        if (!userGuess || !randomLocation) return [];
        return [userGuess, randomLocation];
    };

    if (!isLoaded) return <div>Loading Google Maps...</div>;

    return (
    <div className="relative flex flex-col md:flex-row h-screen">
        {/* Street View */}
        <div ref={streetViewRef} className="w-full h-1/2 md:w-1/2 md:h-full" />

        {/* World Map */}
        <div className="w-full h-1/2 md:w-1/2 md:h-full">
            <GoogleMap
                key={gameStatus === 'playing' ? 'round-playing' : 'round-done'}
                zoom={2}
                center={{ lat: 0, lng: 0 }}
                mapContainerClassName="w-full h-full"
                onClick={(e) => {
                    if (gameStatus === 'playing') {
                        setUserGuess({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                    }
                }}
                // controls
                options={{
                streetViewControl: false,
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                }}
            >
                {userGuess && (
                    <Marker
                        position={userGuess}
                        icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                    />
                )}
                {randomLocation && gameStatus !== 'playing' && (
                    <Marker 
                        position={randomLocation} 
                        icon={{url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}}
                    />
                )}
                {gameStatus !== 'playing' && showLine && userGuess && randomLocation && (
                    <Polyline
                        path={getLinePath()}
                        options={{
                            strokeColor: "#ffae00ff",
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                            geodesic: true,
                        }}
                    />
                )}
            </GoogleMap>
        </div>

        {/* Message */}
        <MessageBox
            distance={distance}
            guessesLeft={guessesLeft}
            gameStatus={gameStatus}
            onGuess={handleGuess}
            onNewGame={resetGame}
        />

        {/* Loading Overlay */}
        {!randomLocation && (
            <LoadingScreen/>
        )}
    </div>
  );
}