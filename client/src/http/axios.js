import axios from "axios";

// CHANGE baseURL after deployment
export default axios.create({
  baseURL: process.env.BASEURL,
  headers: {
    "Content-type": "application/json",
  },
});
