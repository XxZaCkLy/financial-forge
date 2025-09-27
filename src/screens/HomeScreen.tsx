import React from "react";
import { View, Text, Button } from "react-native";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { totalBalance } from "../utils/payoff";

export default function HomeScreen({ navigation }: any) {
  const { debts, plan } = useDebts();
  const { theme, toggleTheme } = useSettings();

  const total = totalBalance(debts);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Home</Text>
      <Text>Theme: {theme}</Text>
      <Text>Plan: {plan}</Text>
      <Text>Total Debt: ${total.toLocaleString()}</Text>
      <Text>Debts tracked: {debts.length}</Text>

      <Button title="Toggle Theme" onPress={toggleTheme} />
      <Button title="Go to Dashboard" onPress={() => navigation.navigate("Dashboard")} />
    </View>
  );
}
