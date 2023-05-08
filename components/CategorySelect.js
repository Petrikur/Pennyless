import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import Button from "./UI/Button";
// import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import CategoryModal from "./UI/CategoryModal";

import {defaultCategoryIcons} from "../assets/categories.js"
import {incomeCategories} from "../assets/categories.js"
import { expenseCategories } from "../assets/categories.js";

const CategorySelect = ({ onCategorySelect, type, label, onIconSelect }) => {
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
          tw`w-20 h-20 p-4 justify-center items-center`,
          selectedCategory === category && tw` bg-gray-600  `,
          selectedCategory !== category && tw`opacity-40 `,
        ]}
      >
        <Icon
          name={defaultCategoryIcons[category].name}
          color={defaultCategoryIcons[category].color}
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
          modalVisible={modalVisible}
          setModalVisible={setModalVisible} 
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
