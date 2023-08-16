import Content from "./components/Content";
import { Routes, Route } from "react-router-dom";

import Setting from "./components/Setting";
import Table from "./components/Table";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </>
  );
}

export default App;
