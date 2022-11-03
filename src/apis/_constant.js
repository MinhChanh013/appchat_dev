// api auth
export const AUTH = {
  LOGIN: "/auth/login",
  REGISTER: "auth/register",
  VERIFYACCOUNT: "auth/exist_account",
  PROFILE: "auth/profile",
};

export const USER = {
  GETALL: "/user",
  ADDFRIEND: "/user/addfriend",
  FINDPHONE: "/user",
  FRIEND: "/user/friend",
};

export const FRIEND = {
  GETALL: "/friend",
  REQUEST: "/friend/request",
  APPLY: "friend/apply",
};

export const CHAT = {
  GETCHATPRIVATED: "/listchat",
  CREATECHATPRIVATED: "/listchat",
  GETCHATALL: "/listchat",
};

export const MESSAGE = {
  ADDMESSAGE: "/listmessage/addMessage",
};

export const IMAGES = {
  UPLOADIMAGE: "/images",
};
