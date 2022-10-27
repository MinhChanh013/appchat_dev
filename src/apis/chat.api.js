import { CHAT } from "./_constant";
import { request_api } from "./request";

export const getChatPrivated = async (values) => {
  return await request_api().get(`${CHAT.GETCHATPRIVATED}/${values.phone}/2`);
};

export const createChatPrivated = async (member) => {
  return await request_api().post(CHAT.CREATECHATPRIVATED, {
    member: member,
    count_member: 2,
  });
};
