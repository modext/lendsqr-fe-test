/**
 * Generates 500 mock users for mocky.io or json-generator.com.
 * Run: node scripts/generate-mock-users.js
 * Output: public/mock-users.json (and prints path for mocky.io)
 *
 * Use the JSON at https://www.mocky.io/ (Create Mock) or
 * https://json-generator.com/ to host the response.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const orgs = ["Lendsqr", "Irorun", "Lendstar", "Creditwave", "Cashflow"];
const firstNames = ["Grace", "Debby", "Tosin", "Emeka", "Amara", "James", "Mary", "Ada", "Tobi", "Ngozi"];
const lastNames = ["Effiom", "Ogana", "Dokunmu", "Okoli", "Nwosu", "Adeyemi", "Okafor", "Eze", "Bello", "Akpan"];
const statuses = ["Active", "Inactive", "Pending", "Blacklisted"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const d = new Date(
    2020 + Math.floor(Math.random() * 5),
    Math.floor(Math.random() * 12),
    1 + Math.floor(Math.random() * 28)
  );
  return d.toISOString();
}

function phone() {
  return "0" + String(7000000000 + Math.floor(Math.random() * 2000000000)).slice(0, 10);
}

function id() {
  return String(100000 + Math.floor(Math.random() * 900000));
}

function generateUser(i) {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const org = pick(orgs);
  const name = `${first} ${last}`;
  const userId = id();
  return {
    id: userId,
    organization: org,
    username: name,
    email: `${first.toLowerCase()}${i}@${org.toLowerCase()}.com`,
    phone: phone(),
    dateJoined: randomDate(),
    status: pick(statuses),
    fullName: name,
    profile: {
      bvn: phone(),
      gender: "Female",
      maritalStatus: "Single",
      children: "None",
      residenceType: "Parent's Apartment",
    },
    education: {
      level: "B.Sc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2 years",
      officeEmail: "grace@lendsqr.com",
      monthlyIncomeRange: "₦200,000.00 - ₦400,000.00",
      loanRepayment: "40,000",
    },
    socials: {
      twitter: "@grace_effiom",
      facebook: "Grace Effiom",
      instagram: "@grace_effiom",
    },
    guarantors: [
      {
        fullName: "Debby Ogana",
        phone: phone(),
        email: "debby@gmail.com",
        relationship: "Sister",
      },
    ],
    account: {
      balance: 200000,
      bankName: "Providus Bank",
      accountNumber: "9912345678",
    },
  };
}

const COUNT = 500;
const users = [];
for (let i = 0; i < COUNT; i++) {
  users.push(generateUser(i));
}

// Response shape expected by the app: { data: User[], total: number }
const payload = { data: users, total: users.length };

const outDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "mock-users.json");
fs.writeFileSync(outPath, JSON.stringify(payload, null, 0), "utf8");

console.log(`Generated ${COUNT} users → ${outPath}`);
console.log("");
console.log("To use mocky.io:");
console.log("  1. Open https://www.mocky.io/");
console.log("  2. Create a new mock; paste the contents of public/mock-users.json");
console.log("  3. Set response header: Content-Type = application/json");
console.log("  4. Copy the mock URL and set in .env:");
console.log("     VITE_MOCKY_USERS_URL=https://run.mocky.io/v3/your-id");
console.log("");
