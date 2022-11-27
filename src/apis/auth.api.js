import { AUTH } from "./_constant";
import { request_api } from "./request";

export const loginApi = async (values) => {
  return await request_api().post(AUTH.LOGIN, values);
};

export const registerApi = async (values) => {
  return await request_api().post(AUTH.REGISTER, values);
};

export const verifyApi = async (values) => {
  return await request_api().post(AUTH.VERIFYACCOUNT, values);
};

export const getProfile = async () => {
  return await request_api().get(AUTH.PROFILE);
};

export const onlineUser = async () => {
  return await request_api().put(AUTH.ONLINE);
};

export const offlineUser = async () => {
  return await request_api().put(AUTH.OFFLINE);
};

export const confirmMyPhone = async (value) => {
  return await request_api().post(AUTH.CONFIRMPHONE, value);
};
