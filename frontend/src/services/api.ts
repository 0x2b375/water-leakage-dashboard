import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export async function fetchSensorData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/flow/history`);
    console.warn(response);
    return response.data.map((entry: { id: number; received_date: string; flow_rate: number }) => ({
      id: entry.id,
      date: new Date(entry.received_date).toISOString(),
      flowRate: entry.flow_rate ?? 0,
    }));
  }
  catch (error) {
    console.error("Failed to fetch sensor data:", error);
    return [];
  }
}

export async function fetchLatestSensorData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/flow`);
    const entry = response.data;

    return {
      flowRate: entry.flow_rate ?? 0,
      receivedDate: entry.received_date ?? null,
      id: entry.id,
    };
  }
  catch (error) {
    console.error("Failed to fetch latest sensor data:", error);
    return {
      flowRate: 0,
      receivedDate: null,
    };
  }
}
