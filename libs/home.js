import fetch from "isomorphic-unfetch";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const createTodo = (data) => {
  return fetch("http://localhost:8000/todolist", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const setAsComplete = (id, data) => {
  return fetch("http://localhost:8000/todolist/" + id, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const destroy = (id) => {
  return fetch("http://localhost:8000/todolist/", {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      ids: [id],
    }),
  }).then((res) => res.json());
};
