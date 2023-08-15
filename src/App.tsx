import Content from "./components/Content";
import { Routes, Route } from "react-router-dom";

import Setting from "./components/Setting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
}

export default App;
