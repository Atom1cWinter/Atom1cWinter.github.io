import { Navigate, Route, Routes } from "react-router-dom";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import LegacyPage from "./components/LegacyPage";
import { allRoutes } from "./routes";

function App() {
  return (
    <>
      <SiteHeader />
      <Routes>
        {allRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<LegacyPage route={route} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </>
  );
}

export default App;
