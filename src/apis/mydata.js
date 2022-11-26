import { getProfile } from "./auth.api";

export const myphone = getProfile().then((course) => {
  return course.data.phone;
});
