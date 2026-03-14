import { useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  const handleWelcomeComplete = (name: string) => {
    setUserName(name);
  };

  if (!userName) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <DashboardLayout>
      <Dashboard userName={userName} />
    </DashboardLayout>
  );
}

export default App;