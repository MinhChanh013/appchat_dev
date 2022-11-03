import { IMAGES } from "./_constant";
import { request_api } from "./request";

export const uploadFile = async (image) => {
  return await request_api().post(IMAGES.UPLOADIMAGE, image);
};
