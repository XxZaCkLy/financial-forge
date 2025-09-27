// src/App.tsx
import "react-native-gesture-handler";
import "react-native-get-random-values";

import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DebtsScreen from "./screens/DebtsScreen";
import AddDebtScreen from "./screens/AddDebtScreen";
import EditDebtScreen from "./screens/EditDebtScreen";
import DebtDetailsScreen from "./screens/DebtDetailsScreen";

import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { DebtsProvider } from "./context/DebtsContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DebtsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DebtsMain" component={DebtsScreen} options={{ title: "My Debts" }} />
      <Stack.Screen name="AddDebt" component={AddDebtScreen} options={{ title: "Add Debt" }} />
      <Stack.Screen name="EditDebt" component={EditDebtScreen} options={{ title: "Edit Debt" }} />
      <Stack.Screen name="DebtDetails" component={DebtDetailsScreen} options={{ title: "Debt Details" }} />
    </Stack.Navigator>
  );
}

function Tabs() {
  const { theme } = useSettings();
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";
            if (route.name === "Home") iconName = "home";
            if (route.name === "Dashboard") iconName = "bar-chart";
            if (route.name === "Debts") iconName = "cash";
            if (route.name === "Settings") iconName = "settings";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Debts" component={DebtsStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <DebtsProvider>
        <Tabs />
      </DebtsProvider>
    </SettingsProvider>
  );
}
