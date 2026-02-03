export type TabId = "general" | "documents" | "bank" | "loans" | "savings" | "app";

export const TAB_LIST: { id: TabId; label: string }[] = [
  { id: "general", label: "General Details" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
  { id: "loans", label: "Loans" },
  { id: "savings", label: "Savings" },
  { id: "app", label: "App and System" },
];
