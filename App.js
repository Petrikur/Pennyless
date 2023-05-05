import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import tw from "twrnc";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddBudgetItem from "./screens/AddBudgetItem";
import HomeScreen from "./screens/HomeSceen";
import { Ionicons } from "@expo/vector-icons";
import ExpensesScreen from "./screens/ExpensesScreen";
import IncomesScreen from "./screens/IncomesScreen";
import { DataContextProvider } from "./components/context/DataContext";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const tabIcons = {
    Home: "home",
    Add: "add-circle-outline",
    Incomes: "cash-outline",
    Expenses: "cash-outline",
  };
  const getTabBarIcon = (routeName) => {
    const iconName = tabIcons[routeName];
    return <Ionicons name={iconName} size={25} />;
  };

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeStack" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  function AddBudgetItemStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AddBudgetItemStack" component={AddBudgetItem} />
      </Stack.Navigator>
    );
  }

  function IncomesStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="IncomesStack" component={IncomesScreen} />
      </Stack.Navigator>
    );
  }

  function ExpensesStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="ExpensesStack" component={ExpensesScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
    <StatusBar />
    <DataContextProvider>
      <NavigationContainer style={{ flex: 1, backgroundColor: "#333f4e" }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveBackgroundColor: "#FFFFFF",
            tabBarInactiveBackgroundColor: "#333f4e",
            tabBarLabelStyle: tw`text-sm text-black`,
            tabBarIcon: ({ focused, size, color }) =>
              getTabBarIcon(route.name, focused, size, color),
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Add" component={AddBudgetItemStack} />
          <Tab.Screen name="Incomes" component={IncomesStack} />
          <Tab.Screen name="Expenses" component={ExpensesStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Set your desired background color here
   
  },
});