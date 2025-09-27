// src/components/DebtListItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { Debt } from "../types";

type Props = {
  debt: Debt;
  onPress: () => void;
};

export default function DebtListItem({ debt, onPress }: Props) {
  const { theme } = useSettings();
  const c = colors[theme];

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: spacing.md,
          backgroundColor: c.card,
          borderRadius: 10,
          marginBottom: spacing.sm,
          borderWidth: 1,
          borderColor: c.border,
        }}
      >
        <Text style={{ fontSize: 16, color: c.text }}>{debt.name}</Text>
        <Text style={{ color: c.muted }}>
          Balance: ${debt.balance.toLocaleString()}
        </Text>
        <Text style={{ color: c.muted }}>
          APR: {debt.interestRate}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}
