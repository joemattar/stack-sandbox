import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuperheroController from "../services/superheroController";

// For getting data & update, delete the Superhero,
// this component will use 3 SuperheroController functions:
// get()
// update()
// remove()

// We also use the Effect Hook useEffect() to get Superhero by id
// in the URL (with the help of useParams() hook).

const Superhero = (props) => {
  // The useParams hook returns an object of key/value pairs of the dynamic params
  // from the current URL that were matched by the <Route path>.
  // Child routes inherit all params from their parent routes.

  // Here id is obtained from route "/react/superhero/:id"
  const { id } = useParams();
  let navigate = useNavigate();

  const initialSuperheroState = {
    id: null,
    name: "",
    description: "",
  };
  const [currentSuperhero, setCurrentSuperhero] = useState(
    initialSuperheroState
  );
  const [message, setMessage] = useState("");

  const getSuperhero = (id) => {
    SuperheroController.get(id)
      .then((response) => {
        setCurrentSuperhero(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // This way, the useEffect hook will re-run anytime the dependency (id) changes.
  useEffect(() => {
    if (id) getSuperhero(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSuperhero({ ...currentSuperhero, [name]: value });
  };

  const updateSuperhero = () => {
    SuperheroController.update(currentSuperhero.id, currentSuperhero)
      .then((response) => {
        console.log(response.data);
        setMessage("The superhero was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSuperhero = () => {
    SuperheroController.remove(currentSuperhero.id)
      .then((response) => {
        console.log(response.data);
        navigate("/react/superhero");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSuperhero ? (
        <div className="edit-form">
          <h4>Superhero</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentSuperhero.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentSuperhero.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteSuperhero}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSuperhero}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Superhero...</p>
        </div>
      )}
    </div>
  );
};

export default Superhero;
