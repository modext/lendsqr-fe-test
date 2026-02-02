import { describe, it, expect, beforeEach } from 'vitest';
import { saveUserDetails, getUserDetails, removeUserDetails } from './userDetailsStorage';
import type { UserDetails } from '@/types/user';

const mockUser: UserDetails = {
  id: 'test-user-123',
  organization: 'Lendsqr',
  userName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '08012345678',
  dateJoined: 'Jan 1, 2024',
  status: 'active',
  profile: {
    tier: 2,
    balance: '100000',
    bankAccount: '1234567890',
    bankName: 'Test Bank',
  },
  personalInformation: {
    fullName: 'Test User',
    phoneNumber: '08012345678',
    emailAddress: 'test@example.com',
    bvn: '12345678901',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Own',
  },
  educationAndEmployment: {
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'Tech',
    durationOfEmployment: '2 years',
    officeEmail: 'test@company.com',
    monthlyIncome: '200000',
    loanRepayment: '20000',
  },
  socials: {
    twitter: '@test',
    facebook: 'Test User',
    instagram: '@test',
  },
  guarantors: [],
};

describe('userDetailsStorage', () => {
  beforeEach(async () => {
    try {
      await removeUserDetails(mockUser.id);
    } catch {
      // ignore
    }
  });

  it('saves and retrieves user details', async () => {
    await saveUserDetails(mockUser);
    const retrieved = await getUserDetails(mockUser.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved!.id).toBe(mockUser.id);
    expect(retrieved!.userName).toBe(mockUser.userName);
  });

  it('returns null for non-existent user', async () => {
    const result = await getUserDetails('non-existent-id');
    expect(result).toBeNull();
  });
});
