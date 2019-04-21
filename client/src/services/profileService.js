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
