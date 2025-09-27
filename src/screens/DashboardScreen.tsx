// src/screens/DashboardScreen.tsx
import React, { useMemo, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { simulatePayoff } from "../utils/payoff";

export default function DashboardScreen() {
  const { debts } = useDebts();
  const { theme } = useSettings();
  const c = colors[theme];

  const [monthlyPayment, setMonthlyPayment] = useState("500");

  const payment = parseFloat(monthlyPayment) || 0;

  const avalanche = useMemo(() => simulatePayoff(debts, payment, "Avalanche"), [debts, payment]);
  const snowball = useMemo(() => simulatePayoff(debts, payment, "Snowball"), [debts, payment]);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <Text style={{ fontSize: 22, color: c.text, marginBottom: spacing.md }}>Payoff projection</Text>

      <TextInput
        placeholder="Monthly payment"
        value={monthlyPayment}
        onChangeText={setMonthlyPayment}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: c.border,
          padding: spacing.sm,
          backgroundColor: c.card,
          color: c.text,
          marginBottom: spacing.md,
        }}
        placeholderTextColor={c.muted}
      />

      <View style={{ gap: spacing.sm }}>
        <Text style={{ color: c.text }}>
          Avalanche: ~{avalanche.months || 0} months
        </Text>
        <Text style={{ color: c.text }}>
          Snowball: ~{snowball.months || 0} months
        </Text>
        <Text style={{ color: c.muted, marginTop: spacing.sm }}>
          Note: Projections assume fixed monthly payment and compound monthly interest.
        </Text>
      </View>

      {/* Simple visual: last 24 months trend as horizontal bars */}
      <View style={{ marginTop: spacing.lg }}>
        <Text style={{ color: c.text, marginBottom: spacing.sm }}>Trend (last 24 months)</Text>
        {renderBars("Avalanche", avalanche.series, c)}
        {renderBars("Snowball", snowball.series, c)}
      </View>
    </View>
  );
}

function renderBars(label: string, series: number[], c: any) {
  const recent = series.slice(-24);
  const max = Math.max(...recent, 1);
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: c.muted }}>{label}</Text>
      {recent.map((val, idx) => (
        <View key={idx} style={{ flexDirection: "row", alignItems: "center", marginVertical: 2 }}>
          <View style={{ width: (val / max) * 240, height: 6, backgroundColor: c.primary, borderRadius: 3 }} />
          <Text style={{ color: c.muted, marginLeft: 8, fontSize: 12 }}>
            ${Math.round(val).toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );
}
