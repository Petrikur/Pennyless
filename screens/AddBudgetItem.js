import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
// import { TextInput } from "react-native";
import Button from "../components/UI/Button";
import tw from "twrnc"
const AddBudgetItem = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleNameChange = (name) => {
    setName(name);
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

  return (
    <View>
    
      <TextInput
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={handleAmountChange}
      />
      <TextInput
      style={tw`bg-white`}
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={handleCategoryChange}
      />
      <Button title="Add" style={tw`bg-white font-lg`}>
      </Button>
    </View>
  );
};

export default AddBudgetItem;
