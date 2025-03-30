import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./integrals/Home";
import MemberFInal from "./integrals/MemberFInal";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member_final" element={<MemberFInal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
