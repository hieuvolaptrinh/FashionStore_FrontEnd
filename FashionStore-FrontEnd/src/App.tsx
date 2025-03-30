import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./routes/AdminLayout";
import UserLayout from "./routes/UserLayou";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
