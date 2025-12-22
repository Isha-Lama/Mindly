import api from "./api";

// ------------------- TYPES -------------------
export interface LoginResponse {
  access: string;
  user: User;
}
export interface User {
  id: number;
  username: string;
  email: string;
  user_role: string;
}

// ------------------- API FUNCTIONS -------------------

// LOGIN
export const login = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await api.post("api/auth/login/", credentials); // your endpoint

  // Save token locally if login succeeds
  if (res.data.access) {
    localStorage.setItem("access_token", res.data.access);
  }

  return res.data;
};

// GET ALL USERS
export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("api/auth/users/");
  return res.data; // expects array of users
};

