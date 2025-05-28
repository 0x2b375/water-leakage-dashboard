# 💧 IoT Smart Water Leak Detection System

A full-stack application for real-time water leak monitoring using IoT sensors. This dashboard visualizes live and historical data to detect and alert on abnormal water flow.

---

## 🛠️ Tech Stack

### Frontend
- **React** + **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (for data viz)
- **shadcn/ui** (for UI components)
- **React Router DOM**

### Backend
- **Node.js** (or your backend stack)
- **Express.js** (or API framework of choice)
- **MongoDB / PostgreSQL** (or whatever DB you use)

---

## 📁 Project Structure

```
/project-root
├── frontend/      # Vite + React dashboard
├── backend/       # API and data processing
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/0x2b375/iot-water-dashboard.git
cd iot-water-dashboard
```

### 2. Setup Frontend

```bash
cd frontend
bun install
bun dev
```

### 3. Setup Backend

```bash
cd ../backend
npm install
npm start
```

Make sure to configure your `.env` file for backend (e.g. DB connection, port).

---

## 📊 Features

- ✅ Real-time flow rate monitoring
- ✅ Leak detection alerts
- ✅ Historical data charting
- ✅ Chart types: Area, Line, Bar
- ✅ Date range filtering
- ✅ Responsive layout
- ✅ Modern UI (shadcn + Tailwind)

---

## 📡 Data Format (Example)

```json
{
  "id": 1,
  "received_date": "2025-05-21T08:28:54.388Z",
  "flow_rate": 12.5
}
```
