import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DebtsScreen from "./src/screens/DebtsScreen";
import AddDebtScreen from "./src/screens/AddDebtScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { DebtProvider } from "./src/context/DebtContext";

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
