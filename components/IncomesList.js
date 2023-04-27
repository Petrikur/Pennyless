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
      <List type={"income"} data={dataContext.incomes} />
    </>
  );
};

export default IncomesList;
