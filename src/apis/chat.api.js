import { CHAT } from "./_constant";
import { request_api } from "./request";

export const getChatPrivated = async (values) => {
  return await request_api().get(`${CHAT.GETCHATPRIVATED}/${values.phone}/2`);
};

export const createChatPrivated = async (member, name) => {
  return await request_api().post(CHAT.CREATECHATPRIVATED, {
    list_member: member,
    name: name,
  });
};
