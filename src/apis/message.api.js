import { MESSAGE } from "./_constant";
import { request_api } from "./request";

export const requestAddMessage = async (value) => {
  return await request_api().post( MESSAGE.ADDMESSAGE, value);
};
