// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { totalBalance } from "../utils/payoff";

export default function HomeScreen() {
  const { debts, plan } = useDebts();   // ✅ correct
  const { theme } = useSettings();
  const c = colors[theme];

  const total = totalBalance(debts);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <Text style={{ fontSize: 22, color: c.text, marginBottom: spacing.md }}>
        Welcome back 👋
      </Text>
      <Text style={{ color: c.text }}>Debts tracked: {debts.length}</Text>
      <Text style={{ color: c.text }}>Total balance: ${total.toLocaleString()}</Text>
      <Text style={{ color: c.text }}>Current plan: {plan}</Text>
    </View>
  );
}
