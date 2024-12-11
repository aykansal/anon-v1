import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Github from "./pages/Github";
import Landing from "./pages/Landing";
import { Builder } from "./pages/Buider-new";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/builder" element={<Builder />} />
        <Route path="/github" element={<Github />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
