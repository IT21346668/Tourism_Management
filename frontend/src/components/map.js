import React, { useState, useEffect } from 'react';

function Map() {
  const [map, setMap] = useState(null);
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.defer = true;
    script.async = true;

    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 8,
      });
      setMap(map);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function placeMarker(location) {
    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
    });
    return marker;
  }

  function calculateDistance() {
    if (marker1 && marker2) {
      const distance = window.google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition());
      setDistance(distance);
    }
  }

  return (
    <div>
      <h2>Map</h2>
      <div id="map" style={{ height: '400px' }}></div>
      <br />
      <button onClick={() => setMarker1(placeMarker({ lat: 37.7749, lng: -122.4194 }))}>Place Marker 1</button>
      <button onClick={() => setMarker2(placeMarker({ lat: 37.3382, lng: -121.8863 }))}>Place Marker 2</button>
      <br />
      <button onClick={calculateDistance}>Calculate Distance</button>
      <br />
      <h3>Distance: {distance} meters</h3>
    </div>
  );
}
