import React from "react";
import { ScrollView, View } from "react-native";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const colorMap = {
  Food: "#FFC107",
  Salary: "#4CAF50",
  Investments: "#2196F3",
  Recycle: "#9E9E9E",
  Entertainment: "#9F9F9F",
  Utilities: "#03A9F4",
  Other: "#BDBDBD",
  Insurance: "#FF5722",
  Health: "#E91E63",
};

const Chart = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  console.log(data)
  const expensesByCategory = data.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    console.log("acc:", acc);
    return acc;
  }, {});

  const chartData = Object.keys(expensesByCategory).map((category) => ({
    name: category,
    population: expensesByCategory[category],
    color: colorMap[category] || "#FFFFFF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View>
      <PieChart
        data={chartData}
        width={windowWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        // paddingLeft={15}
        center={[10, 0]}
        absolute

      />
    </View>
  );
};

export default Chart;
