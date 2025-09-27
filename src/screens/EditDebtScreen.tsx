// src/screens/EditDebtScreen.tsx
import React from "react";
import { View } from "react-native";
import DebtForm from "../components/DebtForm";
import { useDebts } from "../context/DebtsContext";
import { useSettings } from "../context/SettingsContext";
import { colors, spacing } from "../theme";
import { Debt } from "../types";

export default function EditDebtScreen({ route, navigation }: any) {
  const { updateDebt } = useDebts();
  const { theme } = useSettings();
  const c = colors[theme];

  const debt: Debt = route.params.debt;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, padding: spacing.md }}>
      <DebtForm
        initial={debt}
        submitLabel="Save changes"
        onSubmit={(d) => {
          updateDebt({ ...debt, ...d });
          navigation.goBack();
        }}
      />
    </View>
  );
}
