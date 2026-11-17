import API_URL from "@/config/api";

export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminRegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: AdminUser;
}

async function postAuth<T>(
  endpoint: string,
  data: AdminLoginRequest | AdminRegisterRequest,
): Promise<T> {
  const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong. Please try again.",
    );
  }

  return result as T;
}

export const authService = {
  register: (data: AdminRegisterRequest) =>
    postAuth<{ message: string }>("register", data),

  login: (data: AdminLoginRequest) =>
    postAuth<AdminLoginResponse>("login", data),
};
