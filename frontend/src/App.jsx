import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./integrals/Home";
import TabList from "./integrals/TabList";
import OwnerView from "./integrals/OwnerView";
import MemberFInal from "./integrals/MemberFInal";
import Upload from "./integrals/Upload";
import MemberHome from "./integrals/MemberHome";
import GetLink from "./integrals/GetLink";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code" element={<TabList />}/>
          <Route path="/code/owner-view" element={<OwnerView />} />
          <Route path="/member_final" element={<MemberFInal />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/member_home" element={<MemberHome />} /> 
          <Route path="/get_link" element={<GetLink />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
