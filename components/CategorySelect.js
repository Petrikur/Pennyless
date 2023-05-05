import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import Button from "./UI/Button";

const CategorySelect = ({ onCategorySelect, type }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const expenseCategories = [
    "Groceries",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Rent",
    "Insurance",
    "Medical",
    "Food",
    "Other",
    "Investments",
  ];

  const incomeCategories = [
    "Rental income",
    "Freelancing",
    "Capital",
    "Salary",
    "Investments",
    "Other",
  ];

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    handleSelectedCategory(category);
  };

  const handleAddNewPress = () => {
    setShowCategoryInput(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCategories =
    type === "income"
      ? incomeCategories.filter((category) =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : expenseCategories.filter((category) =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const generateCategoryButtons = (selectedCategory, handleCategorySelect,maxButtons) => {
    return filteredCategories.slice(0,maxButtons).map((category) => (
      <TouchableOpacity
        key={category}
        onPress={() => handleCategorySelect(category)}
        style={[
          tw`bg-gray-400 rounded  border  py-2 px-3 items-center mr-2 mb-2`,
          selectedCategory === category && tw`border  border-black`,
          selectedCategory !== category && tw`opacity-50 `,
        ]}
      >
        <Text style={tw`text-sm font-bold `}>{category}</Text>
      </TouchableOpacity>
    ));
  };

  const CategoryButtons = ({ selectedCategory, handleCategorySelect, maxButtons }) => {
    const categoryButtons = generateCategoryButtons(
      selectedCategory,
      handleCategorySelect,
      maxButtons
    );
    return <>{categoryButtons}</>;
  };

  return (
    <View style={tw`mx-4 mt-2`}>
      <TextInput
        style={tw`border border-gray-400 rounded py-2 px-3 mb-2`}
        placeholder="Search Categories"
        onChangeText={handleSearch}
      />
      <View style={tw`flex flex-row flex-wrap mb-2`}>
        <CategoryButtons
          type={type}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          maxButtons={6}
        />
        {!showCategoryInput && (
          <TouchableOpacity
            onPress={handleAddNewPress}
            style={tw`bg-gray-200 rounded py-2 px-3 items-center mr-2 mb-2`}
          >
            <Text>+ Add New</Text>
          </TouchableOpacity>
        )}
      </View>
      {showCategoryInput && (
        <>
          <Text>Add New Category:</Text>
          <TextInput
            value={category}
            onChangeText={handleCategoryChange}
            style={tw`border border-gray-400 rounded py-2 px-3 mb-2`}
          />
          <View style={tw`flex flex-row items-center justify-between`}>
          <Button
            title="Cancel"
            onPress={() => setShowCategoryInput(false)}
          />
          <Button
            title="Add Category"
            onPress={() => handleCategorySelect(category)}
          />
          </View>
        </>
      )}
    </View>
  );
};

export default CategorySelect;
