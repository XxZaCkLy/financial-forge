import React from "react";
import { View, Text } from "react-native";
import { useDebts } from "../context/DebtsContext";

export default function DebtsScreen() {
  const { debts } = useDebts();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Debts</Text>
      {debts.map(d => (
        <Text key={d.id}>
          {d.name}: ${d.balance.toLocaleString()} @ {d.interestRate}%
        </Text>
      ))}
    </View>
  );
}
