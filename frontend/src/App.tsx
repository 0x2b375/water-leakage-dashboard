import { InstallPWAButton } from "./components/pwa-button";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <main>
      <AppRouter />
      <InstallPWAButton />
    </main>
  );
}

export default App;
