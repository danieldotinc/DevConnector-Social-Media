import http from "./httpService";

const apiEndPiont = "/profile";

export function getProfile() {
  return http.get(apiEndPiont);
}

export function getProfiles() {
  return http.get(`${apiEndPiont}/all`);
}

export function getGithubRepositories(data) {
  const { clientId, clientSecret, count, sort, username } = data;
  return http.get(
    `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
  );
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
