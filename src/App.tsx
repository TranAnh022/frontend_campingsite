
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campsite from "./scences/Campsites";
import Create from "./scences/Campsites/Create";
import Edit from "./scences/Campsites/Edit";
import Show from "./scences/Campsites/Show";
import Login from "./scences/LoginPage";
import Register from "./scences/RegisterPage";


function App() {
  const {mode}= useSelector((state:any)=>state)
  return (
    <div
      className={`app bg-${
        mode === "light" ? "light" : "black text-light"}`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Campsite />} />
          <Route path="/campsites/create" element={<Create />} />
          <Route path="/campsites/:id" element={<Show />} />
          <Route path="/campsites/:id/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
