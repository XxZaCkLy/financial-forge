// src/components/DebtForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { colors, spacing } from "../theme";
import { useSettings } from "../context/SettingsContext";
import { Debt } from "../types";

type Props = {
  initial?: Partial<Debt>;
  onSubmit: (d: Omit<Debt, "id">) => void;
  submitLabel?: string;
};

export default function DebtForm({ initial = {}, onSubmit, submitLabel = "Save" }: Props) {
  const { theme } = useSettings();
  const c = colors[theme];

  const [name, setName] = useState(initial.name ?? "");
  const [balance, setBalance] = useState(initial.balance?.toString() ?? "");
  const [interestRate, setInterestRate] = useState(initial.interestRate?.toString() ?? "");
  const [error, setError] = useState("");

  const validate = () => {
    const b = parseFloat(balance);
    const r = parseFloat(interestRate);
    if (!name.trim()) return "Name is required";
    if (isNaN(b) || b <= 0) return "Balance must be a positive number";
    if (isNaN(r) || r <= 0) return "Interest rate must be a positive number";
    return "";
  };

  const handleSubmit = () => {
    const e = validate();
    if (e) {
      setError(e);
      return;
    }
    onSubmit({
      name: name.trim(),
      balance: parseFloat(balance),
      interestRate: parseFloat(interestRate),
    });
  };

  return (
    <View style={{ gap: spacing.md }}>
      {error ? <Text style={{ color: c.danger }}>{error}</Text> : null}

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: c.border,
          padding: spacing.sm,
          backgroundColor: c.card,
          color: c.text,
        }}
        placeholderTextColor={c.muted}
      />
      <TextInput
        placeholder="Balance"
        value={balance}
        onChangeText={setBalance}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: c.border,
          padding: spacing.sm,
          backgroundColor: c.card,
          color: c.text,
        }}
        placeholderTextColor={c.muted}
      />
      <TextInput
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: c.border,
          padding: spacing.sm,
          backgroundColor: c.card,
          color: c.text,
        }}
        placeholderTextColor={c.muted}
      />
      <Button title={submitLabel} onPress={handleSubmit} color={c.primary} />
    </View>
  );
}
