// IncomesList.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import List from "../components/List";
import tw from "twrnc";
import { DataContext } from "./context/DataContext";

const IncomesList = () => {
  const dataContext = useContext(DataContext);
  
  return (
    <>
      {/* <View style={tw`flex items-center justify-center mb-2 mt-5`}> */}
      {/* <Text style={tw`text-xl `}>Total {totalExp}</Text> */}
      <List type={"income"} data={dataContext.incomes} />

      {/* </View> */}
    </>
  );
};

export default IncomesList;
