// src/screens/DebtsScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Debt = {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
};

type Props = NativeStackScreenProps<any>;

const STORAGE_KEY = "debts";
const PLAN_KEY = "plan";

export default function DebtsScreen({ navigation }: Props) {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [plan, setPlan] = useState<"Avalanche" | "Snowball">("Avalanche");

  // Load debts + plan from storage
  useEffect(() => {
    (async () => {
      try {
        const storedDebts = await AsyncStorage.getItem(STORAGE_KEY);
        const storedPlan = await AsyncStorage.getItem(PLAN_KEY);
        if (storedDebts) setDebts(JSON.parse(storedDebts));
        else {
          // fallback mock data
          setDebts([
            { id: "1", name: "Credit Card", balance: 2500, interestRate: 19.99 },
            { id: "2", name: "Car Loan", balance: 12000, interestRate: 6.5 },
            { id: "3", name: "Student Loan", balance: 18000, interestRate: 4.2 },
          ]);
        }
        if (storedPlan) setPlan(storedPlan as "Avalanche" | "Snowball");
      } catch (e) {
        console.error("Failed to load debts", e);
      }
    })();
  }, []);

  // Save debts when they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
  }, [debts]);

  // Save plan when it changes
  useEffect(() => {
    AsyncStorage.setItem(PLAN_KEY, plan);
  }, [plan]);

  // Sort debts based on plan
  const sortedDebts =
    plan === "Avalanche"
      ? [...debts].sort((a, b) => b.interestRate - a.interestRate)
      : [...debts].sort((a, b) => a.balance - b.balance);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="➕ Add Debt" onPress={() => navigation.navigate("AddDebt", { setDebts })} />

      {/* Plan toggle */}
      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 12 }}>
        <Button
          title="Avalanche"
          onPress={() => setPlan("Avalanche")}
          color={plan === "Avalanche" ? "blue" : "gray"}
        />
        <View style={{ width: 12 }} />
        <Button
          title="Snowball"
          onPress={() => setPlan("Snowball")}
          color={plan === "Snowball" ? "blue" : "gray"}
        />
      </View>

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
