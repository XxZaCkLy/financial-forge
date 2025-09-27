// src/screens/DebtDetailsScreen.tsx
import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { Debt } from "../types";

export default function DebtDetailsScreen({ route, navigation }: any) {
  const { removeDebt } = useDebts();
  const { theme } = useSettings();
  const c = colors[theme];

  const debt: Debt = route.params.debt;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <View style={{ padding: spacing.lg, backgroundColor: c.card, borderRadius: 12, borderWidth: 1, borderColor: c.border }}>
        <Text style={{ fontSize: 22, color: c.text, marginBottom: spacing.sm }}>{debt.name}</Text>
        <Text style={{ color: c.muted }}>Balance: ${debt.balance.toLocaleString()}</Text>
        <Text style={{ color: c.muted }}>APR: {debt.interestRate}%</Text>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
        <Button title="Edit" onPress={() => navigation.navigate("EditDebt", { debt })} color={c.primary} />
        <Button
          title="Delete"
          color={c.danger}
          onPress={() =>
            Alert.alert("Delete debt", "Are you sure?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                  removeDebt(debt.id);
                  navigation.goBack();
                },
              },
            ])
          }
        />
      </View>
    </View>
  );
}
