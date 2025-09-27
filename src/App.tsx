// src/App.tsx
// Important: gesture-handler must be imported before navigation
import "react-native-gesture-handler";
// Polyfill for UUID and crypto randomness on web
import "react-native-get-random-values";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home stack (keeps room for deeper screens later)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      {/* Add more Home-related stack screens here */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            // Default icon name
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "Home") iconName = "home";
            if (route.name === "Dashboard") iconName = "bar-chart";
            if (route.name === "Settings") iconName = "settings";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
