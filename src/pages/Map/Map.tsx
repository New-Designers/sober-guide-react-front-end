// Import necessary dependencies
import React, { useEffect, useRef, useState } from 'react';
import { FaClock, FaStopwatch, FaList, FaMapMarkerAlt, FaWineBottle } from 'react-icons/fa';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Define prop types for the Map component
type GoogleMapsProps = {
    apiKey: string;
};

// Create a custom Alert component using MuiAlert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Define constants
const ONE_HOUR_IN_SECONDS = 10; // For demo purposes, set to 10 seconds instead of 3600

// Main Map component
const Map: React.FC<GoogleMapsProps> = ({ apiKey }) => {
    // Refs for DOM elements
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // State variables
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [countdownTime, setCountdownTime] = useState<number | null>(null);
    const [totalTime, setTotalTime] = useState(0);
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
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    // Effect to load Google Maps script
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

    // Initialize Google Map
    const initMap = () => {
        if (!mapRef.current) return;

        const newMap = new google.maps.Map(mapRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
        });
        setMap(newMap);

        // Initialize Autocomplete
        const newAutocomplete = new google.maps.places.Autocomplete(inputRef.current as HTMLInputElement, {
            types: ["geocode"],
        });
        newAutocomplete.bindTo('bounds', newMap);
        newAutocomplete.addListener("place_changed", () => onPlaceChanged(newAutocomplete, newMap));
        setAutocomplete(newAutocomplete);

        getUserLocation(newMap);
    };

    // Get user's current location
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

    // Handle location errors
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

    // Handle place selection from Autocomplete
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

    // Format time in HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return [hours, minutes, seconds].map(v => v < 10 ? "0" + v : v).join(":");
    };

    // Start the timer
    const startTimer = () => {
        setCountdownTime(ONE_HOUR_IN_SECONDS);
        setTimerActive(true);
        setBeginTime(new Date().toLocaleTimeString());
        setEndTime('--:--:--');
        setTotalTime(0);
    };

    // Stop the timer
    const stopTimer = () => {
        setTimerActive(false);
        setEndTime(new Date().toLocaleTimeString());
        setShowTimer(false);
        setShowAccumulatedTime(true);
    };

    // Confirm location and show timer
    const confirmLocation = () => {
        if (locationInput.trim() === "") {
            alert("Please enter a location to confirm.");
            return;
        }
        setShowTimer(true);
    };

    // Reset all states to initial values
    const resetPage = () => {
        setShowTimer(false);
        setShowAccumulatedTime(false);
        setTimerActive(false);
        setCountdownTime(null);
        setTotalTime(0);
        setBeginTime('--:--:--');
        setEndTime('--:--:--');
        setRecommendedPlaces([]);
        setLocationInput('');
        setAlcoholIntake('');
        setDataSubmitted(false);
        setIsSubmitDisabled(true);
    };

    // Handle user's response to the notification
    const handleNotificationResponse = (response: boolean) => {
        setOpenNotification(false);
        if (response) {
            // User clicked "Yes", go to submit page
            stopTimer();
            setShowAccumulatedTime(true);
        } else {
            // User clicked "No", continue accumulating time
            setTimerActive(true);
            setCountdownTime(null);
        }
    };

    // Recommend nearby activities
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

    // Handle changes in alcohol intake input
    const handleAlcoholIntakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || (Number(value) >= 0 && Number(value) <= 10000)) {
            setAlcoholIntake(value);
            setIsSubmitDisabled(value === '' || Number(value) === 0 || Number(value) > 10000);
        }
    };

    // Close the snackbar
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    // Submit collected data
    const submitData = () => {
        if (alcoholIntake === '' || Number(alcoholIntake) === 0 || Number(alcoholIntake) > 10000) {
            return; // Early return if validation fails
        }
        const data = {
            location: locationInput,
            totalTime: formatTime(totalTime),
            alcoholIntake: alcoholIntake
        };
        console.log("Collected data:", data);
        // Here you would typically send this data to your backend
        setDataSubmitted(true);
        setOpenSnackbar(true);
        recommendActivities();
    };

    // Effect to handle timer logic
    useEffect(() => {
        let interval: number | undefined;
        if (timerActive) {
            interval = window.setInterval(() => {
                if (countdownTime !== null) {
                    setCountdownTime(prevTime => {
                        if (prevTime === null || prevTime <= 0) {
                            clearInterval(interval);
                            setOpenNotification(true);
                            setTimerActive(false);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }
                setTotalTime(prevTotal => prevTotal + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive, countdownTime]);

    // Render the component
    return (
        <div style={{ height: '90vh', width:'100%', display: 'flex', flexDirection: 'column', padding: '0 65px 50px 50px', alignItems: 'center' }}>
            {/* Search input and locate button */}
            <div style={{ display: 'flex', marginBottom: '10px', width: '120%', justifyContent: 'center',marginTop:'2rem'}}>
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
            
            {/* Map container */}
            <div ref={mapRef} style={{ flex: 1, width: '120%', marginBottom: '10px', height: '60vh' }} />
            
            {/* Location error message */}
            {locationError && (
                <div style={{ color: 'red', padding: '10px', marginBottom: '10px', textAlign: 'center', width: '100%' }}>
                    {locationError}
                </div>
            )}
            
            {/* Timer display */}
            {showTimer && !dataSubmitted && (
                <div style={{ 
                    marginBottom: '10px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '15px',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '300px',
                    height: '200px',
                }}>
                    <h3 style={{
                        fontSize: '24px',
                        color: '#ffffff',
                        marginBottom: '10px',
                        textAlign: 'center',
                    }}>
                        {countdownTime !== null 
                            ? `Countdown: ${formatTime(countdownTime)}`
                            : `Total Time: ${formatTime(totalTime)}`
                        }
                    </h3>
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
    
            {/* Accumulated time and alcohol intake input */}
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
                        }}>Total Time: {formatTime(totalTime)}</h4>
                    </div>
                    {/* Alcohol intake input field */}
                    <TextField
                        label="Alcohol Intake"
                        variant="outlined"
                        value={alcoholIntake}
                        onChange={handleAlcoholIntakeChange}
                        placeholder="Enter volume (0-10000ml)"
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
                    {/* Submit button */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={submitData}
                        startIcon={<FaList />}
                        disabled={isSubmitDisabled}
                        sx={{
                            width: '90%',
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '10px',
                            height: '48px',
                            fontSize: '1rem'
                        }}
                    >
                        Submit
                    </Button>
                </div>
            )}
    
            {/* Recommended places display */}
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

            {/* Confirm location button */}
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
            
            {/* Reset button */}
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

            {/* Notification dialog */}
            <Dialog
                open={openNotification}
                onClose={() => handleNotificationResponse(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Time's Up!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your drink time ran out. Do you want to have a rest?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleNotificationResponse(false)} color="primary">
                        No, continue timing
                    </Button>
                    <Button onClick={() => handleNotificationResponse(true)} color="primary" autoFocus>
                        Yes, I'll rest
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success snackbar */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Submit successfully, searching surrounding entertainments
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Map;