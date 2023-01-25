import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuperheroController from "../services/superheroController";

// There will be:
// a superheroes array displayed as a list on the left.
// a selected superhero which is shown on the right.
const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [currentSuperhero, setCurrentSuperhero] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // We’re gonna use the Effect Hook: useEffect() to fetch the data from the Web API.
  // This Hook tells React that the component needs to do something
  // after render or performing the DOM updates. In this effect, we perform data fetching from API.
  useEffect(() => {
    retrieveSuperheroes();
  }, []);

  const retrieveSuperheroes = () => {
    SuperheroController.getAll()
      .then((response) => {
        setSuperheroes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveSuperhero = (superhero, index) => {
    setCurrentSuperhero(superhero);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Superheroes List</h4>

        <ul className="list-group">
          {superheroes &&
            // map() reates a new array with the result of calling a function for each array element
            superheroes.map((superhero, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveSuperhero(superhero, index)}
                key={index}
              >
                {superhero.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentSuperhero ? (
          <div>
            <h4>Superhero</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentSuperhero.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentSuperhero.description}
            </div>

            <Link
              to={"/react/superhero/" + currentSuperhero.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Superhero...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperheroList;
