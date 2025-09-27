// src/screens/DebtsScreen.tsx
import React, { useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, SegmentedControlIOS, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Mock debts
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
  const [plan, setPlan] = useState<"Avalanche" | "Snowball">("Avalanche");

  // Sort debts based on plan
  const sortedDebts =
    plan === "Avalanche"
      ? [...mockDebts].sort((a, b) => b.interestRate - a.interestRate)
      : [...mockDebts].sort((a, b) => a.balance - b.balance);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="➕ Add Debt" onPress={() => navigation.navigate("AddDebt")} />

      {/* Plan toggle */}
      {Platform.OS === "ios" ? (
        <SegmentedControlIOS
          values={["Avalanche", "Snowball"]}
          selectedIndex={plan === "Avalanche" ? 0 : 1}
          onChange={(event) => {
            const value = event.nativeEvent.value as "Avalanche" | "Snowball";
            setPlan(value);
          }}
          style={{ marginVertical: 12 }}
        />
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 12 }}>
          <Button title="Avalanche" onPress={() => setPlan("Avalanche")} color={plan === "Avalanche" ? "blue" : "gray"} />
          <View style={{ width: 12 }} />
          <Button title="Snowball" onPress={() => setPlan("Snowball")} color={plan === "Snowball" ? "blue" : "gray"} />
        </View>
      )}

      <Text style={{ fontSize: 20, marginBottom: 8, textAlign: "center" }}>
        {plan} Plan Order
      </Text>

      <FlatList
        data={sortedDebts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate("DebtDetails", { debt: item })}>
            <View style={{ padding: 16, borderBottomWidth: 1 }}>
              <Text style={{ fontSize: 18 }}>
                {index + 1}. {item.name}
              </Text>
              <Text>Balance: ${item.balance.toLocaleString()}</Text>
              <Text>Interest: {item.interestRate}%</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
