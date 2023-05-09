import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import Button from "./UI/Button";
// import { Ionicons } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import CategoryModal from "./UI/CategoryModal";

import { defaultCategoryIcons } from "../assets/categories.js";
import { incomeCategories } from "../assets/categories.js";
import { expenseCategories } from "../assets/categories.js";

const CategorySelect = ({ onCategorySelect, type, setType, label, onIconSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  // const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [userCreatedCategories, setUserCreatedCategories] = useState([]);
  const [userCategoryIcons, setUserCategoryIcons] = useState([]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    const defaultCategories =
      type === "income" ? incomeCategories : expenseCategories;
    const allCategories = [ ...userCreatedCategories, ...defaultCategories ];
    setCategoryList(allCategories);
  }, [type, userCreatedCategories]);

  useEffect(() => {
    setSelectedCategory(null)
  }, [type]);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const saveNewCategory = (category) => {
    setUserCreatedCategories((prev) => [category.name, ...prev]);

    setUserCategoryIcons((prev) => ({
      [category.name]: category.icon,
      ...prev,
    }));
    setCategoryList((prev) => {
      return [category.name, ...prev];
    });
    handleCategorySelect(category.name);
    setSelectedCategory(category.name);
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    handleSelectedCategory(category);
  };

  const handleAddNewPress = () => {
    setModalVisible(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const generateCategoryButtons = (selectedCategory, maxButtons) => {

    // Set selected category as first item in icons
    const displayedCategories = categoryList.slice(0, maxButtons);
    let categories = [...categoryList];
    if (selectedCategory && !categories.includes(selectedCategory)) {
      categories.unshift(selectedCategory);
    }
  
    if (selectedCategory && !displayedCategories.includes(selectedCategory)) {
      categories = categories.filter((category) => category !== selectedCategory);
      categories.unshift(selectedCategory);
    }

    return categories.slice(0, maxButtons).map((category) => {
      const icon =
        userCategoryIcons[category] ?? defaultCategoryIcons[category];

      return (
        <TouchableOpacity
          key={category}
          onPress={() => handleCategorySelect(category)}
          style={[
            tw`w-20 h-20 p-4 justify-center items-center`,
            selectedCategory === category && tw` bg-gray-700 rounded-lg  `,
            selectedCategory !== category && tw`opacity-40 `,
          ]}
        >
          <Icon name={icon.name} color={icon.color} size={34} />
          <Text
            numberOfLines={selectedCategory === category ? 2 : 1}
            style={tw`text-xs text-center  text-white `}
          >
            {category}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  const CategoryButtons = ({ selectedCategory, maxButtons }) => {
    const categoryButtons = generateCategoryButtons(
      selectedCategory,
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
          onSaveNewCat={saveNewCategory}
          onCatChange={handleCategoryChange}
          onCategorySelect={handleCategorySelect}
          categories={categoryList}
          onCloseModal={() => setModalVisible(false)}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        ></CategoryModal>
      )}
      {/* Button container  */}
      <Text style={tw`text-white text-center font-bold`}>Select category</Text>
      <View
        style={tw` mt-4 flex flex-row flex-wrap  justify-around items-center`}
      >
        <CategoryButtons
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
