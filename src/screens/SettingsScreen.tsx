// src/screens/SettingsScreen.tsx
import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { useDebts } from "../context/DebtsContext";
import { colors, spacing } from "../theme";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useSettings();
  const { clearAll } = useDebts();
  const c = colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <Text style={{ fontSize: 22, color: c.text, marginBottom: spacing.md }}>Settings</Text>
      <Button title={`Switch to ${theme === "light" ? "dark" : "light"} theme`} onPress={toggleTheme} color={c.primary} />

      <View style={{ height: spacing.lg }} />

      <Button
        title="Clear all debts"
        color={c.danger}
        onPress={() =>
          Alert.alert("Clear all", "This will remove all saved debts. Continue?", [
            { text: "Cancel", style: "cancel" },
            { text: "Clear", style: "destructive", onPress: clearAll },
          ])
        }
      />
    </View>
  );
}
