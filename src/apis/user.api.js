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
