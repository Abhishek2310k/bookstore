import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

import Add from "./Add/Add";
import Update from "./Update/Update";
import Books from "./Books/Books";
import Login from "./Auth/Login/Login";
import Signup from "./Auth/Signup/Signup"
import Navbar from "./Navbar/Navbar";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Books/>,
    },
    {
      path: "/add",
      element: <Add/>,
    },
    {
      path: "/update/:id",
      element: <Update/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    }
  ]);

  return (
    <div className="App">
      <React.StrictMode>
        <Navbar/>
        <RouterProvider router={router} />
      </React.StrictMode> 
    </div>
  );
}

export default App;
