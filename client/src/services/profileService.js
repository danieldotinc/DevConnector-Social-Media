import http from "./httpService";

const apiEndPiont = "/profile";

export function getProfile() {
  return http.get(apiEndPiont);
}

export function getProfileByHandle(handle) {
  return http.get(`${apiEndPiont}/handle/${handle}`);
}

export function addProfile(profile) {
  return http.post(apiEndPiont, profile);
}

export function addExperience(experience) {
  return http.put(`${apiEndPiont}/experience`, experience);
}

export function addEducation(education) {
  return http.put(`${apiEndPiont}/education`, education);
}

export function editProfile(profile) {
  return http.put(`${apiEndPiont}/${profile._id}`, profile);
}

export function deleteEducation(id) {
  return http.delete(`${apiEndPiont}/education/${id}`);
}

export function deleteExperience(id) {
  return http.delete(`${apiEndPiont}/experience/${id}`);
}

export function deleteAccount() {
  return http.delete(apiEndPiont);
}
