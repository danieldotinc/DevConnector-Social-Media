import http from "./httpService";

const apiEndPiont = "/posts";

export function getPost(id) {
  return http.get(`${apiEndPiont}/${id}`);
}

export function getPosts() {
  return http.get(apiEndPiont);
}

export function addPost(post) {
  return http.post(apiEndPiont, post);
}

export function toggleLike(like) {
  return http.put(`${apiEndPiont}/like`, like);
}

export function addComment(postId, comment) {
  return http.post(`${apiEndPiont}/comment/${postId}`, comment);
}

export function editPost(post) {
  return http.put(`${apiEndPiont}/${post._id}`, post);
}

export function deleteComment(postId, commentId) {
  return http.delete(`${apiEndPiont}/comment/${postId}/${commentId}`);
}

export function deletePost(id) {
  return http.delete(`${apiEndPiont}/${id}`);
}

export function likePost(id) {
  return http.post(`${apiEndPiont}/like/${id}`);
}
