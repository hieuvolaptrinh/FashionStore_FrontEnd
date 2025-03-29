import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayou";
import AdminLayout from "./AdminLayout";

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
