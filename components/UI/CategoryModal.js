import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "./Button";
import { BackHandler } from 'react-native';
import {newCategoryIcons}  from "../../assets/categories.js"

const CategoryModal = ({
  modalVisible,
  onCategorySelect,
  onCatChange,
  onCloseModal,
  categories,
  selectedCategory,
  category,
  onSaveNewCat,
  setModalVisible
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(newCategoryIcons[0]);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [isSearching, setIsSeaching] = useState(true);
  
  
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
  const renderCatItem = ({ item }) => {
    return <CategoryItem category={item} />;
  };

  const handleSetSearch = () => {
    setIsSeaching(true);
    setIsAddingNewCategory(false);
  };

  const handleAddingNewCat = () => {
    setIsSeaching(false);
    setIsAddingNewCategory(true);
  };

  const handleBackButton = () => {
    setModalVisible(false);
    
  };
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => backHandler.remove();
  }, [selectedIcon]);

  const handleAddNewCategory = () => {
    const newCategory = {
      name: category,
      icon: selectedIcon,
    };
    onSaveNewCat(newCategory)
  }

  return (

      <Modal
        animationType="slide"
        visible={modalVisible}
        style={tw` bg-black h-full items-center justify-center`}
        onRequestClose={handleBackButton}
      >
    
        {/* Open category new category button */}
        <View style={tw`bg-gray-800 pt-12 items-center gap-4 flex-1 `}>

        <View style={tw`flex items-center justify-center gap-2 `}>
          <Text style={tw`text-white text-3xl font-bold pb-2`}>
            Select category
          </Text>

         { !isSearching && <TouchableOpacity
            style={tw`bg-gray-800 border-white border w-2/4 rounded-full px-4 py-2 items-center shadow-md`}
            onPress={handleSetSearch}
          >
            <Text style={tw`text-white font-bold text-lg`}>
              Search category
            </Text>
          </TouchableOpacity>}
          
          { !isAddingNewCategory && <TouchableOpacity
            style={tw`bg-gray-800 border-white border w-2/4 rounded-full px-4 py-2 items-center shadow-md`}
            onPress={handleAddingNewCat}
          >
            <Text style={tw`text-white font-bold text-lg `}>Create new </Text>
          </TouchableOpacity>}
        </View>

        {isAddingNewCategory && (
          <View style={tw`bg-gray-800 px-4`}>
            <Text style={tw`text-white text-2xl pb-4 `}>Add New Category:</Text>
            <TextInput
              onChangeText={onCatChange}
              placeholder={"Name for new category"}
              placeholderTextColor={"white"}
              style={tw`border border-gray-400 rounded p-2 mb-4  text-white`}
            />
            <Text style={tw`text-white text-center font-bold`}>
              Add icon for your category!
            </Text>
            <View style={tw`flex flex-row flex-wrap p-2`}>
              {newCategoryIcons.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  onPress={() => setSelectedIcon(item)}
                  style={tw`p-3 ${
                    selectedIcon.name === item.name ? "bg-gray-400" : ""
                  }`}
                >
                  <Icon name={item.name} color={item.color} size={40} />
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={tw`flex flex-row items-center justify-between  pb-20 bg-gray-800 `}
            >
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Add Category"
                onPress={() => handleAddNewCategory(category)}
              />
            </View>
          </View>
        
        )}

        {/* Search for categories  */}
    
        {isSearching && (
       
          <View style={tw`p-6 flex w-full h-full justify-center bg-gray-800 `}>
         
            <View style={tw`mt-4`}>
              <TextInput
                style={tw`border border-gray-400 rounded py-2 px-3 mb-2 text-white`}
                placeholder="Search Categories"
                placeholderTextColor={"white"}
                onChangeText={(value) => handleSearch(value)}
                value={searchQuery}
              />
              <ScrollView>
              <FlatList
                data={filteredCategories}
                renderItem={renderCatItem}
                keyExtractor={(item) => item}
            style={tw`pb-35`}
              />
              </ScrollView>
            </View>
          </View>
          
        )}
        {/* Close modal button */}
        <TouchableOpacity
          onPress={onCloseModal}
          style={tw`absolute top-0 right-0 mt-2 mr-4 p-2`}
        >
          <Icon name="close" size={32} color="white" />
        </TouchableOpacity>
        </View>
      </Modal>
  
  );
};

export default CategoryModal;
