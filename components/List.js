import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, ScrollView } from "react-native";
import tw from "twrnc";
import Button from "./UI/Button";

const List = ({ type, data }) => {
  let backGroundColor = type === "expense" ? "#ff9999" : "#b3ffb3";
  let currency = "€";
  const [filter, setFilter] = useState("7");
  const [filteredData, setFilteredData] = useState(data);
  const [totalExp, setTotalExp] = useState();
  useEffect(() => {
    const today = new Date();
    const startDate = new Date(
      today.getTime() - parseInt(filter, 10) * 24 * 60 * 60 * 1000
    );
    const filtered = data.filter(
      (item) => item.date >= startDate && item.date <= today
    );

    setFilteredData(filtered);
  }, [filter, data]);

  const calculateTotalExp = () => {
    let total = 0;
    data.forEach((item) => {
      total += item.amount;
    });
    setTotalExp(total);
  };

  useEffect(() => {
    calculateTotalExp();
    // dataContext.setExpenses(dataContext.expenses)
  }, [totalExp]);

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
    <View style={tw`flex-1 h-5/6`}>
      <View style={tw`flex flex-row items-center justify-center gap-2 mb-5`}>
        <Button onPress={() => setFilter("1")} title="Today" />
        <Button onPress={() => setFilter("7")} title="7 Days" />
        <Button onPress={() => setFilter("30")} title="30 Days" />
        <Button onPress={() => setFilter("365")} title="365 Days" />
      </View>
      <View style={tw`flex flex-col items-center justify-center `}>
        <Text style={tw`text-xl `}>
        Total for {filter === "1" ? "today" : `${filter} days`}
        </Text>
        <Text style={tw`text-xl `}> {totalExp}</Text>
      </View>
      <FlatList
        style={tw`flex-1`}
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
        flexGrow={1}
      />
    </View>
  );
};

export default List;
