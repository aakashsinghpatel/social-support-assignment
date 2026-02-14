import axios, { AxiosError } from "axios";

/* 
* It contains all configuration for axios
*/

/* Create openAI cliet of axios to handle open AI call */
const OpenAiclient = axios.create({
  baseURL: `${import.meta.env.VITE_OPENAI_BASE_URL}`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
    "Content-Type": "application/json",
  },
});

/*  Error handler : Handel varius error code, Timeout etc
* It handle all error based on status code and return error message accordingly
* used for OpenAIClient
*/
const erroHandler = (error: AxiosError) => {
  let message = "Something went wrong";
  // Timeout error
  if (error.code === "ECONNABORTED") {
    message = "Request timeout. Please try again.";
  }
  // Network error (no response from server)
  else if (!error.response) {
    message = "Network error. Please check your internet connection.";
  }
  // Server responded with error status
  else {
    const status = error.response.status;
    switch (status) {
      case 400:
        message = "Bad request.";
        break;
      case 401:
        message = "Unauthorized. Please use valid token.";
        break;
      case 403:
        message = "You don't have permission to access this.";
        break;
      case 404:
        message = "Requested resource not found.";
        break;
      case 500:
        message = "Internal server error. Please try later.";
        break;
      default:
        message = "Unexpected server error.";
    }
  }

  return Promise.reject({
    status: error.response?.status,
    message,
    originalError: error,
  });
};

/* OpenAI client interceptors */
OpenAiclient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

OpenAiclient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => erroHandler(error),
);


export { OpenAiclient };
