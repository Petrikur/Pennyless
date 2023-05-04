
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Button from "./UI/Button";

const categories = [
  "Groceries",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Rent",
  "Insurance",
  "Medical",
  "Food",
  "Other",
];

const CategorySelect = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
   
      <View style={tw`mx-4 mt-2`}>
        <TextInput
          style={tw`border border-gray-400 rounded py-2 px-3 mb-2`}
          placeholder="Search Categories"
          onChangeText={handleSearch}
        />
        <View style={tw`flex flex-row flex-wrap mb-2`}>
          {filteredCategories.map((category) => (
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
          ))}
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
            <Button
              title="Add Category"
              onPress={() => handleCategorySelect(category)}
            />
          </>
        )}
      </View>
  
  );
};

export default CategorySelect;
