// src/utils/payoff.ts
import { Debt, Plan } from "../types";

/**
 * Simulate monthly payoff for Avalanche or Snowball plan.
 * Returns months to payoff and a time series of total balance per month.
 */
export function simulatePayoff(
  debtsInput: Debt[],
  monthlyPayment: number,
  plan: Plan,
  maxMonths = 600
): { months: number; series: number[] } {
  const debts = debtsInput.map(d => ({ ...d }));
  const order =
    plan === "Avalanche"
      ? (a: Debt, b: Debt) => b.interestRate - a.interestRate
      : (a: Debt, b: Debt) => a.balance - b.balance;

  debts.sort(order);

  const series: number[] = [];
  let months = 0;

  while (debts.some(d => d.balance > 0) && months < maxMonths) {
    months += 1;
    let remaining = monthlyPayment;

    for (const d of debts) {
      if (d.balance <= 0) continue;
      const interest = (d.interestRate / 100 / 12) * d.balance;
      const due = d.balance + interest;
      const applied = Math.min(remaining, due);
      d.balance = Math.max(0, due - applied);
      remaining -= applied;
      if (remaining <= 0) break;
    }

    const total = debts.reduce((sum, d) => sum + d.balance, 0);
    series.push(total);
  }

  return { months, series };
}

export function totalBalance(debts: Debt[]) {
  return debts.reduce((sum, d) => sum + d.balance, 0);
}
