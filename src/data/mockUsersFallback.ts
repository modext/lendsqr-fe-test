/**
 * Fallback mock users when API is unavailable. Matches User type.
 */
import type { User, UserStatus } from "../types/user";

const orgs = ["Lendsqr", "Irorun", "Lendstar", "Creditwave", "Cashflow"];
const firstNames = ["Grace", "Debby", "Tosin", "Emeka", "Amara", "James", "Mary", "Ada"];
const lastNames = ["Effiom", "Ogana", "Dokunmu", "Okoli", "Nwosu", "Adeyemi", "Okafor", "Eze"];
const statuses: UserStatus[] = ["Active", "Inactive", "Pending", "Blacklisted"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(): string {
  const d = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28));
  return d.toISOString();
}

function phone(): string {
  return "0" + String(7000000000 + Math.floor(Math.random() * 2000000000)).slice(0, 10);
}

function id(): string {
  return String(100000 + Math.floor(Math.random() * 900000));
}

export function getMockUsersFallback(count: number): User[] {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    const first = pick(firstNames);
    const last = pick(lastNames);
    const org = pick(orgs);
    const name = `${first} ${last}`;
    users.push({
      id: id(),
      organization: org,
      username: name,
      email: `${first.toLowerCase()}${i}@${org.toLowerCase()}.com`,
      phone: phone(),
      dateJoined: randomDate(),
      status: pick(statuses),
      fullName: name,
    });
  }
  return users;
}

const FALLBACK_LIST = getMockUsersFallback(500);

export function getFallbackUserList(): User[] {
  return [...FALLBACK_LIST];
}

export function getFallbackUserById(userId: string): User | undefined {
  const u = FALLBACK_LIST.find((x) => x.id === userId);
  if (!u) return undefined;
  return {
    ...u,
    profile: { bvn: u.phone, gender: "Female", maritalStatus: "Single", children: "None", residenceType: "Parent's Apartment" },
    education: { level: "B.Sc", employmentStatus: "Employed", sector: "FinTech", duration: "2 years", officeEmail: "grace@lendsqr.com", monthlyIncomeRange: "₦200,000.00 - ₦400,000.00", loanRepayment: "40,000" },
    socials: { twitter: "@grace_effiom", facebook: "Grace Effiom", instagram: "@grace_effiom" },
    guarantors: [{ fullName: "Debby Ogana", phone: u.phone, email: "debby@gmail.com", relationship: "Sister" }],
    account: { balance: 200000, bankName: "Providus Bank", accountNumber: "9912345678" },
  };
}
