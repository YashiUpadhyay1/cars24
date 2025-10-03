import React, { useEffect, useState } from "react";
import { fetchTrips } from "../services/api";

const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await fetchTrips();
        console.log("Trips from backend:", data);  // ✅ Browser console me aayega
        setTrips(data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };
    loadTrips();
  }, []);

  return (
    <div>
      <h1>🚀 RoadTrip Planner</h1>
      <h2>🌍 Road Trips</h2>
      {trips && trips.length > 0 ? (
        trips.map((trip) => (
          <div key={trip._id}>
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
          </div>
        ))
      ) : (
        <p>No trips available</p>
      )}
    </div>
  );
};

export default Home;
