import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function fetchPosts(start = 0, limit = 12) {
  const res = await axios.get(`${BASE_URL}?_start=${start}&_limit=${limit}`);
  return res.data;
}
export async function getDetails(id) {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
}
export async function getComments(id) {
  const res = await axios.get(`${BASE_URL}/${id}/comments`);
  return res.data;
}
