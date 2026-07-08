import { BrowserRouter, Routes, Route } from "react-router-dom";
import RevUp from "./pages/RevUp";
import RevUpDemo from "./pages/RevUpDemo";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RevUp />} />
      <Route path="/demo" element={<RevUpDemo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
