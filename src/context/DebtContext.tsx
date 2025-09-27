import React, { createContext, useState, useContext } from "react";

type Debt = {
  id: string;
  name: string;
  balance: number;
  rate: number;
};

type DebtContextType = {
  debts: Debt[];
  addDebt: (debt: Omit<Debt, "id">) => void;
};

const DebtContext = createContext<DebtContextType | undefined>(undefined);

export function DebtProvider({ children }: { children: React.ReactNode }) {
  const [debts, setDebts] = useState<Debt[]>([
    { id: "1", name: "Credit Card", balance: 1200, rate: 18.9 },
    { id: "2", name: "Car Loan", balance: 8500, rate: 6.5 },
  ]);

  const addDebt = (debt: Omit<Debt, "id">) => {
    setDebts((prev) => [...prev, { ...debt, id: Date.now().toString() }]);
  };

  return (
    <DebtContext.Provider value={{ debts, addDebt }}>
      {children}
    </DebtContext.Provider>
  );
}

export function useDebts() {
  const context = useContext(DebtContext);
  if (!context) {
    throw new Error("useDebts must be used within a DebtProvider");
  }
  return context;
}