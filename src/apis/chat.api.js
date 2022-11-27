import { CHAT } from "./_constant";
import { request_api } from "./request";

export const getChatPrivated = async (values) => {
  return await request_api().get(`${CHAT.GETCHATPRIVATED}/${values}/2`);
};

export const createChatPrivated = async (member, name) => {
  return await request_api().post(CHAT.CREATECHATPRIVATED, {
    list_member: member,
    name: name,
  });
};

export const getAllChat = async () => {
  return await request_api().get(CHAT.GETCHATALL);
};

export const getIdChat = async (id) => {
  return await request_api().get(`${CHAT.GETCHATALL}/${id}`);
};

export const createChatGroup = async (value) => {
  return await request_api().post(CHAT.CREATECHATGROUP, value);
};

export const renameChatGroup = async (value) => {
  return await request_api().put(CHAT.REANEMCHATGROUP, value);
};

export const deleteHistoryChat = async (value) => {
  return await request_api().post(CHAT.DETELEHISTORYCHAT, value);
};

export const requestChangeRole = async (value) => {
  return await request_api().put(CHAT.CHANGEROLE, value);
};

export const requestOutGroup = async (value) => {
  return await request_api().put(CHAT.OUTGROUP, value);
};

export const requestRemoveMember = async (value) => {
  return await request_api().put(CHAT.REMOVEMEMBER, value);
};

export const requestRemoveRoom = async (value) => {
  return await request_api().put(CHAT.REMOVEROOM, value);
};

export const requestGetAllImages = async (value) => {
  return await request_api().post(CHAT.GETALLIMAGES, value);
};

export const requestGetAllFiles = async (value) => {
  return await request_api().post(CHAT.GETALLFILES, value);
};

export const requestRenameFriend = async (value) => {
  return await request_api().post(CHAT.RENAMEFRIEND, value);
};

export const requestAddMember = async (value) => {
  return await request_api().put(CHAT.ADDMEMBER, value);
};
