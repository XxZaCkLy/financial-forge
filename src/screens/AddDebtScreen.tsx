// src/screens/AddDebtScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function AddDebtScreen({ route, navigation }: Props) {
  const { setDebts } = route.params;

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleAdd = () => {
    if (!name || !balance || !interestRate) return;
    setDebts((prev: any) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        balance: parseFloat(balance),
        interestRate: parseFloat(interestRate),
      },
    ]);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Add New Debt</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Balance"
        value={balance}
        onChangeText={setBalance}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <Button title="Save" onPress={handleAdd} />
    </View>
  );
}
