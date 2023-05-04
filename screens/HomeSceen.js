import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

import { DataContext } from "../components/context/DataContext";

import List from "../components/List";

const HomeScreen = () => {
  const dataContext = useContext(DataContext);
  const [data, setData] = useState([]);

  // Merge lists
  useEffect(() => {
    const allData = [...dataContext.expenses, ...dataContext.incomes];
    allData.sort((a, b) => b.date - a.date);
    setData(allData);
  }, [dataContext.expenses, dataContext.incomes]);

  return (
    <View style={tw`flex-1 `}>
       <List type={"difference"} data={data} /> 
    </View>
  );
};
export default HomeScreen;
