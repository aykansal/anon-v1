import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Builder } from "./pages/Builder";
import Landing from "./pages/Landing";
import Github from "./pages/Github";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/github" element={<Github />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
