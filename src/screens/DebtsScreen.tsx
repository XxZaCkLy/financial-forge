// src/screens/DebtsScreen.tsx
import React from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Debt = {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
};

const mockDebts: Debt[] = [
  { id: "1", name: "Credit Card", balance: 2500, interestRate: 19.99 },
  { id: "2", name: "Car Loan", balance: 12000, interestRate: 6.5 },
  { id: "3", name: "Student Loan", balance: 18000, interestRate: 4.2 },
];

type Props = NativeStackScreenProps<any>;

export default function DebtsScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="➕ Add Debt" onPress={() => navigation.navigate("AddDebt")} />
      <FlatList
        data={mockDebts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("DebtDetails", { debt: item })}>
            <View style={{ padding: 16, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              <Text>Balance: ${item.balance.toLocaleString()}</Text>
              <Text>Interest: {item.interestRate}%</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="📈 Avalanche Plan" onPress={() => navigation.navigate("AvalanchePlan")} />
    </View>
  );
}
