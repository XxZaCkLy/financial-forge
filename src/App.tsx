import "react-native-gesture-handler";
import "react-native-get-random-values";

import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import DebtsScreen from "./screens/DebtsScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { DebtsProvider } from "./context/DebtsContext";

const Tab = createBottomTabNavigator();

function Tabs() {
  const { theme } = useSettings();

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let icon: keyof typeof Ionicons.glyphMap = "home";
            if (route.name === "Home") icon = "home";
            if (route.name === "Dashboard") icon = "bar-chart";
            if (route.name === "Debts") icon = "cash";
            if (route.name === "Settings") icon = "settings";
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Debts" component={DebtsScreen} />
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
