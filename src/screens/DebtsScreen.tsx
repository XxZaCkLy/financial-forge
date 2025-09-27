import { View, Text, FlatList } from "react-native";
import { useDebts } from "../context/DebtContext";

export default function DebtsScreen() {
  const { debts } = useDebts();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>My Debts</Text>
      <FlatList
        data={debts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Balance: ${item.balance}</Text>
            <Text>Rate: {item.rate}%</Text>
          </View>
        )}
      />
    </View>
  );
}
