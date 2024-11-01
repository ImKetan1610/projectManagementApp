import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/Pages/HomePages/HomePage";
import Board from "./Components/Board/Board";
import Analytics from "./Components/Analytics/Analytics";
import Settings from "./Components/Settings/Settings";
import AuthPages from "./Components/Pages/AuthPages/AuthPages";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import ShareTask from "./Components/ShareTask/ShareTask";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        { path: "board", element: <Board /> },
        { path: "analytics", element: <Analytics /> },
        { path: "settings", element: <Settings /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthPages />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {path: "/shareTask/:id", element: <ShareTask/>}
  ]);

  return <RouterProvider router={router} />;
}

export default App;
