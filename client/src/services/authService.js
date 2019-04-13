import http from "./httpService";

const apiEndPoint = "/auth";
const keyToken = "token";

http.setJwt(getJwt());

export async function login(user) {
  const { data: jwt } = await http.post(apiEndPoint, user);
  localStorage.setItem(keyToken, jwt);
}

export function getJwt() {
  return localStorage.getItem(keyToken);
}

export default {
  login
};
