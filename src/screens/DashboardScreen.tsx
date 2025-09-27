import React from "react";
import { View, Text } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { totalBalance } from "../utils/payoff";

export default function DashboardScreen() {
  const { debts, plan } = useDebts();
  const total = totalBalance(debts);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Dashboard</Text>
      <Text>Active plan: {plan}</Text>
      <Text>Total balance: ${total.toLocaleString()}</Text>
      <Text>Debts tracked: {debts.length}</Text>
    </View>
  );
}
