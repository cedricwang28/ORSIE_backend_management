import { get, post, put, del } from "../utils/request";

/**
 * @param {*} page
 */
// export function listApi(page = 1) {
//   return get("/api/users", { page, per: 2 });
// }
export function listApi() {
    return get("/api/events");
}


/**
 * @param {*} data
 */
export function createApi(data) {
  return post("/api/event", data);
}

/**
 * @param {*} id
 */
export function getOneById(id) {
  return get(`/api/events/${id}`);
}

export function selectYearApi(data) {
    return post("/api/year", data);
}

export function addYearApi(data) {
  return post("/api/addyear", data);
}

export function updateYearApi(data) {
  return post("/api/updateyear", data);
}

export function getActiveApi() {
  return get("/api/activeyear");
}


export function getYearsApi() {
  return get("/api/addyear");
}

/**
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id, data) {
  return put(`/api/events/${id}`, data);
}

/**
 * @param {*} id
 * @param {*} data
 */
export function delOne(id) {
  return del(`/api/events/${id}`);
}


export function chooseEventApi(data) {
  return post("/api/chooseEvent", data);
}
