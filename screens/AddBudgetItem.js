import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import Button from "../components/UI/Button";
import { DataContext } from "../components/context/DataContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import CategorySelect from "../components/CategorySelect";

const AddBudgetItem = () => {
  const { addIncome, addExpense } = useContext(DataContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("income");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("");

  const handleDescChange = (description) => {
    setDescription(description);
  };

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setShowDatePicker(false);
  };

  const handletypeChange = (type) => {
    setType(type);
  };

  useEffect(() => {
    console.log("type: ", type);
  });

  const handleAddBudgetItem = () => {
    const budgetItem = {
      amount: Number(amount),
      description,
      date,
      id: Math.random().toString(),
      category: category,
      type: type,
    };
    if (type === "income") {
      addIncome(budgetItem);
    } else if (type === "expense") {
      addExpense(budgetItem);
    }
    setDescription("");
    setAmount("");
    setDate(new Date());
    setType("income");
  };

  const activeButtonStyle = tw`bg-green-500 text-white py-2 px-4 rounded-full`;
  const inactiveButtonStyle = tw`bg-gray-300 text-gray-500 py-2 px-4 rounded-full`;

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return ( <ScrollView
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ flexGrow: 1 }}
  >
    <View style={tw`mx-4 mt-2`}>
      <View style={tw`flex flex-row mb-4 items-center justify-between `}>
        <TouchableOpacity
          onPress={() => handletypeChange("income")}
          style={[
            tw`flex-1 mr-2`,
            type === "income" ? activeButtonStyle : inactiveButtonStyle,
          ]}
        >
          <Text>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handletypeChange("expense")}
          style={[
            tw`flex-1 ml-2`,
            type === "expense" ? activeButtonStyle : inactiveButtonStyle,
          ]}
        >
          <Text>Expense</Text>
        </TouchableOpacity>
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
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={tw`border border-gray-400 rounded py-2 px-3`}
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          modal
          value={date}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      )}
      <CategorySelect onCategorySelect={handleCategorySelect} />
      <Button title="Add Budget Item" onPress={handleAddBudgetItem} />
    </View> 
     </ScrollView>
  );
};

export default AddBudgetItem;
