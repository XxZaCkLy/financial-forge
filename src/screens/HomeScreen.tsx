// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>🏠 Home Screen</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate("Settings")} />
    </View>
  );
}
