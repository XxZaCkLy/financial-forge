// src/screens/AvalanchePlanScreen.tsx
import React from "react";
import { View, Text } from "react-native";

const debts = [
  { id: "1", name: "Credit Card", balance: 2500, interestRate: 19.99 },
  { id: "2", name: "Car Loan", balance: 12000, interestRate: 6.5 },
  { id: "3", name: "Student Loan", balance: 18000, interestRate: 4.2 },
];

// Avalanche = pay highest interest first
const avalancheOrder = [...debts].sort((a, b) => b.interestRate - a.interestRate);

export default function AvalanchePlanScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>📈 Avalanche Plan</Text>
      {avalancheOrder.map((d, idx) => (
        <Text key={d.id}>
          {idx + 1}. {d.name} — {d.interestRate}% (${d.balance.toLocaleString()})
        </Text>
      ))}
    </View>
  );
}
