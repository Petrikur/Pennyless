import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
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

const Chart = ({ data,navigation }) => {
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

  const dataByCat = data.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  const chartData = Object.keys(dataByCat).map((category) => ({
    name: category,
    population: dataByCat[category],
    color: colorMap[category] || "#FFFFFF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View>
      {data.length !== 0 ? (
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
      ) : (
        <View style={tw`mb-30 `}>
          <Text style={tw`font-bold text-center text-3xl text-white p-10`}>
            There is no data
          </Text>

          <View style={tw`flex flex-row justify-center items-center`}>
            <TouchableOpacity
              style={tw`bg-white w-2/4 rounded-md p-3 flex flex-row justify-center items-center`}
              onPress={() => navigation.navigate("Add")}
            >
              <Icon
                name="add-circle-outline"
                color="#38A169"
                size={30}
                style={tw`mr-2`}
              />
              <Text style={tw`font-bold text-center text-xl`}>Add new ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Chart;
