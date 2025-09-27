// src/screens/DebtsScreen.tsx
import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import DebtListItem from "../components/DebtListItem";
import { Plan } from "../types";

export default function DebtsScreen({ navigation }: any) {
  const { debts, plan, setPlan } = useDebts();
  const { theme } = useSettings();
  const c = colors[theme];

  const sorted =
    plan === "Avalanche"
      ? [...debts].sort((a, b) => b.interestRate - a.interestRate)
      : [...debts].sort((a, b) => a.balance - b.balance);

  const setPlanLocal = (p: Plan) => setPlan(p);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md }}>
        <Button title="➕ Add Debt" onPress={() => navigation.navigate("AddDebt")} color={c.primary} />
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Avalanche"
            onPress={() => setPlanLocal("Avalanche")}
            color={plan === "Avalanche" ? c.primary : c.muted}
          />
          <View style={{ width: spacing.sm }} />
          <Button
            title="Snowball"
            onPress={() => setPlanLocal("Snowball")}
            color={plan === "Snowball" ? c.primary : c.muted}
          />
        </View>
      </View>

      <Text style={{ color: c.text, marginBottom: spacing.sm }}>{plan} plan order</Text>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DebtListItem
            debt={item}
            onPress={() => navigation.navigate("DebtDetails", { debt: item })}
          />
        )}
      />
    </View>
  );
}
