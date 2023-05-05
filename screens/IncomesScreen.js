import React, {useContext} from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Button } from "react-native-paper";
import List from "../components/List";
import { DataContext } from "../components/context/DataContext";
import Chart from "../components/UI/chart";

const IncomesScreen = () => {
  const dataContext = useContext(DataContext);
  return (
    <View style={tw`flex-1`}>
      <Button>
        <Text>Select date</Text>
      </Button>
        <Chart data = {dataContext.filteredContextIncomes}/>
      <List type={"income"} data={dataContext.incomes} />
    </View>
  );
};

export default IncomesScreen;
