// src/utils/payoff.ts
export function payoffRoadmap(
  debtsInput: Debt[],
  monthlyPayment: number,
  plan: Plan
): { steps: { month: number; debt: string; remaining: number }[] } {
  const debts = debtsInput.map(d => ({ ...d }));
  const order =
    plan === "Avalanche"
      ? (a: Debt, b: Debt) => b.interestRate - a.interestRate
      : (a: Debt, b: Debt) => a.balance - b.balance;

  debts.sort(order);

  const steps: { month: number; debt: string; remaining: number }[] = [];
  let month = 0;

  while (debts.some(d => d.balance > 0) && month < 600) {
    month++;
    let remaining = monthlyPayment;

    for (const d of debts) {
      if (d.balance <= 0) continue;
      const interest = (d.interestRate / 100 / 12) * d.balance;
      const due = d.balance + interest;
      const applied = Math.min(remaining, due);
      d.balance = Math.max(0, due - applied);
      remaining -= applied;
      if (d.balance === 0) {
        steps.push({ month, debt: d.name, remaining: debts.reduce((s, x) => s + x.balance, 0) });
      }
      if (remaining <= 0) break;
    }
  }

  return { steps };
}
