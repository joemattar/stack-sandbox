import http from "../http/axios";

// Fetch list of superheroes
// GET /api/superhero
const getAll = () => {
  return http.get("/api/superhero");
};

// Create superhero
// Route POST /api/superhero
const create = (data) => {
  return http.post("/api/superhero", data);
};

// Fetch superhero by id
// Route GET /api/superhero/:id
const get = (id) => {
  return http.get(`/api/superhero/${id}`);
};

// Update superhero by id
// Route PUT /api/superhero/:id
const update = (id, data) => {
  return http.put(`/api/superhero/${id}`, data);
};

// Delete superhero by id
// Route DELETE /api/superhero/:id
const remove = (id) => {
  return http.delete(`/api/superhero/${id}`);
};

const SuperheroController = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default SuperheroController;
