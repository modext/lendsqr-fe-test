export function formatPhone(p: string) {
  return p;
}

export function formatDateJoined(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatNGN(amount: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);
}
