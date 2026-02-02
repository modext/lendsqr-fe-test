import { describe, it, expect } from 'vitest';
import { fetchUsers, fetchUserDetails } from './api';

describe('API service', () => {
  describe('fetchUsers', () => {
    it('returns users and total count', async () => {
      const res = await fetchUsers({ page: 1, limit: 10 });
      expect(res).toHaveProperty('users');
      expect(res).toHaveProperty('total');
      expect(Array.isArray(res.users)).toBe(true);
      expect(res.users.length).toBeLessThanOrEqual(10);
      expect(res.total).toBe(500);
    });

    it('returns paginated results', async () => {
      const page1 = await fetchUsers({ page: 1, limit: 25 });
      const page2 = await fetchUsers({ page: 2, limit: 25 });
      expect(page1.users.length).toBe(25);
      expect(page2.users.length).toBe(25);
      expect(page1.users[0]?.id).not.toBe(page2.users[0]?.id);
    });

    it('returns user list items with required fields', async () => {
      const res = await fetchUsers({ page: 1, limit: 5 });
      const user = res.users[0];
      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('organization');
      expect(user).toHaveProperty('userName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('phoneNumber');
      expect(user).toHaveProperty('dateJoined');
      expect(user).toHaveProperty('status');
    });

    it('filters by status when provided', async () => {
      const res = await fetchUsers({ page: 1, limit: 100, status: 'active' });
      expect(res.users.every((u) => u.status === 'active')).toBe(true);
    });

    it('returns 500 total users in dataset', async () => {
      const res = await fetchUsers({ limit: 500 });
      expect(res.total).toBe(500);
    });
  });

  describe('fetchUserDetails', () => {
    it('returns full user details for valid id', async () => {
      const list = await fetchUsers({ page: 1, limit: 1 });
      const id = list.users[0]!.id;
      const res = await fetchUserDetails(id);
      expect(res).toHaveProperty('user');
      expect(res.user.id).toBe(id);
      expect(res.user).toHaveProperty('profile');
      expect(res.user).toHaveProperty('personalInformation');
      expect(res.user).toHaveProperty('educationAndEmployment');
      expect(res.user).toHaveProperty('socials');
      expect(res.user).toHaveProperty('guarantors');
    });

    it('throws for invalid user id', async () => {
      await expect(fetchUserDetails('invalid-id-xyz')).rejects.toThrow();
    });
  });
});
