import React from "react";
import { View, Text, Button } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { useDebts } from "../context/DebtsContext";

export default function SettingsScreen() {
  const { theme