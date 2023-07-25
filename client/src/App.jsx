import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/tasks" element={<h1>tasks page</h1>}></Route>
        <Route path="/add-task" element={<h1>new task page</h1>}></Route>
        <Route path="/tasks/:id" element={<h1>update page</h1>}></Route>
        <Route path="/profile" element={<h1>profile page</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
