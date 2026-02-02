import { api } from "./client";
import type { User } from "../../types/user";
import { getFallbackUserList, getFallbackUserById } from "../../data/mockUsersFallback";

export type UsersQuery = {
  page?: number;
  limit?: number;
  organization?: string;
  username?: string;
  email?: string;
  phone?: string;
  status?: string;
};

function isNetworkError(e: unknown): boolean {
  if (e && typeof e === "object" && "code" in e) return (e as { code?: string }).code === "ERR_NETWORK";
  if (e && typeof e === "object" && "message" in e) {
    const msg = String((e as { message: unknown }).message);
    return /network|failed to fetch|connection refused/i.test(msg);
  }
  return false;
}

export async function fetchUsers(q: UsersQuery): Promise<{ data: User[]; total: number }> {
  const page = q.page ?? 1;
  const limit = q.limit ?? 10;

  try {
    const params: Record<string, string | number> = {
      _page: page,
      _limit: limit,
    };
    if (q.organization) params.organization_like = q.organization;
    if (q.username) params.username_like = q.username;
    if (q.email) params.email_like = q.email;
    if (q.phone) params.phone_like = q.phone;
    if (q.status) params.status = q.status;

    const res = await api.get<User[]>("/users", { params });
    const total = Number(res.headers["x-total-count"] ?? 0);
    return { data: res.data, total };
  } catch (e) {
    if (isNetworkError(e)) {
      let list = getFallbackUserList();
      if (q.organization) list = list.filter((u) => u.organization.toLowerCase().includes(q.organization!.toLowerCase()));
      if (q.username) list = list.filter((u) => u.username.toLowerCase().includes(q.username!.toLowerCase()));
      if (q.email) list = list.filter((u) => u.email.toLowerCase().includes(q.email!.toLowerCase()));
      if (q.phone) list = list.filter((u) => u.phone.includes(q.phone!));
      if (q.status) list = list.filter((u) => u.status === q.status);
      const total = list.length;
      const start = (page - 1) * limit;
      const data = list.slice(start, start + limit);
      return { data, total };
    }
    throw e;
  }
}

export async function fetchUserById(id: string): Promise<User> {
  try {
    const res = await api.get<User>(`/users/${id}`);
    return res.data;
  } catch (e) {
    if (isNetworkError(e)) {
      const user = getFallbackUserById(id);
      if (user) return user;
    }
    throw e;
  }
}
