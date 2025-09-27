// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { totalBalance } from "../utils/payoff";

export default function HomeScreen({ navigation }: any) {
  const { debts, plan } = useDebts();
  const { theme } = useSettings();
  const c = colors[theme];

  const total = totalBalance(debts);
  const avgRate = debts.length
    ? (debts.reduce((sum, d) => sum + d.interestRate, 0) / debts.length).toFixed(2)
    : 0;

  // Pick next debt based on plan
  const nextDebt =
    plan === "Avalanche"
      ? [...debts].sort((a, b) => b.interestRate - a.interestRate)[0]
      : [...debts].sort((a, b) => a.balance - b.balance)[0];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <Text style={{ fontSize: 22, color: c.text, marginBottom: spacing.md }}>
        Welcome back 👋
      </Text>

      <View
        style={{
          padding: spacing.lg,
          backgroundColor: c.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: c.border,
          marginBottom: spacing.lg,
        }}
      >
        <Text style={{ fontSize: 18, color: c.text, marginBottom: spacing.sm }}>
          Total Debt: ${total.toLocaleString()}
        </Text>
        <Text style={{ color: c.muted }}>Debts tracked: {debts.length}</Text>
        <Text style={{ color: c.muted }}>Average APR: {avgRate}%</Text>
      </View>

      {nextDebt && (
        <View
          style={{
            padding: spacing.md,
            backgroundColor: c.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: c.border,
            marginBottom: spacing.lg,
          }}
        >
          <Text style={{ fontSize: 18, color: c.text, marginBottom: spacing.sm }}>
            Next step ({plan} plan):
          </Text>
          <Text style={{ color: c.text }}>
            Pay <Text style={{ fontWeight: "bold" }}>{nextDebt.name}</Text> first
          </Text>
          <Text style={{ color: c.muted }}>
            Balance: ${nextDebt.balance.toLocaleString()} @ {nextDebt.interestRate}%
          </Text>
        </View>
      )}

      <Button title="View Debts" onPress={() => navigation.navigate("Debts")} color={c.primary} />
      <View style={{ height: spacing.sm }} />
      <Button
        title="Projection"
        onPress={() => navigation.navigate("Dashboard")}
        color={c.primary}
      />
    </View>
  );
}
