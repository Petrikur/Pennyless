import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import Button from "./UI/Button";
// import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import CategoryModal from "./UI/CategoryModal";
const expenseCategories = [
  "Groceries",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Rent",
  "Insurance",
  "Medical",
  "Restaurant",
  "Other",
  "Investments",
  "Bills",
];

const incomeCategories = [
  "Rental income",
  "Freelancing",
  "Capital",
  "Salary",
  "Investments",
  "Other",
];
const categoryIcons = {
  Groceries: { name: "ios-cart-outline", color: "#E53E3E" },
  Transportation: { name: "ios-car-outline", color: "#DD6B20" },
  Entertainment: { name: "ios-film-outline", color: "#D69E2E" },
  Utilities: { name: "ios-flash-outline", color: "#38A169" },
  Rent: { name: "ios-home-outline", color: "#4F46E5" },
  Insurance: { name: "ios-medkit-outline", color: "#6B7280" },
  Medical: { name: "ios-medical-outline", color: "#C53030" },
  Restaurant: { name: "ios-restaurant-outline", color: "#F6E05E" },
  Other: { name: "ios-grid-outline", color: "#9CA3AF" },
  Investments: { name: "ios-trending-up-outline", color: "#10B981" },
  Bills: { name: "ios-paper-outline", color: "#6366F1" },
  "Rental income": { name: "md-home", color: "#F6AD55" },
  Freelancing: { name: "md-cash", color: "#FC8181" },
  Capital: { name: "md-cash", color: "#E53E3E" },
  Salary: { name: "md-card", color: "#4FD1C5" },
  Investments: { name: "md-stats-chart", color: "#319795" },
  Other: { name: "md-grid", color: "#9CA3AF" },
};

const CategorySelect = ({ onCategorySelect, type, label, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    console.log("selected", selectedCategory);
  }, [selectedCategory]);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    handleSelectedCategory(category);
  };

  const handleAddNewPress = () => {
    // setShowCategoryInput(true);
    setModalVisible(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const categoriesByType = type === "income" ? incomeCategories : expenseCategories;
  const generateCategoryButtons = (
    selectedCategory,
    handleCategorySelect,
    maxButtons
  ) => {
    return categoriesByType.slice(0, maxButtons).map((category) => (
      <TouchableOpacity
        key={category}
        onPress={() => handleCategorySelect(category)}
        style={[
          tw`  w-20 h-20 p-4 justify-center items-center  `,
          selectedCategory === category && tw` bg-gray-600  `,
          selectedCategory !== category && tw`opacity-40 `,
        ]}
      >
        <Icon
          name={categoryIcons[category].name}
          color={categoryIcons[category].color}
          size={34}
        />
        <Text
          numberOfLines={selectedCategory === category ? 2 : 1}
          style={tw`text-xs text-center  text-white `}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ));
  };

  const CategoryButtons = ({
    selectedCategory,
    handleCategorySelect,
    maxButtons,
  }) => {
    const categoryButtons = generateCategoryButtons(
      selectedCategory,
      handleCategorySelect,
      maxButtons
    );
    return <>{categoryButtons}</>;
  };

  return (
    <View style={tw` mt-2 `}>
      {modalVisible && (
        <CategoryModal
          handleSearch={handleSearch}
          category={category}
          onSaveNewCat={handleCategorySelect}
          onCatChange={handleCategoryChange}
          onCategorySelect={handleCategorySelect}
          categories={categoriesByType}
          onCloseModal={() => setModalVisible(false)}
        ></CategoryModal>
      )}
      {/* Button container  */}
      <Text style={tw`text-white text-center font-bold`}>Select category</Text>
      <View style={tw` mt-4 flex flex-row flex-wrap  justify-around items-center`}>
        <CategoryButtons
          type={type}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleSelectedCategory}
          maxButtons={7}
        />
        {/* open modal  */}
        <TouchableOpacity
          onPress={handleAddNewPress}
          style={tw`w-20 h-20  justify-center items-center `}
        >
          <Icon name="add-circle-outline" color="#10B981" size={35} />
          <Text style={tw`text-sm text-white text-center`}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategorySelect;
