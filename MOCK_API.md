# Mock API Setup (mocky.io / json-generator.com)

Per the Figma design instructions, the app mocks its APIs using common tools such as **mocky.io** or **json-generator.com**. This document explains how to use either.

---

## Option 1: mocky.io

### 1. Generate the 500-user JSON

From the project root:

```bash
node scripts/generate-mock-users.js
```

This writes **`public/mock-users.json`** with 500 users in the shape `{ "data": User[], "total": 500 }`.

### 2. Create a mock on mocky.io

1. Open **[https://www.mocky.io/](https://www.mocky.io/)**.
2. Click **Create your mock** (or similar).
3. Set **Response body** to the contents of `public/mock-users.json` (or paste the minified JSON).
4. Add header: **Content-Type** = `application/json`.
5. Copy the mock URL (e.g. `https://run.mocky.io/v3/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

### 3. Point the app at the mock

Create or edit **`.env`** in the project root:

```env
VITE_MOCKY_USERS_URL=https://run.mocky.io/v3/your-mock-id
```

Restart the dev server (`npm run dev`). The Users and User Details pages will load data from this URL instead of the fallback in-code mock.

---

## Option 2: json-generator.com

### 1. Generate the JSON

Run the same script as above:

```bash
node scripts/generate-mock-users.js
```

Use **`public/mock-users.json`** as your source of truth, or use json-generator.com to generate a similar structure.

### 2. Use json-generator.com to create data

1. Open **[https://json-generator.com/](https://json-generator.com/)**.
2. Define a template that outputs an array of user objects matching the app’s `User` type (see `src/types/user.ts`). Example shape:

```json
[
  '{{repeat(500)}}',
  {
    id: '{{index() + 100000}}',
    organization: '{{random("Lendsqr", "Irorun", "Lendstar")}}',
    username: '{{firstName()}} {{surname()}}',
    email: '{{email()}}',
    phone: '0{{integer(7000000000, 9999999999)}}',
    dateJoined: '{{date(new Date(2020, 0, 1), new Date(2025, 11, 31))}}',
    status: '{{random("Active", "Inactive", "Pending", "Blacklisted")}}',
    fullName: '{{firstName()}} {{surname()}}'
  }
]
```

3. Generate the JSON and copy the result.
4. Either:
   - Host that JSON at **mocky.io** (paste body, get URL) and set **`VITE_MOCKY_USERS_URL`** as in Option 1, or  
   - Serve `public/mock-users.json` locally and set `VITE_MOCKY_USERS_URL` to that URL (e.g. `http://localhost:5173/mock-users.json` during `npm run dev`).

---

## Response shape

The app expects one of:

- **Object:** `{ "data": User[], "total": number }`  
  Used for the users list; pagination and filtering are done in the app.
- **Array:** `User[]`  
  Treated as the full list; `total` is set to `array.length`.

Each **User** should include at least: `id`, `organization`, `username`, `email`, `phone`, `dateJoined`, `status`. For User Details, full objects (with `profile`, `education`, `socials`, `guarantors`, `account`) are supported; the generator script produces these.

---

## Without a mock URL

If **`VITE_MOCKY_USERS_URL`** is not set, the app uses:

1. The axios client (e.g. `VITE_API_BASE_URL` or `http://localhost:4000`) if available.
2. An in-code fallback of 500 users from `src/data/mockUsersFallback.ts` when the request fails (e.g. network error).

So the app runs without mocky.io; setting the env var switches it to the mock API.
