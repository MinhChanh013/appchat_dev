import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:4001",
});

let token = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key.trim()]: decodeURIComponent(value),
    }),
    {}
  );

const token_api = token.token;
request.defaults.headers.common["Authorization"] = `Bearer ${token_api}`;

export default request;
