import { useEffect, useState } from "react";
import "./App.css";
import TasksList from "./pages/Tasks";
import "tailwindcss/tailwind.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    localStorage.getItem("user") ? setUser(true) : setUser(false);
  }, [user]);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="/" element={<Login setUser={setUser}/>} />
        ) : (
          <Route path="/" element={<TasksList />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
