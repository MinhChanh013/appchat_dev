// api auth
export const AUTH = {
  LOGIN: "/auth/login",
  REGISTER: "auth/register",
  VERIFYACCOUNT: "auth/exist_account",
  PROFILE: "auth/profile",
  ONLINE: "auth/online",
  OFFLINE: "auth/offline",
};

export const USER = {
  GETALL: "/user",
  ADDFRIEND: "/user/addfriend",
  FINDPHONE: "/user",
  FRIEND: "/user/friend",
  FINDPHONENOTME: "/user/find_phone",
  FINDNAME: "/user/find_name",
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
  CREATECHATGROUP: "/listchat",
  REANEMCHATGROUP: "/listchat/rename",
  DETELEHISTORYCHAT: "/listchat/remove_history",
  CHANGEROLE: "/listchat/changeRole",
  OUTGROUP: "/listchat/outGroup",
  REMOVEMEMBER: "/listchat/removemember",
  REMOVEROOM: "/listchat/removeroom",
  GETALLFILES: "/listchat/allFiles",
  GETALLIMAGES: "/listchat/allImages",
};

export const MESSAGE = {
  ADDMESSAGE: "/listmessage/addMessage",
  DELETEMESSAGE: "/listmessage/deleteMessage",
  ADDMESSLISTFILE: "/listmessage/addMessageFile",
  DELETEMESSTO: "/listmessage/deleteTo",
  REVOKEMESSTO: "/listmessage/revoke",
  ADDEMOJI: "/listmessage/add_emoji",
};

export const IMAGES = {
  UPLOADIMAGE: "/images",
};
