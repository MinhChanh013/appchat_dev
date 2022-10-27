import { FRIEND } from "./_constant";
import { request_api } from "./request";

export const getAllFriend = async () => {
  return await request_api().get(FRIEND.GETALL);
};

export const requestAddFriend = async (value) => {
  return await request_api().post(FRIEND.REQUEST, value);
};

export const requestApplyFriend = async (value) => {
  return await request_api().post(FRIEND.APPLY, value);
};
