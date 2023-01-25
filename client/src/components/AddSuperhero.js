import React, { useState } from "react";
import SuperheroController from "../services/superheroController";

// This component has a Form to submit new Superhero with 2 fields: name & description.
const AddSuperhero = () => {
  const initialSuperheroState = {
    name: "",
    description: "",
  };

  // First, we define and set initial states of superhero & submitted.
  const [superhero, setSuperhero] = useState(initialSuperheroState);
  const [submitted, setSubmitted] = useState(false);

  // handleInputChange() function tracks the values of the input and set that state for changes.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSuperhero({ ...superhero, [name]: value });
  };

  // Function to get tutorial state and send the POST request to the Web API.
  // It calls SuperheroController.create() method.
  const saveSuperhero = () => {
    var data = {
      name: superhero.name,
      description: superhero.description,
    };

    SuperheroController.create(data)
      .then((response) => {
        setSuperhero({
          name: response.data.name,
          description: response.data.description,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newSuperhero = () => {
    setSuperhero(initialSuperheroState);
    setSubmitted(false);
  };

  // For return, we check the submitted state, if it is true,
  // we show Add button for creating new Tutorial again.
  // Otherwise, a Form with Submit button will display.
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSuperhero}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={superhero.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={superhero.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveSuperhero} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSuperhero;
