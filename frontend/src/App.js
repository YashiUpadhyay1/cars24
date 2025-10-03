// src/components/Home.js
import React, { useEffect, useState } from "react";

function Home() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Backend running hona chahiye http://localhost:5000
    fetch("http://localhost:5000/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  return (
    <div>
      <h1>🚀 RoadTrip Planner</h1>
      <h2>🌍 Road Trips</h2>
      {trips.length === 0 ? (
        <p>No trips available</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip._id}>
              <strong>{trip.title}</strong>: {trip.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
