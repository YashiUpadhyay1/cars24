import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",   // ✅ ye hona chahiye
});

export const fetchTrips = async () => {
  const res = await API.get("/trips");    // ✅ ye api/trips banega
  return res.data;
};

