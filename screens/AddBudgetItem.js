import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import Button from "../components/UI/Button";
import { DataContext } from "../components/context/DataContext";

const AddBudgetItem = () => {
  const { addIncome, addExpense } = useContext(DataContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("income");

  const handleDescChange = (description) => {
    setDescription(description);
  };

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };

  const handleDateChange = (date) => {
    setDate(new Date(date));
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    console.log("category: " , category)
  })

  const handleAddBudgetItem = () => {
    const budgetItem = {
      amount: Number(amount),
      description,
      date,
      id: Math.random().toString(),
    };
    if (category === "income") {
      addIncome(budgetItem);
    } else {
      addExpense(budgetItem);
    }
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("income");
  };

  const activeButtonStyle = tw`bg-green-500 text-white py-2 px-4 rounded-full`;
  const inactiveButtonStyle = tw`bg-gray-300 text-gray-500 py-2 px-4 rounded-full`;

  return (
    <View style={tw``}>
      <View style={tw`flex flex-row mb-4 `}>
        <Button
          title="Income"
          onPress={() => handleCategoryChange("income")}
          style={[
            tw`flex-1 mr-2`,
            category === "income" ? activeButtonStyle : inactiveButtonStyle,
          ]}
        />
        <Button
          title="Expense"
          onPress={() => handleCategoryChange("expense")}
          style={[
            tw`flex-1 ml-2`,
            category === "expense" ? activeButtonStyle : inactiveButtonStyle,
          ]}
        />
      </View>

      <Text>Description:</Text>
      <TextInput
        value={description}
        onChangeText={handleDescChange}
        style={tw`border border-gray-400 rounded py-2 px-3 `}
      />
      <Text>Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={handleAmountChange}
        style={tw`border border-gray-400 rounded py-2 px-3`}
        keyboardType="numeric"
      />
      <Text>Date:</Text>
      <TextInput
        value={date.toString()}
        onChangeText={handleDateChange}
        style={tw`border border-gray-400 rounded py-2 px-3`}
      />
      <Button title="Add Budget Item" onPress={handleAddBudgetItem} />
    </View>
  );
};

export default AddBudgetItem;
