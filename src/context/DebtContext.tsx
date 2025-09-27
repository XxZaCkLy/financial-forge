// src/context/DebtsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Debt, Plan } from "../types";
import { loadDebts, saveDebts, loadPlan, savePlan } from "../storage";

type DebtsContextType = {
  debts: Debt[];
  plan: Plan;
  setPlan: (p: Plan) => void;
  addDebt: (d: Omit<Debt, "id">) => void;
  updateDebt: (d: Debt) => void;
  removeDebt: (id: string) => void;
  clearAll: () => void;
};

const DebtsContext = createContext<DebtsContextType | null>(null);

const mockDefaults: Debt[] = [
  { id: "1", name: "Credit Card", balance: 2500, interestRate: 19.99 },
  { id: "2", name: "Car Loan", balance: 12000, interestRate: 6.5 },
  { id: "3", name: "Student Loan", balance: 18000, interestRate: 4.2 },
];

export function DebtsProvider({ children }: { children: React.ReactNode }) {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [plan, setPlanState] = useState<Plan>("Avalanche");

  useEffect(() => {
    (async () => {
      const storedDebts = await loadDebts();
      setDebts(storedDebts.length ? storedDebts : mockDefaults);
      const storedPlan = await loadPlan();
      if (storedPlan) setPlanState(storedPlan);
    })();
  }, []);

  useEffect(() => {
    saveDebts(debts);
  }, [debts]);

  useEffect(() => {
    savePlan(plan);
  }, [plan]);

  const addDebt = (d: Omit<Debt, "id">) => {
    setDebts(prev => [...prev, { ...d, id: Date.now().toString() }]);
  };

  const updateDebt = (updated: Debt) => {
    setDebts(prev => prev.map(d => (d.id === updated.id ? updated : d)));
  };

  const removeDebt = (id: string) => {
    setDebts(prev => prev.filter(d => d.id !== id));
  };

  const clearAll = () => {
    setDebts([]);
  };

  const setPlan = (p: Plan) => setPlanState(p);

  return (
    <DebtsContext.Provider value={{ debts, plan, setPlan, addDebt, updateDebt, removeDebt, clearAll }}>
      {children}
    </DebtsContext.Provider>
  );
}

export function useDebts() {
  const ctx = useContext(DebtsContext);
  if (!ctx) throw new Error("useDebts must be used within DebtsProvider");
  return ctx;
}
