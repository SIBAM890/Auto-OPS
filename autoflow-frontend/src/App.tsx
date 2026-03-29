import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlatformLayout from "./components/layout/PlatformLayout";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import DeployPage from "./pages/DeployPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Private Platform View */}
        <Route element={<PlatformLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/deploy-agent" element={<DeployPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
