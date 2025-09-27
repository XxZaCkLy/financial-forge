import { Debt } from "../types";

export function totalBalance(debts: Debt[]) {
  return debts.reduce((sum, d) => sum + d.balance, 0);
}
