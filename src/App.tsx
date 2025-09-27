// src/App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import DebtsScreen from "./screens/DebtsScreen";
import AddDebtScreen from "./screens/AddDebtScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { DebtProvider } from "./context/DebtContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DebtProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Debts" component={DebtsScreen} />
          <Stack.Screen name="AddDebt" component={AddDebtScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DebtProvider>
  );
}
