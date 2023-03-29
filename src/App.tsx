import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campsite from "./scences/Campsites";
import Create from "./scences/Campsites/Create";
import Edit from "./scences/Campsites/Edit";
import Show from "./scences/Campsites/Show";
import Login from "./scences/LoginPage";
import Register from "./scences/RegisterPage";
import Error from "./components/Error";
import Password from "./scences/Password";


function App() {
  const { mode} = useSelector((state: RootState) => state.authMaterial);
  return (
    <div
      className={`app bg-${mode === "light" ? "light" : "black text-light"}`}
    >
      <Error />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Campsite />} />
          <Route path="/campsites/create" element={<Create />} />
          <Route path="/campsites/:id" element={<Show />} />
          <Route path="/campsites/:id/edit" element={<Edit />} />
          <Route path="/password"element={<Password/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
