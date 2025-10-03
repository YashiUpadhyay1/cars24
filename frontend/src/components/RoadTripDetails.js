import React, { useEffect, useState } from "react";
import { fetchTrips } from "../services/api";

const RoadTripDetails = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const { data } = await fetchTrips();
        setTrips(data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };
    loadTrips();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌍 Road Trips</h2>
      {trips.length === 0 ? (
        <p>No trips available</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip._id} style={{ marginBottom: "10px" }}>
              <strong>{trip.title}</strong> - {trip.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoadTripDetails;
