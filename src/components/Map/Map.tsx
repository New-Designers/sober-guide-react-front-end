import React, { useEffect, useRef, useState } from 'react';
import { FaClock, FaStopwatch, FaList, FaMapMarkerAlt } from 'react-icons/fa';

type GoogleMapsProps = {
    apiKey: string;
};

const Map: React.FC<GoogleMapsProps> = ({ apiKey }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [beginTime, setBeginTime] = useState('--:--:--');
    const [endTime, setEndTime] = useState('--:--:--');
    const [showTimer, setShowTimer] = useState(false);
    const [showAccumulatedTime, setShowAccumulatedTime] = useState(false);
    const [recommendedPlaces, setRecommendedPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [locationInput, setLocationInput] = useState('');
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        };

        return loadGoogleMapsScript();
    }, [apiKey]);

    const initMap = () => {
        if (!mapRef.current) return;

        const newMap = new google.maps.Map(mapRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
        });
        setMap(newMap);

        const newAutocomplete = new google.maps.places.Autocomplete(inputRef.current as HTMLInputElement, {
            types: ["geocode"],
        });
        newAutocomplete.bindTo('bounds', newMap);
        newAutocomplete.addListener("place_changed", () => onPlaceChanged(newAutocomplete, newMap));
        setAutocomplete(newAutocomplete);

        // Attempt to get user's location
        getUserLocation(newMap);
    };

    const getUserLocation = (map: google.maps.Map) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    console.log("Geolocation successful:", pos);
                    map.setCenter(pos);
                    map.setZoom(15);
                    new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Your location",
                    });
                    setLocationError(null);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    handleLocationError(true, map, map.getCenter()!, error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.error("Browser doesn't support geolocation");
            handleLocationError(false, map, map.getCenter()!);
        }
    };

    const handleLocationError = (
        browserHasGeolocation: boolean, 
        map: google.maps.Map, 
        pos: google.maps.LatLng, 
        error?: GeolocationPositionError
    ) => {
        const errorMessage = browserHasGeolocation
            ? `Error: The Geolocation service failed. ${error ? `Error code: ${error.code}, Message: ${error.message}` : ''}`
            : "Error: Your browser doesn't support geolocation.";
        
        setLocationError(errorMessage);
        console.error(errorMessage);

        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition(pos);
        infoWindow.setContent(errorMessage);
        infoWindow.open(map);
    };

    const onPlaceChanged = (autocomplete: google.maps.places.Autocomplete, map: google.maps.Map) => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
        });
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [hours, minutes, seconds].map(v => v < 10 ? "0" + v : v).join(":");
    };

    const startTimer = () => {
        setTimerActive(true);
        setBeginTime(new Date().toLocaleTimeString());
        setEndTime('--:--:--');
    };

    const stopTimer = () => {
        setTimerActive(false);
        setEndTime(new Date().toLocaleTimeString());
        setShowTimer(false);
        setShowAccumulatedTime(true);
    };

    const confirmLocation = () => {
        if (locationInput.trim() === "") {
            alert("Please enter a location to confirm.");
            return;
        }
        setShowTimer(true);
    };

    const resetPage = () => {
        setShowTimer(false);
        setShowAccumulatedTime(false);
        setTimerActive(false);
        setElapsedSeconds(0);
        setBeginTime('--:--:--');
        setEndTime('--:--:--');
        setRecommendedPlaces([]);
        setLocationInput('');
    };

    const recommendActivities = () => {
        setShowAccumulatedTime(false);
        if (map) {
            const service = new google.maps.places.PlacesService(map);
            const types = ['gym', 'shopping_mall'];
            let allResults: google.maps.places.PlaceResult[] = [];
    
            const searchNextType = (index: number) => {
                if (index >= types.length) {
                    setRecommendedPlaces(allResults.slice(0, 5));
                    return;
                }
    
                const request: google.maps.places.PlaceSearchRequest = {
                    location: map.getCenter(),
                    radius: 2000,
                    type: types[index]
                };
    
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        allResults = allResults.concat(results);
                    }
                    searchNextType(index + 1);
                });
            };
    
            searchNextType(0);
        }
    };

    useEffect(() => {
        let interval: number | undefined;
        if (timerActive) {
            interval = window.setInterval(() => {
                setElapsedSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center' }}>
                <input
                    ref={inputRef}
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Search"
                    style={{ flex: 1, padding: '10px', width:'90%', marginRight:'10px' }}
                />
                <button onClick={() => map && getUserLocation(map)} style={{ padding: '10px' }}>
                    <FaMapMarkerAlt /> Get My Location
                </button>
            </div>
            <div ref={mapRef} style={{ flex: 1, width: '100%', marginBottom: '10px' }} />
            
            {locationError && (
                <div style={{ color: 'red', padding: '10px', marginBottom: '10px', textAlign: 'center', width: '100%' }}>
                    {locationError}
                </div>
            )}
            
            {showTimer && (
                <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3>Timer: {formatTime(elapsedSeconds)}</h3>
                    <div style={{ textAlign: 'center' }}>
                        <div>Begin at: {beginTime}</div>
                        <div>End at: {endTime}</div>
                    </div>
                    <div>
                        {!timerActive ? (
                            <button onClick={startTimer} style={{ marginRight: '10px' }}><FaStopwatch /> Start</button>
                        ) : (
                            <button onClick={stopTimer} style={{ marginRight: '10px' }}><FaStopwatch /> End</button>
                        )}
                    </div>
                </div>
            )}
    
            {showAccumulatedTime && (
                <div style={{ marginBottom: '10px', textAlign: 'center', width: '100%' }}>
                    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h4 style={{ fontSize: '1.5em' }}>Total Time: {formatTime(elapsedSeconds)}</h4>
                    </div>
                    <button onClick={recommendActivities}><FaList /> Recommend Activities</button>
                </div>
            )}
    
            {recommendedPlaces.length > 0 && (
                <div style={{ marginBottom: '10px', textAlign: 'center', width: '100%' }}>
                    <h4>Recommended Activities Near You</h4>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {recommendedPlaces.map((place, index) => (
                            <li key={index} style={{ marginBottom: '5px' }}>
                                {place.name} - {place.rating || "No rating"} stars
                            </li>
                        ))}
                    </ul>
                </div>
            )}
    
            {!showTimer && !showAccumulatedTime && (
                <button onClick={confirmLocation} disabled={locationInput.trim() === ""} style={{ marginBottom: '10px' }}>
                    <FaClock /> Confirm
                </button>
            )}
    
            <button onClick={resetPage}>Reset</button>
        </div>
    );
};

export default Map;