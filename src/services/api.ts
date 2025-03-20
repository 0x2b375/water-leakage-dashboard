export async function fetchSensorData() {
  try {
    const response = await fetch("https://your-backend-api/sensor-data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
  catch (error) {
    console.error("Failed to fetch sensor data:", error);
    throw error;
  }
}
