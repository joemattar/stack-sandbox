import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Dashboard from "./components/Dashboard";
import SuperheroList from "./components/SuperheroList";
import AddSuperhero from "./components/AddSuperhero";
import Superhero from "./components/Superhero";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div>STACK SANDBOX REACT</div>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/react/superhero"} className="nav-link">
              Superheroes List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/react/superhero/create"} className="nav-link">
              Add Superhero
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/react" element={<Dashboard />} />
          <Route path="/react/superhero" element={<SuperheroList />} />
          <Route path="/react/superhero/create" element={<AddSuperhero />} />
          <Route path="/react/superhero/:id" element={<Superhero />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
