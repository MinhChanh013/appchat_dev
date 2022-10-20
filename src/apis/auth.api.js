import { AUTH } from "./_constant";
import request from "./request";

// import { useMutation } from "@tanstack/react-query";

export const loginApi = async(values) => {
  return await request.post(AUTH.LOGIN, values)
};


export const registerApi = async(values) => {
  return await request.post(AUTH.REGISTER, values)
};

