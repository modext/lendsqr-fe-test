/**
 * Mock user list data - 500 records for assessment.
 * In production, replace with mocky.io or similar; structure matches this schema.
 */

import type { UserListItem, UserDetails, Guarantor } from '@/types/user';

const organizations = ['Lendsqr', 'Irorun', 'Lendstar', 'Creditwave', 'Cashflow'];
const firstNames = ['Grace', 'Debby', 'Tosin', 'Emeka', 'Amara', 'James', 'Mary', 'Ada', 'Tobi', 'Ngozi'];
const lastNames = ['Effiom', 'Ogana', 'Dokunmu', 'Okoli', 'Nwosu', 'Adeyemi', 'Okafor', 'Eze', 'Bello', 'Akpan'];
const statuses: UserListItem['status'][] = ['active', 'inactive', 'pending', 'blacklisted'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function generatePhone(): string {
  return '0' + Math.floor(7000000000 + Math.random() * 2000000000).toString().slice(0, 10);
}

function generateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = 'LSQF';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export function generateMockUserList(count: number): UserListItem[] {
  const users: UserListItem[] = [];
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2024, 11, 31);

  for (let i = 0; i < count; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const org = randomItem(organizations);
    const userName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}${i}@${org.toLowerCase().replace(/\s/g, '')}.com`;
    users.push({
      id: generateId(),
      organization: org,
      userName,
      email,
      phoneNumber: generatePhone(),
      dateJoined: randomDate(startDate, endDate),
      status: randomItem(statuses),
      hasLoan: Math.random() < 0.65,
      hasSavings: Math.random() < 0.78,
    });
  }

  return users;
}

const MOCK_LIST = generateMockUserList(500);

const personalInfoTemplate = {
  fullName: 'Grace Effiom',
  phoneNumber: '07060780922',
  emailAddress: 'grace@gmail.com',
  bvn: '07060780922',
  gender: 'Female',
  maritalStatus: 'Single',
  children: 'None',
  typeOfResidence: "Parent's Apartment",
};

const educationTemplate = {
  levelOfEducation: 'B.Sc',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '2 years',
  officeEmail: 'grace@lendsqr.com',
  monthlyIncome: '₦200,000.00 - ₦400,000.00',
  loanRepayment: '₦40,000',
};

const socialsTemplate = {
  twitter: '@grace_effiom',
  facebook: 'Grace Effiom',
  instagram: '@grace_effiom',
};

const guarantorTemplate: Guarantor = {
  fullName: 'Debby Ogana',
  phoneNumber: '07060780922',
  emailAddress: 'debby@gmail.com',
  relationship: 'Sister',
};

export function getMockUserList(): UserListItem[] {
  return [...MOCK_LIST];
}

export function getMockUserDetailsById(id: string): UserDetails | undefined {
  const listUser = MOCK_LIST.find((u) => u.id === id);
  if (!listUser) return undefined;

  return {
    ...listUser,
    profile: {
      tier: 2,
      balance: '₦200,000.00',
      bankAccount: '9912345678',
      bankName: 'Providus Bank',
    },
    personalInformation: {
      ...personalInfoTemplate,
      fullName: listUser.userName,
      phoneNumber: listUser.phoneNumber,
      emailAddress: listUser.email,
    },
    educationAndEmployment: { ...educationTemplate },
    socials: { ...socialsTemplate },
    guarantors: [guarantorTemplate, { ...guarantorTemplate, fullName: 'Debby Ogana' }],
  };
}
