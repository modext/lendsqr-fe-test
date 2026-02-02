export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted";

/** List view status (lowercase) */
export type UserStatusListItem = "active" | "inactive" | "pending" | "blacklisted";

export type UserListItem = {
  id: string;
  organization: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatusListItem;
  hasLoan?: boolean;
  hasSavings?: boolean;
};

export type UsersApiResponse = { users: UserListItem[]; total: number };

export type Guarantor = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
};

export type UserDetails = UserListItem & {
  profile?: { tier: number; balance: string; bankAccount: string; bankName: string };
  personalInformation?: Record<string, string>;
  educationAndEmployment?: Record<string, string>;
  socials?: Record<string, string>;
  guarantors?: Guarantor[];
};

export type UserDetailsApiResponse = { user: UserDetails };

export type User = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string; // ISO string
  status: UserStatus;

  fullName?: string;

  profile?: {
    bvn?: string;
    gender?: "Male" | "Female";
    maritalStatus?: string;
    children?: string;
    residenceType?: string;
  };

  education?: {
    level?: string;
    employmentStatus?: string;
    sector?: string;
    duration?: string;
    officeEmail?: string;
    monthlyIncomeRange?: string;
    loanRepayment?: string;
  };

  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };

  guarantors?: Array<{
    fullName?: string;
    phone?: string;
    email?: string;
    relationship?: string;
  }>;

  account?: {
    balance?: number;
    bankName?: string;
    accountNumber?: string;
  };
};
