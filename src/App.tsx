import { BrowserRouter, Routes, Route } from "react-router-dom";
import RevUp from "./pages/RevUp";
import NotFound from "./pages/NotFound";
import DemoLayout from "./pages/demo/DemoLayout";
import Overview from "./pages/demo/Overview";
import ReportingDashboard from "./pages/demo/ReportingDashboard";
import ModulesGrid from "./pages/demo/ModulesGrid";
import ModuleReport from "./pages/demo/ModuleReport";
import Scorecard from "./pages/demo/Scorecard";
import SpendRecovery from "./pages/demo/SpendRecovery";
import FixList from "./pages/demo/FixList";
import GtmBlueprint from "./pages/demo/GtmBlueprint";
import Resources from "./pages/demo/Resources";
import FullReport from "./pages/demo/FullReport";
import Integrations from "./pages/demo/Integrations";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RevUp />} />
      <Route path="/demo" element={<DemoLayout />}>
        <Route index element={<Overview />} />
        <Route path="dashboard" element={<ReportingDashboard />} />
        <Route path="modules" element={<ModulesGrid />} />
        <Route path="modules/:id" element={<ModuleReport />} />
        <Route path="scorecard" element={<Scorecard />} />
        <Route path="spend" element={<SpendRecovery />} />
        <Route path="fixlist" element={<FixList />} />
        <Route path="gtm" element={<GtmBlueprint />} />
        <Route path="resources" element={<Resources />} />
        <Route path="report" element={<FullReport />} />
        <Route path="integrations" element={<Integrations />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
