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

const MOCKY_USERS_URL = import.meta.env.VITE_MOCKY_USERS_URL as string | undefined;

/** Cached list when using mocky.io so we don't re-fetch 500 on every request */
let mockyListCache: { data: User[]; total: number } | null = null;

async function fetchMockyUsers(): Promise<{ data: User[]; total: number }> {
  if (mockyListCache) return mockyListCache;
  if (!MOCKY_USERS_URL) throw new Error("VITE_MOCKY_USERS_URL not set");
  const res = await fetch(MOCKY_USERS_URL);
  if (!res.ok) throw new Error(`Mock API error: ${res.status}`);
  const json = (await res.json()) as { data?: User[]; total?: number } | User[];
  const data = Array.isArray(json) ? json : (json.data ?? []);
  const total = Array.isArray(json) ? json.length : (json.total ?? data.length);
  mockyListCache = { data: data as User[], total };
  return mockyListCache;
}

function isNetworkError(e: unknown): boolean {
  if (e && typeof e === "object" && "code" in e) return (e as { code?: string }).code === "ERR_NETWORK";
  if (e && typeof e === "object" && "message" in e) {
    const msg = String((e as { message: unknown }).message);
    return /network|failed to fetch|connection refused/i.test(msg);
  }
  return false;
}

function filterAndPaginate(
  list: User[],
  q: UsersQuery
): { data: User[]; total: number } {
  let filtered = [...list];
  if (q.organization)
    filtered = filtered.filter((u) =>
      u.organization.toLowerCase().includes((q.organization ?? "").toLowerCase())
    );
  if (q.username)
    filtered = filtered.filter((u) =>
      u.username.toLowerCase().includes((q.username ?? "").toLowerCase())
    );
  if (q.email)
    filtered = filtered.filter((u) =>
      u.email.toLowerCase().includes((q.email ?? "").toLowerCase())
    );
  if (q.phone) filtered = filtered.filter((u) => u.phone.includes(q.phone ?? ""));
  if (q.status) filtered = filtered.filter((u) => u.status === q.status);
  const total = filtered.length;
  const page = q.page ?? 1;
  const limit = q.limit ?? 10;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return { data, total };
}

export async function fetchUsers(q: UsersQuery): Promise<{ data: User[]; total: number }> {
  if (MOCKY_USERS_URL) {
    const { data } = await fetchMockyUsers();
    return filterAndPaginate(data, q);
  }

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
      const list = getFallbackUserList();
      return filterAndPaginate(list, q);
    }
    throw e;
  }
}

export async function fetchUserById(id: string): Promise<User> {
  if (MOCKY_USERS_URL) {
    const { data } = await fetchMockyUsers();
    const user = data.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  }

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
