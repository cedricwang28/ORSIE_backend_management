import { post } from "../utils/request";

/**
 * @param {*} user
 *  userName
 *  password
 */
export function loginApi(user) {
  return post("/api/admin_login", user);
}
