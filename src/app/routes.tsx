import { Route, Routes } from "react-router-dom";
import { HistoryPage } from "../pages/HistoryPage";
import { HomePage } from "../pages/HomePage";
import { ResultPage } from "../pages/ResultPage";
import { SessionPage } from "../pages/SessionPage";
import { SettingsPage } from "../pages/SettingsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/session" element={<SessionPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}
