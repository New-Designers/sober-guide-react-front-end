import React, { useEffect, useRef, useState } from 'react';
import { FaClock, FaStopwatch, FaList, FaMapMarkerAlt, FaWineBottle } from 'react-icons/fa';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

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
    const [alcoholIntake, setAlcoholIntake] = useState('');
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

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
        setAlcoholIntake('');
        setDataSubmitted(false);
    };

    const recommendActivities = () => {
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

    const handleAlcoholIntakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || (Number(value) >= 0 && Number(value) <= 10000)) {
            setAlcoholIntake(value);
            setIsSubmitDisabled(value === '' || Number(value) === 0 || Number(value) > 10000);
        }
    };

    const submitData = () => {
        if (alcoholIntake === '' || Number(alcoholIntake) === 0 || Number(alcoholIntake) > 10000) {
            return; // Early return if validation fails
        }
        const data = {
            location: locationInput,
            totalTime: formatTime(elapsedSeconds),
            alcoholIntake: alcoholIntake
        };
        console.log("Collected data:", data);
        // Here you would typically send this data to your backend
        setDataSubmitted(true);
        recommendActivities();
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
        <div style={{ height: '90vh', width:'100%', display: 'flex', flexDirection: 'column', padding: '0 65px 50px 50px', alignItems: 'center' }}>
            <div style={{ display: 'flex', marginBottom: '10px', width: '120%', justifyContent: 'center' }}>
                <input
                    ref={inputRef}
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Search"
                    style={{ flex: 1, padding: '10px', width:'90%', marginRight:'10px' }}
                />
                <button onClick={() => map && getUserLocation(map)} style={{ padding: '10px' }}>
                    <FaMapMarkerAlt /> Locate
                </button>
            </div>
            <div ref={mapRef} style={{ flex: 1, width: '120%', marginBottom: '10px', height: '60vh' }} />
            
            {locationError && (
                <div style={{ color: 'red', padding: '10px', marginBottom: '10px', textAlign: 'center', width: '100%' }}>
                    {locationError}
                </div>
            )}
            
            {showTimer && !dataSubmitted && (
                <div style={{ 
                    marginBottom: '10px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '15px',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '300px'
                }}>
                    <h3 style={{
                        fontSize: '24px',
                        color: '#ffffff',
                        marginBottom: '10px'
                    }}>Timer: {formatTime(elapsedSeconds)}</h3>
                    <div style={{ textAlign: 'center', color: '#ffffff' }}>
                        <div style={{ marginBottom: '5px' }}>Begin at: {beginTime}</div>
                        <div>End at: {endTime}</div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        {!timerActive ? (
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={startTimer} 
                                startIcon={<FaStopwatch />}
                                style={{ marginRight: '10px' }}
                            >
                                Start
                            </Button>
                        ) : (
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={stopTimer} 
                                startIcon={<FaStopwatch />}
                                style={{ marginRight: '10px' }}
                            >
                                End
                            </Button>
                        )}
                    </div>
                </div>
            )}
    
            {showAccumulatedTime && !dataSubmitted && (
                <div style={{ marginBottom: '10px', textAlign: 'center', width: '100%' }}>
                    <div style={{ 
                        border: '1px solid #ccc', 
                        padding: '15px', 
                        marginBottom: '10px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '10px'
                    }}>
                        <h4 style={{ 
                            fontSize: '24px',
                            color: '#ffffff'
                        }}>Total Time: {formatTime(elapsedSeconds)}</h4>
                    </div>
                    <TextField
                        label="Alcohol Intake"
                        variant="outlined"
                        value={alcoholIntake}
                        onChange={handleAlcoholIntakeChange}
                        placeholder="Enter volume (0-10000)"
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaWineBottle style={{ color: '#ffffff' }} />
                                </InputAdornment>
                            ),
                            endAdornment: <InputAdornment position="end" style={{ color: '#ffffff' }}>ml</InputAdornment>,
                            inputProps: { min: 0, max: 10000 }
                        }}
                        InputLabelProps={{
                            style: { color: '#ffffff' },
                        }}
                        style={{ 
                            marginBottom: '10px', 
                            width: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '4px',
                        }}
                        sx={{
                            input: { color: '#ffffff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ffffff',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#ffffff',
                                },
                            },
                        }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={submitData}
                        startIcon={<FaList />}
                        sx={{
                            width: '90%',
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: '10px',
                            height: '48px',
                            fontSize: '1rem'
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
    
            {recommendedPlaces.length > 0 && dataSubmitted && (
                <div style={{ 
                    marginBottom: '10px', 
                    textAlign: 'center', 
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '15px',
                    borderRadius: '10px'
                }}>
                    <h4 style={{ 
                        fontSize: '20px', 
                        color: '#ffffff', 
                        marginBottom: '10px'
                    }}>Recommended Activities Near You</h4>
                    <ul style={{ 
                        listStyleType: 'none', 
                        padding: 0, 
                        color: '#ffffff'
                    }}>
                        {recommendedPlaces.map((place, index) => (
                            <li key={index} style={{ marginBottom: '5px', fontSize: '16px' }}>
                                {place.name} - {place.rating || "No rating"} stars
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!showTimer && !showAccumulatedTime && recommendedPlaces.length === 0 && (
                <Button 
                    variant="contained" 
                    color="success"
                    sx={{
                        width: '90%',
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                        height: '48px',
                        fontSize: '1rem'
                    }} 
                    onClick={confirmLocation} 
                    disabled={locationInput.trim() === ""}
                    startIcon={<FaClock />}
                >
                    Confirm
                </Button>
            )}
            
            <Button 
                variant="contained" 
                color="success"
                sx={{
                    width: '90%',
                    margin: '0 auto',
                    display: 'block',
                    marginBottom: '100px',
                    height: '48px',
                    fontSize: '1rem'
                }} 
                onClick={resetPage}
            >
                Reset
            </Button>
        </div>
    );
};

export default Map;