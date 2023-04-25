import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";


import tw from "twrnc";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddBudgetItem from "./screens/AddBudgetItem";
import HomeScreen from "./screens/HomeSceen";
import { Ionicons } from "@expo/vector-icons";
import ExpensesScreen from "./screens/ExpensesScreen";
import IncomesScreen from "./screens/IncomesScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  function Overview() {
    return (
      <BottomTabs.Navigator
        screenOptions={{
          style: tw`bg-white`,
          activeTintColor: "red",
          inactiveTintColor: "gray",
        }}
      >
      <BottomTabs.Screen
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <BottomTabs.Screen
          options={{
            title: "Add item",
            tabBarLabel: "Add",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            ),
          }}
          name="AddBudgetItem"
          component={AddBudgetItem}r
        />
         <BottomTabs.Screen
          options={{
            style: tw`bg-black`,
            title: "inc",
            tabBarLabel: "Incom",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cash-outline" color={color} size={size} />
            ),
          }}
          name="inc"
          component={IncomesScreen}r
        />
         <BottomTabs.Screen
          options={{
            title: "exp",
            tabBarLabel: "exp",
            tabBarIcon: ({ color, size }) => (
             
              <Ionicons name="cash-outline" color={color} size={size} />
            ),
          }}
          name="exp"
          component={ExpensesScreen}r
        />
        
      </BottomTabs.Navigator>
    );
  }
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator>
          {/* Bottom tabs */}
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddBudgetItem" component={AddBudgetItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}