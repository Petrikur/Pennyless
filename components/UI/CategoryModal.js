import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "./Button";

const CategoryModal = ({
  visible,
  onCategorySelect,
  onCatChange,
  onCloseModal,
  categories,
  selectedCategory,
  category,
  onSaveNewCat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const CategoryItem = ({ category }) => (
    <TouchableOpacity
      onPress={() => onCategorySelect(category)}
      style={[
        tw`flex-row items-center w-full p-2`,
        selectedCategory === category && tw`bg-gray-600`,
      ]}
    >
      <Icon
        name="ios-pricetag-outline"
        color="#9CA3AF"
        size={24}
        style={tw`mr-2`}
      />
      <Text
        style={[
          tw`text-base`,
          selectedCategory === category && tw`text-white font-bold`,
          selectedCategory !== category && tw`text-gray-400`,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const categoryItems = filteredCategories.map((category) => (
    <CategoryItem key={category} category={category} />
  ));

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={tw`bg-gray-800 px-4 py-10`}>
        <Text style={tw`text-white text-2xl `}>Add New Category:</Text>
        <TextInput
          onChangeText={onCatChange}
          placeholder={"Name for new category"}
          placeholderTextColor={"white"}
          style={tw`border border-gray-400 rounded p-2 mb-4 mt-2 text-white`}
        />
        <View style={tw`flex flex-row items-center justify-between `}>
          <Button title="Cancel" onPress={() => setShowCategoryInput(false)} />
          <Button title="Add Category" onPress={() => onSaveNewCat(category)} />
        </View>
      </View>
      <View style={tw`flex-1 p-4 justify-center bg-gray-800`}>
        <TouchableOpacity
          onPress={onCloseModal}
          style={tw`self-end px-2 py-1 rounded-md`}
        >
          <Text style={tw`text-gray-400`}>Close</Text>
        </TouchableOpacity>
        <View style={tw`mt-4`}>
          <TextInput
            style={tw`border border-gray-400 rounded py-2 px-3 mb-2 text-white`}
            placeholder="Search Categories"
            placeholderTextColor={"white"}
            onChangeText={(value) => handleSearch(value)}
            value={searchQuery}
          />
          {categoryItems}
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
