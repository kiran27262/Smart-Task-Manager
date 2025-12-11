const API_BASE = "http://localhost:8080/api";

export async function login(data) {
  return fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());
}

export async function registerUser(data) {
  return fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());
}

export async function getTasks(userId, token) {
  return fetch(`${API_BASE}/tasks?userId=${userId}`, {
    headers: { "Authorization": `Bearer ${token}` }
  }).then(r => r.json());
}

export async function createTask(userId, token, task) {
  return fetch(`${API_BASE}/tasks?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(task)
  }).then(r => r.json());
}

export async function updateTask(userId, token, taskId, task) {
  return fetch(`${API_BASE}/tasks/${taskId}?userId=${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(task)
  }).then(r => r.json());
}

export async function deleteTask(userId, token, taskId) {
  return fetch(`${API_BASE}/tasks/${taskId}?userId=${userId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(r => {
    if (r.status === 204) return true;
    return r.json();
  });
}
