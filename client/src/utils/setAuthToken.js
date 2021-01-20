import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    //Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete token
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setAuthToken;
