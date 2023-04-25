// List.js
import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import tw from "twrnc"

// Parent component for expenses and incomes
const List = ({ type, data }) => {
  let backGroundColor = type === "expense"? "red": "green"
  const renderListItem = (itemData) => {
    return (
      <View style={tw`flex flex-row`}>
        <Text style={tw`text-lg`}>{itemData.item.description} </Text>
        <Text style = {tw`text-lg`}>{itemData.item.amount} €</Text>
      </View>
    );
  };

  return (
    <View style= {tw`flex items-center`} backgroundColor={backGroundColor} >
      <FlatList data={data} renderItem={renderListItem} />
    </View>
  );
};

export default List;