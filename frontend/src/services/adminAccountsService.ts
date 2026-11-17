import API_URL from "@/config/api";

export interface AdminAccount {
  id: number;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  lastLoginAt?: string | null;
}

export interface CreateAccountRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateAccountRequest {
  fullName: string;
  email: string;
  role: string;
}

interface ApiMessage {
  message?: string;
}

async function accountRequest<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}/api/adminaccounts${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Something went wrong. Please try again.",
    );
  }

  return result as T;
}

export const adminAccountsService = {
  getAccounts: (token: string) => accountRequest<AdminAccount[]>("", token),

  createAccount: (token: string, data: CreateAccountRequest) =>
    accountRequest<{ message: string; account: AdminAccount }>("", token, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateAccount: (token: string, id: number, data: UpdateAccountRequest) =>
    accountRequest<ApiMessage>(`/${id}`, token, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateAccountStatus: (token: string, id: number, isActive: boolean) =>
    accountRequest<ApiMessage & { isActive: boolean }>(`/${id}/status`, token, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    }),
};
