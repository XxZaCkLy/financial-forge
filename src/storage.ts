// src/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Debt, Plan } from "./types";

const KEYS = {
  debts: "debts",
  plan: "plan",
  theme: "theme",
};

export async function loadDebts(): Promise<Debt[]> {
  const raw = await AsyncStorage.getItem(KEYS.debts);
  if (!raw) return [];
  return JSON.parse(raw);
}

export async function saveDebts(debts: Debt[]) {
  await AsyncStorage.setItem(KEYS.debts, JSON.stringify(debts));
}

export async function loadPlan(): Promise<Plan | null> {
  const raw = await AsyncStorage.getItem(KEYS.plan);
  return raw ? (raw as Plan) : null;
}

export async function savePlan(plan: Plan) {
  await AsyncStorage.setItem(KEYS.plan, plan);
}

export async function loadTheme(): Promise<"light" | "dark" | null> {
  const raw = await AsyncStorage.getItem(KEYS.theme);
  return raw ? (raw as "light" | "dark") : null;
}

export async function saveTheme(theme: "light" | "dark") {
  await AsyncStorage.setItem(KEYS.theme, theme);
}
