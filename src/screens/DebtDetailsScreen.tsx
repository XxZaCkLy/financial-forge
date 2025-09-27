// src/screens/DebtDetailsScreen.tsx
import React from "react";
import { View, Text } from "react-native";

export default function DebtDetailsScreen({ route }: any) {
  const { debt } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>{debt.name}</Text>
      <Text>Balance: ${debt.balance.toLocaleString()}</Text>
      <Text>Interest Rate: {debt.interestRate}%</Text>
    </View>
  );
}
