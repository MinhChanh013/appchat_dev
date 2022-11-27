import { USER } from "./_constant";
import { request_api } from "./request";

export const getallUser = async () => {
  return await request_api().get(USER.GETALL);
};

export const findPhone = async (phone) => {
  return await request_api().get(`${USER.FINDPHONE}/${phone}`);
};

export const findPhoneNotMe = async (phone) => {
  return await request_api().get(`${USER.FINDPHONENOTME}/${phone}`);
};

export const resetPass = async (value) => {
  return await request_api().post(USER.RESETPASS, value);
};

export const requestEditProfile = async (value) => {
  return await request_api().post(USER.EDITPROFILE, value);
};
