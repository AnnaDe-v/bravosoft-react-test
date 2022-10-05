import { post } from "./api";

export const createOrder = (data) => {
  return post(data);
};