import { get, post, put, del } from "../utils/request";

/**
 * @param {*} page
 */
// export function listApi(page = 1) {
//   return get("/api/users", { page, per: 2 });
// }
export function listApi() {
    return get("/api/users");
}

export function downloadApi() {
    return get("/api/download",{responseType: 'arraybuffer'});
}

export function searchApi(data) {
    return post("/api/search", data);
}

export function filterApi(data) {
    return post("/api/filter", data);
}

/**
 * @param {*} data
 */
export function createApi(data) {
  return post("/api/v1/admin/products", data);
}

/**
 * @param {*} id
 */
export function getOneById(id) {
  return get(`/api/v1/admin/products/${id}`);
}

/**
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id, data) {
  return put(`/api/v1/admin/products/${id}`, data);
}

/**
 * @param {*} id
 * @param {*} data
 */
export function delOne(id) {
  return del(`/api/users/${id}`);
}
