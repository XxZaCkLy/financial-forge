// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { totalBalance } from "../utils/payoff";

export default function HomeScreen() {
  const { debts } = useDebts();
  const { theme } = useSettings();
  const c = colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <View style={{ padding: spacing.lg, backgroundColor: c.card, borderRadius: 12, borderWidth: 1, borderColor: c.border }}>
        <Text style={{ fontSize: 20, color: c.text, marginBottom: spacing.sm }}>Welcome back</Text>
        <Text style={{ color: c.muted }}>Debts tracked: {debts.length}</Text>
        <Text style={{ color: c.muted }}>
          Total balance: ${totalBalance(debts).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
