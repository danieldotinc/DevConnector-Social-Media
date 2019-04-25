import http from "./httpService";

const apiEndPiont = "/posts";

export function getPost() {
  return http.get(apiEndPiont);
}

export function getPosts() {
  return http.get(`${apiEndPiont}/all`);
}

export function addPost(post) {
  return http.post(apiEndPiont, post);
}

export function toggleLike(like) {
  return http.put(`${apiEndPiont}/like`, like);
}

export function addComment(comment) {
  return http.put(`${apiEndPiont}/comment`, comment);
}

export function editPost(post) {
  return http.put(`${apiEndPiont}/${post._id}`, post);
}

export function deleteComment(id) {
  return http.delete(`${apiEndPiont}/comment/${id}`);
}

export function deletePost() {
  return http.delete(apiEndPiont);
}
