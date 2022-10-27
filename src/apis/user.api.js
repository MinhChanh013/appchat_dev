import { USER } from "./_constant";
import { request_api } from "./request";

export const getallUser = async () => {
  return await request_api().get(USER.GETALL);
};

export const addFriend = async (phone) => {
  return await request_api().post(USER.ADDFRIEND, phone);
};

export const findPhone = async (phone) => {
  return await request_api().get(`${USER.FINDPHONE}/${phone}`);
};

export const showFriend = async () => {
  return await request_api().get(USER.FRIEND);
};
