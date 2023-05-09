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
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const AddBudgetItem = ({navigation}) => {
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
      navigation.navigate('Incomes');
    } else if (type === "expense") {
      addExpense(budgetItem);
      navigation.navigate('Expenses'); 
    }
    setDescription("");
    setAmount("");
    setDate(new Date());
    setType("income");

    navigation
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const activeButtonStyle = tw`shadow-md bg-green-400 rounded-lg `;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={tw`bg-gray-800 py-5 px-3 flex-1`}>
        <View style={tw`flex flex-row mb-4 items-center justify-between `}>
          <TouchableOpacity
            onPress={() => handletypeChange("income")}
            style={[
              tw`flex-1 mr-2 `,
              type === "income" ? activeButtonStyle : "",
              tw`shadow-md`,
            ]}
          >
            <View
             style={[
                tw`flex flex-row items-center justify-center gap-2 bg-white p-3 rounded-lg`,
                type === "income" ? activeButtonStyle : "",
              ]}
            >
              <Icon name="md-arrow-down" color="#38A169" size={30} />
              <Text style={tw`font-bold text-center text-lg text-black`}>
                Income
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handletypeChange("expense")}
            style={[
              tw`flex-1 mr-2`,
              type === "expense" ? activeButtonStyle : "",
              tw`shadow-md`,
            ]}
            
          >
            <View
              style={[
                tw`flex flex-row items-center justify-center gap-2 bg-white p-3 rounded-lg`,
                type === "expense" ? activeButtonStyle : "",
              ]}
            >
              <Icon name="md-arrow-up" color="#E53E3E" size={30} />
              <Text style={tw`font-bold text-center text-lg text-black`}>
                Expense
              </Text>
            </View>
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
