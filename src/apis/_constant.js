// api auth
export const AUTH = {
  LOGIN: "/auth/login",
  REGISTER: "auth/register",
  VERIFYACCOUNT: "auth/exist_account",
  PROFILE: "auth/profile",
  ONLINE: "auth/online",
  OFFLINE: "auth/offline",
  CONFIRMPHONE: "auth/confirm_phone",
};

export const USER = {
  GETALL: "/user",
  ADDFRIEND: "/user/addfriend",
  FINDPHONE: "/user",
  FRIEND: "/user/friend",
  FINDPHONENOTME: "/user/find_phone",
  FINDNAME: "/user/find_name",
  RESETPASS: "/user/resetPassword",
  EDITPROFILE: "/user/editProfile",
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
  RENAMEFRIEND: "/listchat/rename_Friend",
  ADDMEMBER: "/listchat/addmember",
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
