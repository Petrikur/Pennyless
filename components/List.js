import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ScrollView } from "react-native";
import tw from "twrnc";

const List = ({ type, data }) => {
  let backGroundColor = type === "expense" ? "#ff9999" : "#b3ffb3";
  let currency = "€";

  useEffect(() => {});
  const renderListItem = (itemData) => {
    return (
      <View
        height={100}
        backgroundColor={backGroundColor}
        style={tw`mb-2 p-4 w-95 items-center rounded justify-center flex`}
      >
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-lg font-bold`}>
              {itemData.item.description}
            </Text>
          </View>
          <View style={tw`flex-1 justify-end items-end`}>
            <Text style={tw`text-lg font-bold bg-white rounded p-2`}>
              {type === "expense" ? "-" : "+"} {itemData.item.amount} {currency}
            </Text>
          </View>
        </View>
        <Text>{itemData.item.date.toLocaleDateString()}</Text>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 h-5/6 `}>

    <FlatList
      // maxToRenderPerBatch={5}
      style={tw`flex-1`}
      data={data}
      renderItem={renderListItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={tw`p-4`}
      showsVerticalScrollIndicator={false}
      flexGrow={1}
    />
    {/* /* ListFooterComponent={<View style={{ height: 250 }} />} */}
    </View> 
  );
};

export default List;
