import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useDebts } from "../context/DebtContext";

export default function AddDebtScreen({ navigation }) {
  const { addDebt } = useDebts();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");

  const handleAdd = () => {
    if (!name || !balance || !rate) return;
    addDebt({ name, balance: parseFloat(balance), rate: parseFloat(rate) });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Add Debt</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <TextInput
        placeholder="Balance"
        value={balance}
        onChangeText={setBalance}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <TextInput
        placeholder="Rate (%)"
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <Button title="Save" onPress={handleAdd} />
    </View>
  );
}