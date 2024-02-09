import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="app__container">
      <Header />
      <Routes>
        <Route path="/sign-up" element={<Register />}></Route>
        <Route path="/sign-in" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
