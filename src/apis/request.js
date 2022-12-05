import axios from "axios";

export const request_api = () => {
  const request = axios.create({
    // baseURL: "http://localhost:4001",
    baseURL: "https://appchat-be.herokuapp.com",
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

  const token_api = token.token_api;
  request.defaults.headers.common["Authorization"] = `Bearer ${token_api}`;

  return request
};
