const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `HTTP error: ${response.status}`);
  }
  return data;
}

export const taskApi = {
  async getAll() {
    const response = await fetch(`${BASE_URL}/tasks`);
    return handleResponse(response);
  },

  async create(title) {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    return handleResponse(response);
  },

  async update(id, updates) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  async delete(id) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
