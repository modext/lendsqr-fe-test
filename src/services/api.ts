/**
 * API service for users and user details.
 * Uses local mock data; can be switched to mocky.io by changing base URL.
 */

import type { UsersApiResponse, UserDetailsApiResponse } from '@/types/user';
import { getMockUserList, getMockUserDetailsById } from '@/data/mockUsers';

// In production, set to mocky.io URL after uploading mock-users.json
const API_BASE = '';

async function fetchFromMock<T>(path: string): Promise<T> {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json() as Promise<T>;
  }
  // Local mock
  if (path === '/users' || path.startsWith('/users?')) {
    const list = getMockUserList();
    return { users: list, total: list.length } as T;
  }
  const match = path.match(/^\/users\/(.+)$/);
  if (match) {
    const details = getMockUserDetailsById(match[1]);
    if (!details) throw new Error('User not found');
    return { user: details } as T;
  }
  throw new Error(`Unknown path: ${path}`);
}

export async function fetchUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  organization?: string;
}): Promise<UsersApiResponse> {
  const list = getMockUserList();
  let filtered = [...list];

  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.userName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.organization.toLowerCase().includes(q) ||
        u.phoneNumber.includes(q)
    );
  }
  if (params?.status) {
    filtered = filtered.filter((u) => u.status === params.status);
  }
  if (params?.organization) {
    filtered = filtered.filter((u) => u.organization === params.organization);
  }

  const total = filtered.length;
  const limit = params?.limit ?? 10;
  const page = Math.max(1, params?.page ?? 1);
  const start = (page - 1) * limit;
  const users = filtered.slice(start, start + limit);

  return { users, total };
}

export async function fetchUserDetails(userId: string): Promise<UserDetailsApiResponse> {
  if (API_BASE) {
    return fetchFromMock<UserDetailsApiResponse>(`/users/${userId}`);
  }
  const user = getMockUserDetailsById(userId);
  if (!user) throw new Error('User not found');
  return { user };
}
