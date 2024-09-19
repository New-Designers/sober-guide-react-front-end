// Import React and necessary hooks
import React, { useEffect, useRef } from 'react';

type GoogleMapsProps = {
    apiKey: string;
};

const Map: React.FC<GoogleMapsProps> = ({ apiKey }) => {
    const mapRef = useRef<HTMLDivElement>(null);  // Ref for the map container
    const inputRef = useRef<HTMLInputElement>(null);  // Ref for the autocomplete input

    useEffect(() => {
        const initMap = () => {
            if (!mapRef.current || !inputRef.current) return;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });

            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                types: ["geocode"],
            });
            autocomplete.setFields(["formatted_address", "geometry"]);
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    map.panTo(place.geometry.location);
                    map.setZoom(15);
                } else {
                    inputRef.current!.placeholder = "Enter a place"; // Fallback placeholder text
                }
            });
            
        };

        // Load the Google Maps script asynchronously
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly`;
        script.async = true;
        script.defer = true;
        script.onload = () => initMap();
        document.body.appendChild(script);

        return () => {
            // Clean up the script element
            document.body.removeChild(script);
        };
    }, [apiKey]);

    return (
        <div>
            <input ref={inputRef} id="location-input" placeholder="Search location" type="text" />
            <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default Map;
