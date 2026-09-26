const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number, symbol: string = "₹"): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${INR_FORMATTER.format(safeAmount)}`;
}

export function formatNumber(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return INR_FORMATTER.format(safeAmount);
}

export function formatDateDisplay(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  const month = date.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${date.getDate()} ${date.getFullYear()}`;
}

export function todayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDaysIso(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
