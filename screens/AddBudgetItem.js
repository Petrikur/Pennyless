import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
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
  const [category, setCategory] = useState(null);

  const handleDescChange = (description) => {
    setDescription(description);
  };

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };

  const handletypeChange = (type) => {
    setType(type);
  };

  const handleAddBudgetItem = () => {
    if (!description || !amount || !category) {
      alert("Please fill all required fields.");
      return;
    }
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
    >
      <View style={tw` bg-gray-800 py-5 px-3 flex-1`}>
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
              tw`flex-1`,
              type === "expense" ? activeButtonStyle : inactiveButtonStyle,
            ]}
          >
            <Text>Expense</Text>
          </TouchableOpacity>
        </View>

        <Text style={tw`text-white`}>Description:</Text>
        <TextInput
          placeholder={`Description for new ${type}...`}
          placeholderTextColor={"white"}
          value={description}
          onChangeText={handleDescChange}
          style={tw`border border-gray-400 rounded py-2 px-3 text-white `}
          required
        />
        <Text style={tw`text-white`}>Amount:</Text>
        <TextInput
          placeholderTextColor={"white"}
          placeholder="Amount..."
          value={amount}
          onChangeText={handleAmountChange}
          style={tw`border border-gray-400 rounded py-2 px-3 text-white`}
          keyboardType="numeric"
          required
        />
        <Text style={tw`text-white`}>Date:</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={tw`border border-gray-400 rounded py-2 px-3`}
        >
          <Text style={tw`text-white`}>{date.toLocaleDateString()}</Text>
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
        <CategorySelect type={type} onCategorySelect={handleCategorySelect} />
        {category !== null && (
          <TouchableOpacity
            style={tw` bg-gray-800 py-2 rounded-l items-center mt-4 border-4 border-gray-700`}
            onPress={handleAddBudgetItem}
          >
            <Text style={tw`text-white text-base font-bold`}>Add item</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default AddBudgetItem;
