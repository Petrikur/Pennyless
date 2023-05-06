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

  const defaultHeaderOptions = {
      headerStyle: {
        backgroundColor: "#1F2937",
      },
      headerTitleStyle: {
        fontSize: 35,
        color: "#FFFFFF",
      },
    
  }
  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{...defaultHeaderOptions, title:"Home"}}
          name="HomeStack"
          component={HomeScreen}
        />
      </Stack.Navigator>
    );
  }
  function AddBudgetItemStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            options={{...defaultHeaderOptions, title:"Add new item"}}
          name="AddBudgetItemStack"
          component={AddBudgetItem}
        />
      </Stack.Navigator>
    );
  }

  function IncomesStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen   options={{...defaultHeaderOptions, title:"Incomes"}} name="IncomesStack" component={IncomesScreen} />
      </Stack.Navigator>
    );
  }

  function ExpensesStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{...defaultHeaderOptions, title:"Expenses"}} name="ExpensesStack" component={ExpensesScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <DataContextProvider>
          <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: "#1F2937" }}>
          <NavigationContainer
            style={{
              flex: 1,
              
            }}
          >
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
          </SafeAreaView>
      </DataContextProvider>
    </>
  );
}
