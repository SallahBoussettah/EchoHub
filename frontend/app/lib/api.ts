import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      Cookies.remove("token");
      Cookies.remove("user");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  signup: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Clients API
export const clientsApi = {
  getAll: async (status?: string) => {
    const response = await api.get("/clients", {
      params: status ? { status } : {},
    });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/clients", data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },

  archive: async (id: string) => {
    const response = await api.patch(`/clients/${id}/archive`);
    return response.data;
  },
};

// Projects API
export const projectsApi = {
  getAll: async () => {
    const response = await api.get("/projects");
    return response.data;
  },

  getAllByClient: async (clientId: string) => {
    const response = await api.get(`/clients/${clientId}/projects`);
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  create: async (clientId: string, data: any) => {
    const response = await api.post(`/clients/${clientId}/projects`, data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  createMilestone: async (projectId: string, data: any) => {
    const response = await api.post(`/projects/${projectId}/milestones`, data);
    return response.data;
  },

  updateMilestone: async (
    projectId: string,
    milestoneId: string,
    data: any
  ) => {
    const response = await api.patch(
      `/projects/${projectId}/milestones/${milestoneId}`,
      data
    );
    return response.data;
  },

  deleteMilestone: async (projectId: string, milestoneId: string) => {
    const response = await api.delete(
      `/projects/${projectId}/milestones/${milestoneId}`
    );
    return response.data;
  },
};

// Activity API
export const activityApi = {
  getByClient: async (clientId: string) => {
    const response = await api.get(`/clients/${clientId}/activity`);
    return response.data;
  },
};

// Search API
export const searchApi = {
  searchAll: async (query: string) => {
    const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  searchClients: async (query: string) => {
    const response = await api.get(
      `/search/clients?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  searchProjects: async (query: string) => {
    const response = await api.get(
      `/search/projects?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

// AI API
export const aiApi = {
  summarizeProject: async (projectId: string) => {
    const response = await api.post(`/ai/summarize/project/${projectId}`);
    return response.data;
  },

  getUsage: async () => {
    const response = await api.get("/ai/usage");
    return response.data;
  },
};

// Notes API
export const notesApi = {
  create: async (data: {
    content: string;
    clientId?: string;
    projectId?: string;
  }) => {
    const response = await api.post("/notes", data);
    return response.data;
  },

  getByClient: async (clientId: string) => {
    const response = await api.get(`/notes/client/${clientId}`);
    return response.data;
  },

  getByProject: async (projectId: string) => {
    const response = await api.get(`/notes/project/${projectId}`);
    return response.data;
  },

  update: async (id: string, data: { content: string }) => {
    const response = await api.patch(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

// Files API (placeholder for now - will implement upload later)
export const filesApi = {
  getByClient: async (clientId: string) => {
    const response = await api.get(`/files/client/${clientId}`);
    return response.data;
  },

  getByProject: async (projectId: string) => {
    const response = await api.get(`/files/project/${projectId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/files/${id}`);
    return response.data;
  },
};
