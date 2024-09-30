import React, { useEffect, useRef } from 'react';

type GoogleMapsProps = {
    apiKey: string;
};

const Map: React.FC<GoogleMapsProps> = ({ apiKey }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const map = useRef<google.maps.Map | null>(null); // Store map instance

    useEffect(() => {
        const initMap = () => {
            if (!mapRef.current || !inputRef.current) return;

            map.current = new google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 }, // Default center
                zoom: 8, // Default zoom
            });

            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                types: ["geocode"],
            });
            autocomplete.setFields(["formatted_address", "geometry"]);
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    map.current!.panTo(place.geometry.location);
                    map.current!.setZoom(15);
                } else {
                    inputRef.current!.placeholder = "Enter a place";
                }
            });

            // Auto-locate the user's current position
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        map.current!.setCenter(userLocation);
                        map.current!.setZoom(16); // Set zoom to street level
                        new google.maps.Marker({
                            position: userLocation,
                            map: map.current,
                            title: "You are here!",
                        });
                    },
                    () => {
                        handleLocationError(true, map.current!);
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, map.current!);
            }
        };

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
        script.async = true;
        script.defer = true;
        script.onload = () => initMap();
        script.onerror = () => {
            console.error('Error loading Google Maps script');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [apiKey]);

    const handleLocationError = (browserHasGeolocation: boolean, map: google.maps.Map) => {
        const infoWindow = new google.maps.InfoWindow();
        const message = browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.";
        infoWindow.setPosition(map.getCenter());
        infoWindow.setContent(message);
        infoWindow.open(map);
    };

   
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <input
                ref={inputRef}
                id="location-input"
                placeholder="Search location"
                type="text"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
            />
            <div ref={mapRef} style={{ flex: 1, width: '100%' }} />
        </div>
    );
};


export default Map;
