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

  // Calculate totals
  const total = totalBalance(debts);
  const avgRate = debts.length
    ? (debts.reduce((sum, d) => sum + d.interestRate, 0) / debts.length).toFixed(2)
    : 0;

  // For demo: assume original total was sum of mock debts
  const originalTotal = 32500; // adjust if you want to track actual starting point
  const progress = originalTotal > 0 ? 1 - total / originalTotal : 0;

  // Pick next debt based on plan
  const nextDebt =
    plan === "Avalanche"
      ? [...debts].sort((a, b) => b.interestRate - a.interestRate)[0]
      : [...debts].sort((a, b) => a.balance - b.balance)[0];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      {/* Greeting */}
      <Text style={{ fontSize: 22, color: c.text, marginBottom: spacing.md }}>
        Welcome back 👋
      </Text>

      {/* Summary card */}
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

        {/* Progress bar */}
        <View
          style={{
            height: 10,
            backgroundColor: c.border,
            borderRadius: 5,
            marginTop: spacing.md,
          }}
        >
          <View
            style={{
              width: `${Math.round(progress * 100)}%`,
              height: "100%",
              backgroundColor: c.primary,
              borderRadius: 5,
            }}
          />
        </View>
        <Text style={{ color: c.muted, marginTop: 4 }}>
          {Math.round(progress * 100)}% paid off
        </Text>
      </View>

      {/* Next action */}
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

      {/* Quick actions */}
      <Button
        title="📋 View Debts"
        onPress={() => navigation.navigate("Debts")}
        color={c.primary}
      />
      <View style={{ height: spacing.sm }} />
      <Button
        title="📊 Projection"
        onPress={() => navigation.navigate("Dashboard")}
        color={c.primary}
      />
    </View>
  );
}
