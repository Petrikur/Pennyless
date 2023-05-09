import React, { useContext } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Button } from "react-native-paper";
import List from "../components/List";
import { DataContext } from "../components/context/DataContext";
import Chart from "../components/UI/chart";
import { ScrollView } from "react-native";

const IncomesScreen = ({navigation}) => {
  const dataContext = useContext(DataContext);
  return (
    <ScrollView>
      <View style={tw`flex-1 bg-gray-800`}>
        <Chart data={dataContext.filteredContextIncomes} navigation={navigation} />
        <List type={"income"} data={dataContext.incomes} />
      </View>
    </ScrollView>
  );
};

export default IncomesScreen;
