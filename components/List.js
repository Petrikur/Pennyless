import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
 
} from "react-native";
import tw from "twrnc";
import Button from "./UI/Button";
import { DataContext } from "./context/DataContext";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const List = ({ type, data }) => {
  const dataContext = useContext(DataContext);
  const [filter, setFilter] = useState("7");
  const [filteredData, setFilteredData] = useState(data);
  const [totalExp, setTotalExp] = useState();
  const [currency, setCurrency] = useState("€");

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(
      today.getTime() - parseInt(filter, 10) * 24 * 60 * 60 * 1000
    );
    const filtered = data.filter(
      (item) => item.date >= startDate && item.date <= today
    );
    if (type === "expense") {
      dataContext.setFilteredContextExpenses(filtered);
    } else if (type === "income") {
      dataContext.setFilteredContextIncomes(filtered);
    }
    setFilteredData(filtered);

    let total = 0;
    filtered.forEach((item) => {
      if (item.type === "expense") {
        total -= item.amount;
      } else {
        total += item.amount;
      }
    });
    setTotalExp(total);
  }, [filter, data]);

  const renderListItem = (itemData) => {
    let amountColor =
      itemData.item.type === "income" ? "text-green-400" : "text-red-400";

    return (
      <LinearGradient
        colors={["#2d3748", "#1a202c"]}
        style={tw`rounded-lg mb-4 border border-dotted border-white `}
      >
        <View
          height={90}
          style={tw`mb-2 p-4 w-90 items-center rounded justify-center flex `}
        >
          <View style={tw`flex flex-row items-center justify-between`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-white `}>
                {itemData.item.description} ({itemData.item.category})
              </Text>
            </View>
            <View style={tw`flex-1 justify-end items-end`}>
              <Text
                style={tw`text-lg font-bold  p-2  bg-gray-800 rounded-md ${amountColor}`}
              >
                {itemData.item.type === "expense" ? "-" : "+"}
                {itemData.item.amount} {currency}
              </Text>
            </View>
          </View>
          <Text style={tw`text-white`}>
            {itemData.item.date.toLocaleDateString()}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={tw`flex-1 h-4/6 pb-6`}>
      <Text style={tw`text-center font-bold text-lg text-white`}>
        Select filter
      </Text>
      <View style={tw`flex flex-row items-center justify-evenly mb-5`}>
        <Button onPress={() => setFilter("1")} title="Today" />
        <Button onPress={() => setFilter("7")} title="7 Days" />
        <Button onPress={() => setFilter("30")} title="30 Days" />
        <Button onPress={() => setFilter("365")} title="365 Days" />
      </View>
      <LinearGradient
        colors={["#4B5563", "#1F2937"]}
        style={tw`rounded-lg mb-4`}
      >
        <View style={tw`flex flex-col items-center justify-center px-6 pt-2`}>
          <Text style={tw`text-xl font-bold text-white mb-2 `}>
            Total for {filter === "1" ? "today" : `${filter} days`}
          </Text>
          <Text style={tw`text-3xl font-bold text-yellow-300`}>
            {Number(totalExp).toFixed(2)} {currency}
          </Text>
        </View>
      </LinearGradient>
     
      <FlatList
        style={tw`flex-1 mb-4 min-h-50`}
        data={filteredData}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`pt-1 px-2`}
        showsVerticalScrollIndicator={false}
        flexGrow={1}
      />
 
     
        {/* Add more button  */}
        {filteredData.length > 1 && 
       ( <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
        onPress={() => {alert("Eikö osu eiköö")}}
          style={tw` `}
    
        >
          <View
            style={tw`flex flex-row items-center justify-center gap-2 bg-white p-3 rounded-lg`}
          >
            <Icon name="add-circle-outline" color="#38A169" size={30} />
            <Text style={tw`font-bold text-center text-lg text-black`}>
              Load more
            </Text>
          </View>
        </TouchableOpacity>
        </View>)}
       
    </View>
  );
};

export default List;
