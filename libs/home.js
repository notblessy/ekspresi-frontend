import fetch from "isomorphic-unfetch";
import config from "../config";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const createTodo = (data) => {
  return fetch(config.BASE_URL + "/todolist", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const setAsComplete = (id, data) => {
  return fetch(config.BASE_URL + "/todolist/" + id, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const destroy = (id) => {
  return fetch(config.BASE_URL + "/todolist/", {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      ids: [id],
    }),
  }).then((res) => res.json());
};
