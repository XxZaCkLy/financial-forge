// src/types.ts
export type Debt = {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // annual percentage rate
};

export type Plan = "Avalanche" | "Snowball";
