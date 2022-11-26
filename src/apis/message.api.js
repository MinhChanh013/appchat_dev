import { MESSAGE } from "./_constant";
import { request_api } from "./request";

export const requestAddMessage = async (value) => {
  return await request_api().post(MESSAGE.ADDMESSAGE, value);
};

export const requestDeleteMessage = async (value) => {
  return await request_api().post();
};

export const requestAddMessListFile = async (value) => {
  return await request_api().post(MESSAGE.ADDMESSLISTFILE, {
    list_file: value,
  });
};

export const requestDeleteMessTo = async (value) => {
  return await request_api().post(MESSAGE.DELETEMESSTO, value);
};

export const requestRevokeMessTo = async (value) => {
  return await request_api().post(MESSAGE.REVOKEMESSTO, value);
};

export const requestAddEmoji = async (value) => {
  return await request_api().post(MESSAGE.ADDEMOJI, value);
};

